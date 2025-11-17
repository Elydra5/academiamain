import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgotpasswd',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './forgotpasswd.html',
  styleUrl: './forgotpasswd.css',
})
export class Forgotpasswd {
  private apiUrl = 'http://127.0.0.1:3000';
  
  constructor(private http: HttpClient) {}

  email = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  onSubmit() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${this.apiUrl}/forgot-password`, {
      email: this.email
    }).subscribe({
      next: (response: any) => {
        console.log('Password reset email sent:', response);
        this.isLoading = false;
        this.successMessage = 'Password reset link has been sent to your email.';
        this.email = '';
      },
      error: (error) => {
        console.error('Error sending reset email:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to send reset email. Please try again.';
      }
    });
  }
}
