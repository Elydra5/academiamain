import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check initial authentication state
    this.isAuthenticated = this.authService.isAuthenticated();
    
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
