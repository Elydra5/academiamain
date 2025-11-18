import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface DashboardStats {
  studentsCount: number;
  activeGroups: number;
  todayAttendance: number;
  monthlyRevenue: number;
}

interface AttendanceTrend {
  date: string;
  attendance_count: number;
}

interface GroupDistribution {
  id: number;
  name: string;
  student_count: number;
  attendance_count: number;
}

interface MonthlyBilling {
  month: string;
  total_revenue: number;
  receipt_count: number;
}

interface DashboardData {
  summaryCards: DashboardStats;
  attendanceTrends: AttendanceTrend[];
  groupDistribution: GroupDistribution[];
  monthlyBilling: MonthlyBilling[];
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private apiUrl = 'https://academia.tokyohost.eu:3000/dashboard';
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) {}

  isLoading = true;
  stats: DashboardStats = {
    studentsCount: 0,
    activeGroups: 0,
    todayAttendance: 0,
    monthlyRevenue: 0
  };
  attendanceTrends: AttendanceTrend[] = [];
  groupDistribution: GroupDistribution[] = [];
  monthlyBilling: MonthlyBilling[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.http.get<{ success: boolean; data: DashboardData }>(this.apiUrl).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats = response.data.summaryCards || this.stats;
          this.attendanceTrends = response.data.attendanceTrends || [];
          this.groupDistribution = response.data.groupDistribution || [];
          this.monthlyBilling = response.data.monthlyBilling || [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
  }

  formatMonth(monthString: string): string {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric'
    });
  }

  getMaxAttendanceCount(): number {
    if (this.attendanceTrends.length === 0) return 100;
    return Math.max(...this.attendanceTrends.map(t => t.attendance_count), 100);
  }

  getAttendanceBarHeight(count: number): number {
    const max = this.getMaxAttendanceCount();
    return max > 0 ? (count / max) * 100 : 0;
  }

  getMaxRevenue(): number {
    if (this.monthlyBilling.length === 0) return 1000;
    return Math.max(...this.monthlyBilling.map(b => b.total_revenue), 1000);
  }

  getRevenueBarHeight(revenue: number): number {
    const max = this.getMaxRevenue();
    return max > 0 ? (revenue / max) * 100 : 0;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
