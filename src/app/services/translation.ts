import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from './location';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(
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

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.getCurrentLang() || 'es';
  }
}
