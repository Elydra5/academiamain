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
      return of('es');
    }

    return this.detectCountry().pipe(
      map((countryCode) => {
        this.cachedCountry = countryCode;
        return 'es';
      }),
      catchError(() => {
        const browserLang = this.getLanguageFromBrowser();
        this.cachedCountry = browserLang === 'es' ? 'ES' : 'OTHER';
        return of(browserLang);
      })
    );
  }

  private detectCountry(): Observable<string> {
    return this.http.get<any>('https://ipwho.is/json/').pipe(
      map((response) => response.country_code || ''),
      catchError(() => {
        return this.http.get<any>('https://ipwho.is/json/').pipe(
          map((response) => response.countryCode || ''),
          catchError(() => of(''))
        );
      })
    );
  }

  private getLanguageFromBrowser(): string {
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

