import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../services/notification';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private apiUrl = 'https://academia.tokyohost.eu:3000/admin';
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {}

  users: any[] = [];
  isCreateModalOpen = false;
  newUser: any = {
    username: '',
    password: '',
    role: '',
    first_name: '',
    last_name: '',
    email: '',
    moodle_id: null,
    status: 1
  };

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users = [];
      }
    });
  }

  trackByUserId(index: number, user: any): any {
    return user.id || user.username || index;
  }

  onUserClick(user: any) {
    if (user && user.username) {
      this.router.navigate(['/user', user.username]);
    }
  }

  openCreateModal() {
    this.newUser = {
      username: '',
      password: '',
      role: '',
      first_name: '',
      last_name: '',
      email: '',
      moodle_id: null,
      status: 1
    };
    this.isCreateModalOpen = true;
  }

  onCreateUser() {
    this.http.post(this.apiUrl, this.newUser).subscribe({
      next: (createdUser: any) => {
        this.users.push(createdUser);
        this.isCreateModalOpen = false;
        this.notificationService.success(this.translate.instant('COMMON.USER_CREATED_SUCCESS'));
        // console.log('[users] created', createdUser);
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.notificationService.error(this.translate.instant('COMMON.ERROR_CREATING_USER'));
      }
    });
  }

  onCancelCreate() {
    this.isCreateModalOpen = false;
    this.newUser = {
      username: '',
      password: '',
      role: '',
      first_name: '',
      last_name: '',
      email: '',
      moodle_id: null,
      status: 1
    };
  }

  @HostListener('document:keydown', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isCreateModalOpen) {
      this.onCancelCreate();
    }
  }
}
