import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private cachedCountry: string | null = null;

  constructor(private http: HttpClient) {}

  getDefaultLanguage(): Observable<string> {
    if (this.cachedCountry) {
      return of(this.cachedCountry === 'ES' ? 'es' : 'en');
    }

    return this.detectCountry().pipe(
      map((countryCode) => {
        this.cachedCountry = countryCode;
        return countryCode === 'ES' ? 'es' : 'en';
      }),
      catchError(() => {
        const browserLang = this.getLanguageFromBrowser();
        this.cachedCountry = browserLang === 'es' ? 'ES' : 'OTHER';
        return of(browserLang);
      })
    );
  }

  private detectCountry(): Observable<string> {
    return this.http.get<any>('https://ipapi.co/json/').pipe(
      map((response) => response.country_code || ''),
      catchError(() => {
        return this.http.get<any>('https://ip-api.com/json/').pipe(
          map((response) => response.countryCode || ''),
          catchError(() => of(''))
        );
      })
    );
  }

  private getLanguageFromBrowser(): string {
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    
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
    
    return 'en';
  }
}

