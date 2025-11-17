import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student',
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  private apiUrl = 'http://185.80.49.54:3000/students';
  private groupsApiUrl = 'http://185.80.49.54:3000/groups';
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  student: any = {
    id: 0,
    first_name: "Loading...",
    last_name: "",
    phone: "",
    enrollment_date: ""
  };

  isEditModalOpen = false;
  editingStudent: any = {};
  groups: Array<{ id: number; name: string }> = [];
  selectedGroupId: number | null = null;
  isLoadingGroups = false;
  isEnrolling = false;
  enrollSuccess = '';
  enrollError = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      const studentId = +params['id'];
      console.log('Student ID from route:', studentId);
      if (studentId && !isNaN(studentId)) {
        this.loadStudent(studentId);
      } else {
        console.error('Invalid student ID:', studentId);
      }
    });
    this.loadGroups();
  }

  loadStudent(id: number) {
    const url = `${this.apiUrl}/${id}`;
    console.log('Loading student from URL:', url);
    
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Student loaded successfully:', response);
        const student = Array.isArray(response) ? response[0] : response;
        console.log('Extracted student object:', student);
        
        this.student = {
          id: student?.id || 0,
          first_name: student?.first_name || '',
          last_name: student?.last_name || '',
          phone: student?.phone || '',
          enrollment_date: student?.enrollment_date || ''
        };
        console.log('student after assignment:', this.student);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading student:', error);
        console.error('Error details:', error.status, error.statusText, error.message);
        this.student = {
          id: id,
          first_name: "Student",
          last_name: "Not Found",
          phone: "",
          enrollment_date: ""
        };
      }
    });
  }

  loadGroups() {
    this.isLoadingGroups = true;
    this.http.get<any[]>(this.groupsApiUrl).subscribe({
      next: (groups) => {
        this.groups = (groups || []).map(group => ({
          id: group.id,
          name: group.name
        }));
        if (this.groups.length === 0) {
          this.selectedGroupId = null;
        }
        this.isLoadingGroups = false;
      },
      error: (error) => {
        console.error('Error loading groups:', error);
        this.groups = [];
        this.isLoadingGroups = false;
      }
    });
  }

  onEdit(studentToEdit?: any) {
    const s = studentToEdit ?? this.student;
    this.editingStudent = { ...s }; 
    this.isEditModalOpen = true;
    console.log('[student] edit clicked', s);
  }

  onSave() {
    this.http.patch(`${this.apiUrl}/${this.editingStudent.id}`, this.editingStudent).subscribe({
      next: (updatedStudent: any) => {
        this.student = { ...updatedStudent };
        this.isEditModalOpen = false;
        console.log('[student] saved', updatedStudent);
      },
      error: (error) => {
        console.error('Error updating student:', error);
        alert(this.translate.instant('COMMON.ERROR') + ': ' + this.translate.instant('STUDENT.EDIT_STUDENT'));
      }
    });
  }

  onCancel() {
    this.isEditModalOpen = false;
    this.editingStudent = {};
  }

  onDelete(studentToDelete?: any) {
    const s = studentToDelete ?? this.student;
    const deleteMessage = `${this.translate.instant('STUDENT.DELETE_CONFIRM')} ${s.first_name} ${s.last_name}?`;
    const confirmed = confirm(deleteMessage);
    if (!confirmed) return;

    this.http.delete(`${this.apiUrl}/${s.id}`).subscribe({
      next: () => {
        console.log('[student] deleted', s);
        alert(this.translate.instant('COMMON.SUCCESS'));
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error deleting student:', error);
        alert(this.translate.instant('COMMON.ERROR'));
      }
    });
  }

  onEnrollInGroup() {
    if (!this.selectedGroupId || !this.student?.id) {
      this.enrollError = this.translate.instant('STUDENT.SELECT_GROUP');
      this.enrollSuccess = '';
      return;
    }

    const url = `${this.groupsApiUrl}/enroll/${this.selectedGroupId}/${this.student.id}`;
    this.isEnrolling = true;
    this.enrollSuccess = '';
    this.enrollError = '';

    this.http.post(url, {}).subscribe({
      next: () => {
        this.enrollSuccess = this.translate.instant('STUDENT.ENROLL_SUCCESS');
        this.isEnrolling = false;
      },
      error: (error) => {
        console.error('Error enrolling student to group:', error);
        this.enrollError = error.error?.message || this.translate.instant('STUDENT.ENROLL_ERROR');
        this.isEnrolling = false;
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
    } catch (e) {
      return dateString;
    }
  }
}
