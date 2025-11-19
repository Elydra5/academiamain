import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../services/notification';

@Component({
  selector: 'app-group',
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class Group implements OnInit {
  private apiUrl = 'https://academia.tokyohost.eu:3000/groups';
  private adminUrl = 'https://academia.tokyohost.eu:3000/admin';
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  group: any = {
    id: 0,
    name: "Loading...",
    short_description: "",
    moodle_id: null,
    start_date: "",
    end_date: "",
    status: "",
    teacher: "",
    long_description: ""
  };

  students: any[] = [];
  teachers: any[] = [];
  isEditModalOpen = false;
  editingGroup: any = {};

  ngOnInit() {
    this.loadTeachers();
    this.route.params.subscribe(params => {
      const groupId = +params['id'];
      if (groupId && !isNaN(groupId) && groupId > 0) {
        this.loadGroup(groupId);
      } else {
        console.error('Invalid group ID from route:', groupId, params);
      }
    });
  }

  loadTeachers() {
    this.http.get<any[]>(this.adminUrl).subscribe({
      next: (users) => {
        this.teachers = users || [];
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.teachers = [];
      }
    });
  }

  loadGroup(id: number) {
    if (!id || isNaN(id)) {
      console.error('loadGroup called with invalid id:', id);
      return;
    }
    const url = `${this.apiUrl}/${id}`;
    // console.log('Loading group from URL:', url);
    
    this.http.get(url).subscribe({
      next: (response: any) => {
        // console.log('Group loaded successfully:', response);
        const groupInfo = Array.isArray(response.groupInfo) ? response.groupInfo[0] : response.groupInfo;
        // console.log('Extracted groupInfo:', groupInfo);
        const students = response.students || [];
        // console.log('Extracted students:', students);
        
        this.group = {
          id: groupInfo?.id || 0,
          name: groupInfo?.name || '',
          short_description: groupInfo?.short_description || '',
          moodle_id: groupInfo?.moodle_id || null,
          start_date: groupInfo?.start_date || '',
          end_date: groupInfo?.end_date || '',
          status: groupInfo?.status || '',
          teacher: groupInfo?.teacher || '',
          long_description: groupInfo?.long_description || ''
        };

        this.students = students;
        // console.log('group after assignment:', this.group);
        // console.log('students after assignment:', this.students);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading group:', error);
        console.error('Error details:', error.status, error.statusText, error.message);
        this.group = {
          id: id,
          name: "Group Not Found",
          short_description: "",
          moodle_id: null,
          start_date: "",
          end_date: "",
          status: "",
          teacher: "",
          long_description: ""
        };
        this.students = [];
      }
    });
  }

  onEdit(groupToEdit?: any) {
    const g = groupToEdit ?? this.group;
    this.editingGroup = { ...g };
    if (this.editingGroup.start_date) {
      this.editingGroup.start_date = this.formatDateForInput(this.editingGroup.start_date);
    }
    if (this.editingGroup.end_date) {
      this.editingGroup.end_date = this.formatDateForInput(this.editingGroup.end_date);
    }
    this.isEditModalOpen = true;
    // console.log('[group] edit clicked', g);
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch {
      return '';
    }
  }

  onSave() {
    const updateData = { ...this.editingGroup };
    
    if (updateData.start_date) {
      updateData.start_date = this.formatDateForInput(updateData.start_date);
    }
    if (updateData.end_date) {
      updateData.end_date = this.formatDateForInput(updateData.end_date);
    }
    
    const groupId = this.editingGroup.id;
    if (!groupId) {
      console.error('Cannot update group: id is undefined');
      this.notificationService.error(this.translate.instant('COMMON.ERROR'));
      return;
    }
    
    this.http.patch(`${this.apiUrl}/${groupId}`, updateData).subscribe({
      next: (response: any) => {
        console.log('Update response:', response);
        const groupData = response?.groupInfo || response;
        if (groupData) {
          const finalId = groupData.id || groupId;
          this.group = {
            id: finalId,
            name: groupData.name || '',
            short_description: groupData.short_description || '',
            moodle_id: groupData.moodle_id || null,
            start_date: groupData.start_date || '',
            end_date: groupData.end_date || '',
            status: groupData.status || '',
            teacher: groupData.teacher || '',
            long_description: groupData.long_description || ''
          };
          if (response.students) {
            this.students = response.students;
          }
          console.log('Group updated, id:', this.group.id);
        } else {
          this.group = {
            ...this.group,
            ...this.editingGroup,
            id: groupId
          };
          console.log('Group updated (fallback), id:', this.group.id);
        }
        this.isEditModalOpen = false;
        this.notificationService.success(this.translate.instant('COMMON.SUCCESS'));
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error updating group:', error);
        this.notificationService.error(this.translate.instant('COMMON.ERROR'));
      }
    });
  }

  onCancel() {
    this.isEditModalOpen = false;
    this.editingGroup = {};
  }

  onDelete(groupToDelete?: any) {
    const g = groupToDelete ?? this.group;
    const deleteMessage = `${this.translate.instant('GROUP.DELETE_CONFIRM')} "${g.name}"?`;
    const confirmed = confirm(deleteMessage);
    if (!confirmed) return;

    this.http.delete(`${this.apiUrl}/${g.id}`).subscribe({
      next: () => {
        // console.log('[group] deleted', g);
        this.notificationService.success(this.translate.instant('COMMON.SUCCESS'));
        this.router.navigate(['/groups']);
      },
      error: (error) => {
        console.error('Error deleting group:', error);
        this.notificationService.error(this.translate.instant('COMMON.ERROR'));
      }
    });
  }

  onStudentClick(studentId: number) {
    this.router.navigate(['/student', studentId]);
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

  getStatusText(status: string): string {
    if (!status) return this.translate.instant('GROUP.UNKNOWN');
    const statusLower = status.toLowerCase();
    if (statusLower === 'active') return this.translate.instant('GROUP.ACTIVE');
    if (statusLower === 'inactive') return this.translate.instant('GROUP.INACTIVE');
    return status;
  }

  @HostListener('document:keydown', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isEditModalOpen) {
      this.onCancel();
    }
  }
}
