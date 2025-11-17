import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private apiUrl = 'http://127.0.0.1:3000/admin';
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  users: any[] = [];
  isCreateModalOpen = false;
  newUser: any = {
    username: '',
    email: '',
    password: '',
    role: ''
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
      email: '',
      password: '',
      role: ''
    };
    this.isCreateModalOpen = true;
  }

  onCreateUser() {
    this.http.post(this.apiUrl, this.newUser).subscribe({
      next: (createdUser: any) => {
        this.users.push(createdUser);
        this.isCreateModalOpen = false;
        console.log('[users] created', createdUser);
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
      }
    });
  }

  onCancelCreate() {
    this.isCreateModalOpen = false;
    this.newUser = {
      username: '',
      email: '',
      password: '',
      role: ''
    };
  }
}
