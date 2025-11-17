import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-groups',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups implements OnInit {
  private apiUrl = 'https://academia.tokyohost.eu:3000/groups';
  private adminUrl = 'https://academia.tokyohost.eu:3000/admin';
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  groups: any[] = [];
  users: any[] = [];
  isCreateModalOpen = false;
  newGroup: any = {
    name: '',
    short_description: '',
    moodle_id: '',
    end_date: '',
    teacher: '',
    long_description: ''
  };

  ngOnInit() {
    this.loadGroups();
    this.loadUsers();
  }

  loadGroups() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (groups) => {
        const basicGroups = (groups || [])
          .map((group: any) => ({
            id: group.id,
            name: group.name || '',
            short_description: '',
            moodle_id: null,
            start_date: '',
            end_date: '',
            status: '',
            teacher: '',
            long_description: '',
            studentCount: 0
          }))
          .filter((group: any) => group.id !== null && group.id !== undefined && group.id !== '');
        
        const groupDetailRequests = basicGroups.map((group: any) =>
          this.http.get<any>(`${this.apiUrl}/${group.id}`)
        );
        
        if (groupDetailRequests.length === 0) {
          this.groups = [];
          return;
        }
        
        forkJoin(groupDetailRequests).subscribe({
          next: (groupDetails) => {
            this.groups = basicGroups.map((group: any, index: number) => {
              const detail = groupDetails[index];
              if (detail && detail.groupInfo) {
                const students = detail.students || [];
                return {
                  ...group,
                  id: detail.groupInfo.id || group.id,
                  name: detail.groupInfo.name || group.name,
                  short_description: detail.groupInfo.short_description || '',
                  moodle_id: detail.groupInfo.moodle_id || null,
                  start_date: detail.groupInfo.start_date || '',
                  end_date: detail.groupInfo.end_date || '',
                  status: detail.groupInfo.status || '',
                  teacher: detail.groupInfo.teacher || '',
                  long_description: detail.groupInfo.long_description || '',
                  studentCount: students.length
                };
              }
              return group;
            });
          },
          error: (error) => {
            console.error('Error loading group details:', error);
            this.groups = basicGroups;
          }
        });
      },
      error: (error) => {
        console.error('Error loading groups:', error);
        this.groups = [];
      }
    });
  }

  loadUsers() {
    this.http.get<any[]>(this.adminUrl).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users = [];
      }
    });
  }

  onGroupClick(groupId: number | undefined | null) {
    if (groupId != null && groupId !== undefined) {
      this.router.navigate(['/groups', groupId]);
    }
  }

  openCreateModal() {
    this.newGroup = {
      name: '',
      short_description: '',
      moodle_id: '',
      end_date: '',
      teacher: '',
      long_description: ''
    };
    this.isCreateModalOpen = true;
  }

  onCreateGroup() {
    const groupData = {
      ...this.newGroup,
      moodle_id: this.newGroup.moodle_id ? Number(this.newGroup.moodle_id) : null
    };
    this.http.post(this.apiUrl, groupData).subscribe({
      next: (createdGroup: any) => {
        this.groups.push(createdGroup);
        this.isCreateModalOpen = false;
        console.log('[groups] created', createdGroup);
        this.loadGroups();
      },
      error: (error) => {
        console.error('Error creating group:', error);
        alert('Error creating group. Please try again.');
      }
    });
  }

  onCancelCreate() {
    this.isCreateModalOpen = false;
    this.newGroup = {
      name: '',
      short_description: '',
      moodle_id: '',
      end_date: '',
      teacher: '',
      long_description: ''
    };
  }
}
