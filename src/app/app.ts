import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocationService } from './services/location';

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
    private translate: TranslateService,
    private locationService: LocationService
  ) {
    this.translate.setFallbackLang('es');
    
    const browserLang = this.getInitialLanguageFromBrowser();
    this.translate.use(browserLang);
    
    this.locationService.getDefaultLanguage().subscribe((defaultLang) => {
      if (defaultLang !== browserLang) {
        this.translate.use(defaultLang);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      this.showNavbarAndFooter = !url.includes('/login') && !url.includes('/forgot-password');
    });
    
    const currentUrl = this.router.url;
    this.showNavbarAndFooter = !currentUrl.includes('/login') && !currentUrl.includes('/forgot-password');
  }

  private getInitialLanguageFromBrowser(): string {
    const browserLang = navigator.language || (navigator as any).userLanguage || 'es';
    
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone === 'Europe/Madrid' || timezone.includes('Madrid')) {
        return 'es';
      }
    } catch (e) {
    }
    
    return 'es';
  }
}
