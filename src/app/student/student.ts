import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  imports: [FormsModule, CommonModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  private apiUrl = 'http://10.10.10.165:3000/students';
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private cdr: ChangeDetectorRef
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
        alert('Error updating student. Please try again.');
      }
    });
  }

  onCancel() {
    this.isEditModalOpen = false;
    this.editingStudent = {};
  }

  onDelete(studentToDelete?: any) {
    const s = studentToDelete ?? this.student;
    const confirmed = confirm(`Are you sure you want to delete ${s.first_name} ${s.last_name}?`);
    if (!confirmed) return;

    this.http.delete(`${this.apiUrl}/${s.id}`).subscribe({
      next: () => {
        console.log('[student] deleted', s);
        alert('Student deleted successfully');
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error deleting student:', error);
        alert('Error deleting student. Please try again.');
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
