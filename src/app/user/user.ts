import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  private apiUrl = 'http://10.10.10.165:3000/admin';
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  user: any = {
    username: "Loading...",
    role: "",
    first_name: "",
    last_name: "",
    email: "",
    moodle_id: null,
    last_login: null,
    status: 1
  };

  isEditModalOpen = false;
  editingUser: any = {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      const username = params['username'];
      console.log('Username from route:', username);
      if (username) {
        this.loadUser(username);
      } else {
        console.error('Invalid username:', username);
      }
    });
  }

  loadUser(username: string) {
    const url = `${this.apiUrl}/${username}`;
    console.log('Loading user from URL:', url);
    
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('User loaded successfully:', response);
        const userData = Array.isArray(response) ? response[0] : response;
        console.log('Extracted user object:', userData);
        
        this.user = {
          username: userData?.username || '',
          role: userData?.role || '',
          first_name: userData?.first_name || '',
          last_name: userData?.last_name || '',
          email: userData?.email || '',
          moodle_id: userData?.moodle_id || null,
          last_login: userData?.last_login || null,
          status: userData?.status !== undefined ? userData.status : 1
        };
        console.log('user after assignment:', this.user);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading user:', error);
        console.error('Error details:', error.status, error.statusText, error.message);
        this.user = {
          username: "User Not Found",
          role: "",
          first_name: "",
          last_name: "",
          email: "",
          moodle_id: null,
          last_login: null,
          status: 1
        };
      }
    });
  }

  onEdit(userToEdit?: any) {
    const u = userToEdit ?? this.user;
    this.editingUser = { ...u }; 
    this.isEditModalOpen = true;
    console.log('[user] edit clicked', u);
  }

  onSave() {
    const url = `${this.apiUrl}/${this.editingUser.username}`;
    this.http.patch(url, this.editingUser).subscribe({
      next: (updatedUser: any) => {
        this.user = { ...updatedUser };
        this.isEditModalOpen = false;
        console.log('[user] saved', updatedUser);
        // Reload user data to ensure we have the latest
        this.loadUser(this.user.username);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        alert('Error updating user. Please try again.');
      }
    });
  }

  onCancel() {
    this.isEditModalOpen = false;
    this.editingUser = {};
  }

  onDelete(userToDelete?: any) {
    const u = userToDelete ?? this.user;
    const name = u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : u.username;
    const confirmed = confirm(`Are you sure you want to delete user ${name}?`);
    if (!confirmed) return;

    const url = `${this.apiUrl}/${u.username}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log('[user] deleted', u);
        alert('User deleted successfully');
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
      }
    });
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  }

  getStatusText(status: number): string {
    return status === 1 ? 'Active' : 'Inactive';
  }
}
