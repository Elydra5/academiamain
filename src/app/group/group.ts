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
      console.log('[FRONTEND] Route params changed:', params);
      const groupIdParam = params['id'];
      console.log('[FRONTEND] Raw groupId param:', groupIdParam, 'type:', typeof groupIdParam);
      
      if (!groupIdParam || groupIdParam === 'undefined' || groupIdParam === 'null') {
        console.error('[FRONTEND ERROR] ===== INVALID ROUTE PARAM =====');
        console.error('[FRONTEND ERROR] Route param id is:', groupIdParam);
        console.error('[FRONTEND ERROR] All params:', params);
        console.error('[FRONTEND ERROR] This is a FRONTEND/ROUTING issue - invalid route param');
        return;
      }
      
      const groupId = +groupIdParam;
      console.log('[FRONTEND] Parsed groupId from route:', groupId);
      
      if (groupId && !isNaN(groupId) && groupId > 0) {
        this.loadGroup(groupId);
      } else {
        console.error('[FRONTEND ERROR] ===== INVALID GROUP ID FROM ROUTE =====');
        console.error('[FRONTEND ERROR] Invalid group ID from route:', groupId, 'params:', params);
        console.error('[FRONTEND ERROR] This is a FRONTEND/ROUTING issue - cannot parse groupId');
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
    console.log('[FRONTEND] loadGroup called with id:', id, 'type:', typeof id);
    console.trace('[FRONTEND] loadGroup call stack');
    
    if (!id || isNaN(id) || id <= 0) {
      console.error('[FRONTEND ERROR] loadGroup called with invalid id:', id);
      console.error('[FRONTEND ERROR] Current this.group:', this.group);
      console.error('[FRONTEND ERROR] Current this.editingGroup:', this.editingGroup);
      return;
    }
    
    const url = `${this.apiUrl}/${id}`;
    console.log('[FRONTEND] Loading group from URL:', url);
    
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('[FRONTEND] Group loaded successfully:', response);
        const groupInfo = Array.isArray(response.groupInfo) ? response.groupInfo[0] : response.groupInfo;
        console.log('[FRONTEND] Extracted groupInfo:', groupInfo);
        const students = response.students || [];
        
        if (!groupInfo || !groupInfo.id) {
          console.error('[FRONTEND ERROR] groupInfo is missing or has no id:', groupInfo);
          console.error('[FRONTEND ERROR] Full response:', response);
        }
        
        this.group = {
          id: groupInfo?.id || id,
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
        console.log('[FRONTEND] Group updated, this.group.id:', this.group.id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('[FRONTEND ERROR] Error loading group with id:', id);
        console.error('[FRONTEND ERROR] Error object:', error);
        console.error('[FRONTEND ERROR] Error URL:', error.url);
        console.error('[FRONTEND ERROR] Error status:', error.status);
        console.error('[FRONTEND ERROR] Current this.group:', this.group);
        console.error('[FRONTEND ERROR] Current this.editingGroup:', this.editingGroup);
        
        if (error.url && error.url.includes('undefined')) {
          console.error('[FRONTEND ERROR] ===== UNDEFINED ID DETECTED =====');
          console.error('[FRONTEND ERROR] This is a FRONTEND issue - undefined id was passed to loadGroup');
        } else if (error.status === 404) {
          console.error('[FRONTEND ERROR] ===== 404 NOT FOUND =====');
          console.error('[FRONTEND ERROR] This could be a BACKEND issue - group not found, or FRONTEND issue - wrong id');
        }
        
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
    
    console.log('[FRONTEND] onSave called with groupId:', groupId);
    console.log('[FRONTEND] updateData:', updateData);
    console.log('[FRONTEND] Current this.group:', this.group);
    console.log('[FRONTEND] Current this.editingGroup:', this.editingGroup);
    
    this.http.patch(`${this.apiUrl}/${groupId}`, updateData).subscribe({
      next: (response: any) => {
        console.log('[FRONTEND] Update response received:', response);
        console.log('[FRONTEND] Response type:', typeof response);
        console.log('[FRONTEND] Response has groupInfo?', !!response?.groupInfo);
        console.log('[FRONTEND] Response groupInfo:', response?.groupInfo);
        
        const groupData = response?.groupInfo || response;
        console.log('[FRONTEND] Extracted groupData:', groupData);
        
        if (groupData) {
          const finalId = groupData.id || groupId;
          console.log('[FRONTEND] Setting finalId to:', finalId, '(from groupData.id:', groupData.id, 'or groupId:', groupId, ')');
          
          if (!finalId) {
            console.error('[FRONTEND ERROR] ===== NO ID AVAILABLE =====');
            console.error('[FRONTEND ERROR] groupData:', groupData);
            console.error('[FRONTEND ERROR] groupId:', groupId);
            console.error('[FRONTEND ERROR] This is a BACKEND issue - response missing id');
          }
          
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
          console.log('[FRONTEND] Group updated successfully, this.group.id:', this.group.id);
        } else {
          console.error('[FRONTEND ERROR] ===== NO GROUP DATA IN RESPONSE =====');
          console.error('[FRONTEND ERROR] Full response:', response);
          console.error('[FRONTEND ERROR] This is a BACKEND issue - response structure is wrong');
          
          this.group = {
            ...this.group,
            ...this.editingGroup,
            id: groupId
          };
          console.log('[FRONTEND] Group updated (fallback), this.group.id:', this.group.id);
        }
        this.isEditModalOpen = false;
        this.notificationService.success(this.translate.instant('COMMON.SUCCESS'));
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('[FRONTEND ERROR] ===== PATCH REQUEST FAILED =====');
        console.error('[FRONTEND ERROR] Error updating group:', error);
        console.error('[FRONTEND ERROR] Error URL:', error.url);
        console.error('[FRONTEND ERROR] Error status:', error.status);
        console.error('[FRONTEND ERROR] Error message:', error.message);
        console.error('[FRONTEND ERROR] Requested groupId:', groupId);
        console.error('[FRONTEND ERROR] This is a BACKEND issue - PATCH request failed');
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
