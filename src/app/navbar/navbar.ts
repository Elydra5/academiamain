import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  @ViewChild('userManagementDropdown', { static: false }) userManagementDropdown?: ElementRef;
  @ViewChild('userManagementDropdownMobile', { static: false }) userManagementDropdownMobile?: ElementRef;
  isAuthenticated = false;
  currentLang = 'es';
  isMobileMenuOpen = false;
  isUserManagementOpen = false;
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.getCurrentLang() || 'es';
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    
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
    document.body.style.overflow = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleUserManagement(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isUserManagementOpen = !this.isUserManagementOpen;
  }

  closeUserManagement() {
    this.isUserManagementOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isUserManagementOpen) {
      const target = event.target as HTMLElement;
      const dropdownElement = this.userManagementDropdown?.nativeElement;
      const mobileDropdownElement = this.userManagementDropdownMobile?.nativeElement;
      
      const isClickInsideDesktop = dropdownElement && dropdownElement.contains(target);
      const isClickInsideMobile = mobileDropdownElement && mobileDropdownElement.contains(target);
      
      if (!isClickInsideDesktop && !isClickInsideMobile) {
        this.closeUserManagement();
      }
    }
  }

  isRouteActive(routes: string[]): boolean {
    const currentUrl = this.router.url;
    return routes.some(route => currentUrl.startsWith(route));
  }
}
