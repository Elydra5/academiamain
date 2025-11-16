import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('academiamain');
  showNavbarAndFooter = false;

  constructor(private router: Router) {
    // Check current route and update visibility
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      // Hide navbar and footer on login and forgot-password pages
      this.showNavbarAndFooter = !url.includes('/login') && !url.includes('/forgot-password');
    });

    // Check initial route
    const currentUrl = this.router.url;
    this.showNavbarAndFooter = !currentUrl.includes('/login') && !currentUrl.includes('/forgot-password');
  }
}
