import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang('es');
    this.translate.use('es');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.getCurrentLang() || 'es';
  }
}
