import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface ScheduleItem {
  id: number;
  group_id: number;
  date: string;
  duration: number;
  teacher: string;
  group_name: string;
  group_description?: string;
  student_count: number;
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: 'course_start' | 'course_end' | 'payment_deadline';
  group_id?: number;
  group_name?: string;
  teacher?: string;
  student_id?: number;
  receipt_number?: string;
  amount?: number;
}

interface CalendarData {
  schedule: ScheduleItem[];
  events: CalendarEvent[];
  dateRange?: {
    start: string;
    end: string;
  };
  month?: number;
  year?: number;
  weekStart?: string;
  weekEnd?: string;
}

type ViewMode = 'month' | 'week' | 'day';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  private apiUrl = 'https://academia.tokyohost.eu:3000/calendar';
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) {}

  isLoading = false;
  currentDate = new Date();
  viewMode: ViewMode = 'month';
  schedule: ScheduleItem[] = [];
  events: CalendarEvent[] = [];
  selectedGroupId: number | null = null;

  ngOnInit() {
    this.loadCalendarData();
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }

  get currentMonth(): number {
    return this.currentDate.getMonth() + 1;
  }

  getMonthName(month: number): string {
    const date = new Date(2024, month - 1, 1);
    return date.toLocaleDateString(this.translate.getCurrentLang() === 'es' ? 'es-ES' : 'en-US', { month: 'long' });
  }

  getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  getWeekEnd(date: Date): Date {
    const start = this.getWeekStart(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return end;
  }

  getMonthStartEnd(year: number, month: number): { start: string; end: string } {
    const start = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0).getDate();
    const end = new Date(year, month - 1, lastDay);
    
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  }

  loadCalendarData() {
    this.isLoading = true;

    let params = new HttpParams();

    if (this.viewMode === 'month') {
      params = params.set('year', this.currentYear.toString());
      params = params.set('month', this.currentMonth.toString());

      this.http.get<{ success: boolean; data: CalendarData }>(`${this.apiUrl}/month`, { params }).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.schedule = response.data.schedule || [];
            this.events = response.data.events || [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading calendar data:', error);
          this.isLoading = false;
        }
      });
    } else if (this.viewMode === 'week') {
      const weekStart = this.getWeekStart(this.currentDate);
      const startDateStr = weekStart.toISOString().split('T')[0];
      
      params = params.set('startDate', startDateStr);
      
      this.http.get<{ success: boolean; data: CalendarData }>(`${this.apiUrl}/week`, { params }).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.schedule = response.data.schedule || [];
            this.events = response.data.events || [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading calendar data:', error);
          this.isLoading = false;
        }
      });
    } else {
      const weekStart = this.getWeekStart(this.currentDate);
      const weekEnd = this.getWeekEnd(this.currentDate);
      
      params = params.set('startDate', weekStart.toISOString().split('T')[0]);
      params = params.set('endDate', weekEnd.toISOString().split('T')[0]);
      
      if (this.selectedGroupId) {
        params = params.set('groupId', this.selectedGroupId.toString());
      }
      
      this.http.get<{ success: boolean; data: CalendarData }>(this.apiUrl, { params }).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.schedule = response.data.schedule || [];
            this.events = response.data.events || [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading calendar data:', error);
          this.isLoading = false;
        }
      });
    }
  }

  setViewMode(mode: ViewMode) {
    this.viewMode = mode;
    this.loadCalendarData();
  }

  previousPeriod() {
    if (this.viewMode === 'month') {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    } else if (this.viewMode === 'week') {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    }
    this.loadCalendarData();
  }

  nextPeriod() {
    if (this.viewMode === 'month') {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    } else if (this.viewMode === 'week') {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else {
      this.currentDate = new Date(this.currentDate);
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }
    this.loadCalendarData();
  }

  goToToday() {
    this.currentDate = new Date();
    this.loadCalendarData();
  }

  getEventsForDate(date: string): CalendarEvent[] {
    return this.events.filter(e => e.date === date);
  }

  getScheduleForDate(date: string): ScheduleItem[] {
    return this.schedule.filter(s => s.date === date);
  }

  getDaysInMonth(year: number, month: number): Date[] {
    const days: Date[] = [];
    const firstDay = new Date(year, month - 1, 1);
    const startDate = new Date(firstDay);
    const dayOfWeek = startDate.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startDate.setDate(startDate.getDate() + mondayOffset);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  }

  getWeekDays(): Date[] {
    const weekStart = this.getWeekStart(this.currentDate);
    const days: Date[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      days.push(date);
    }
    
    return days;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth() && date.getFullYear() === this.currentDate.getFullYear();
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString(this.translate.getCurrentLang() === 'es' ? 'es-ES' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getEventIconPath(type: string): string {
    switch (type) {
      case 'course_start':
        return 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5';
      case 'course_end':
        return 'M9 18l6-6-6-6';
      case 'payment_deadline':
        return 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6';
      default:
        return 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6';
    }
  }

  getEventColor(type: string): string {
    switch (type) {
      case 'course_start':
        return '#10b981';
      case 'course_end':
        return '#ef4444';
      case 'payment_deadline':
        return '#f59e0b';
      default:
        return '#6366f1';
    }
  }
}
