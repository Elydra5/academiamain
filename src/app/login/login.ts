import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private apiUrl = 'http://10.10.10.165:3000';
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  isLoginMode = true;
  isLoading = false;
  errorMessage = '';

  loginData = {
    username: '',
    password: ''
  };

  registerData = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  };

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/students']);
      return;
    }
    this.isLoginMode = true;
  }

  switchToLogin() {
    this.isLoginMode = true;
    this.errorMessage = '';
  }

  switchToRegister() {
    this.isLoginMode = false;
    this.errorMessage = '';
  }

  onLogin() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    this.http.post(`${this.apiUrl}/api/login`, {
      username: this.loginData.username,
      password: this.loginData.password
    }).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        
        const token = response.token || response.access_token || response.jwt;
        
        if (token) {
          this.authService.setToken(token);
          this.isLoading = false;
          this.router.navigate(['/students']);
        } else {
          this.isLoading = false;
          this.errorMessage = 'No token received from server.';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }

  onRegister() {
    if (this.isLoading) return;
    
    if (this.registerData.password !== this.registerData.passwordConfirm) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.http.post(`${this.apiUrl}/api/image.pngregister`, {
      email: this.registerData.email,
      username: this.registerData.username,
      password: this.registerData.password
    }).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        this.isLoading = false;
        this.isLoginMode = true;
        this.loginData.username = this.registerData.username;
        this.registerData = {
          email: '',
          username: '',
          password: '',
          passwordConfirm: ''
        };
        alert('Registration successful! Please log in.');
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
