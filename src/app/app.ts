import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('academiamain');
  showNavbarAndFooter = false;

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.setFallbackLang('es');
    this.translate.use('es');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      this.showNavbarAndFooter = !url.includes('/login') && !url.includes('/forgot-password');
    });
    
    const currentUrl = this.router.url;
    this.showNavbarAndFooter = !currentUrl.includes('/login') && !currentUrl.includes('/forgot-password');
  }
}
