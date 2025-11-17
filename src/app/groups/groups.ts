import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groups',
  imports: [CommonModule, FormsModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups implements OnInit {
  private apiUrl = 'http://10.10.10.165:3000/groups';
  private adminUrl = 'http://10.10.10.165:3000/admin';
  
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
        this.groups = groups;
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

  onGroupClick(groupId: number) {
    this.router.navigate(['/groups', groupId]);
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
