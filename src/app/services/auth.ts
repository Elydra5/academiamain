import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  /**
   * Check if token exists in localStorage
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Get the JWT token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Save the JWT token to localStorage
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Remove the JWT token from localStorage
   */
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  /**
   * Logout the user
   */
  logout(): void {
    this.removeToken();
  }
}
