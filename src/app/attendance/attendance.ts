import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance implements OnInit {
  private apiUrl = 'http://localhost:3000/attendance';
  private studentsUrl = 'http://localhost:3000/students';
  private groupsUrl = 'http://localhost:3000/groups';
  private adminUrl = 'http://localhost:3000/admin';
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  attendances: any[] = [];
  students: any[] = [];
  groups: any[] = [];
  teachers: any[] = [];
  
  isCreateModalOpen = false;
  isEditModalOpen = false;
  isReceiptModalOpen = false;
  isGeneratingReceipt = false;
  
  errorMessage = '';
  successMessage = '';
  
  newAttendance: any = {
    group_id: null,
    student_id: null,
    date: '',
    duration: null,
    teacher: '',
    receipt_id: null,
    hourly_rate: null
  };
  
  editingAttendance: any = {};
  selectedAttendanceForReceipt: any = null;
  
  receiptData: any = {
    hours: null,
    hourlyRate: null,
    paymentMethod: ''
  };

  ngOnInit() {
    this.loadAttendances();
    this.loadStudents();
    this.loadGroups();
    this.loadTeachers();
  }

  loadAttendances() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (attendances) => {
        this.attendances = attendances || [];
      },
      error: (error) => {
        console.error('Error loading attendances:', error);
        this.attendances = [];
      }
    });
  }

  loadStudents() {
    this.http.get<any[]>(this.studentsUrl).subscribe({
      next: (students) => {
        this.students = students || [];
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.students = [];
      }
    });
  }

  loadGroups() {
    this.http.get<any[]>(this.groupsUrl).subscribe({
      next: (groups) => {
        this.groups = groups || [];
      },
      error: (error) => {
        console.error('Error loading groups:', error);
        this.groups = [];
      }
    });
  }

  loadTeachers() {
    this.http.get<any[]>(this.adminUrl).subscribe({
      next: (users) => {
        this.teachers = users || [];
        console.log('Loaded teachers:', this.teachers);
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.teachers = [];
      }
    });
  }

  openCreateModal() {
    this.newAttendance = {
      group_id: null,
      student_id: null,
      date: '',
      duration: null,
      teacher: '',
      receipt_id: null,
      hourly_rate: null
    };
    this.errorMessage = '';
    this.successMessage = '';
    this.isCreateModalOpen = true;
  }

  onCreateAttendance() {
    if (!this.newAttendance.group_id || !this.newAttendance.student_id || !this.newAttendance.date || 
        !this.newAttendance.duration || !this.newAttendance.teacher || !this.newAttendance.hourly_rate) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const attendanceData = {
      ...this.newAttendance,
      group_id: Number(this.newAttendance.group_id),
      student_id: Number(this.newAttendance.student_id),
      duration: Number(this.newAttendance.duration),
      hourly_rate: Number(this.newAttendance.hourly_rate),
      receipt_id: this.newAttendance.receipt_id || null
    };

    this.http.post(this.apiUrl, attendanceData).subscribe({
      next: (createdAttendance: any) => {
        this.attendances.push(createdAttendance);
        this.isCreateModalOpen = false;
        this.successMessage = 'Attendance created successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error creating attendance:', error);
        this.errorMessage = error.error?.message || 'Error creating attendance. Please try again.';
      }
    });
  }

  onCancelCreate() {
    this.isCreateModalOpen = false;
    this.errorMessage = '';
    this.newAttendance = {
      group_id: null,
      student_id: null,
      date: '',
      duration: null,
      teacher: '',
      receipt_id: null,
      hourly_rate: null
    };
  }

  openEditModal(attendance: any) {
    this.editingAttendance = { 
      ...attendance,
      date: this.formatDateForInput(attendance.date)
    };
    this.errorMessage = '';
    this.successMessage = '';
    this.isEditModalOpen = true;
  }

  onUpdateAttendance() {
    if (!this.editingAttendance.group_id || !this.editingAttendance.student_id || !this.editingAttendance.date || 
        !this.editingAttendance.duration || !this.editingAttendance.teacher || !this.editingAttendance.hourly_rate) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const attendanceData = {
      ...this.editingAttendance,
      group_id: Number(this.editingAttendance.group_id),
      student_id: Number(this.editingAttendance.student_id),
      duration: Number(this.editingAttendance.duration),
      hourly_rate: Number(this.editingAttendance.hourly_rate)
    };

    this.http.put(`${this.apiUrl}/${this.editingAttendance.id}`, attendanceData).subscribe({
      next: () => {
        const index = this.attendances.findIndex(a => a.id === this.editingAttendance.id);
        if (index !== -1) {
          this.attendances[index] = { ...this.editingAttendance };
        }
        this.isEditModalOpen = false;
        this.successMessage = 'Attendance updated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error updating attendance:', error);
        this.errorMessage = error.error?.message || 'Error updating attendance. Please try again.';
      }
    });
  }

  onCancelEdit() {
    this.isEditModalOpen = false;
    this.errorMessage = '';
    this.editingAttendance = {};
  }

  onDeleteAttendance(attendance: any) {
    if (!confirm(`Are you sure you want to delete this attendance record?`)) {
      return;
    }

    this.http.delete(`${this.apiUrl}/${attendance.id}`).subscribe({
      next: () => {
        this.attendances = this.attendances.filter(a => a.id !== attendance.id);
        this.successMessage = 'Attendance deleted successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error deleting attendance:', error);
        alert('Error deleting attendance. Please try again.');
      }
    });
  }

  openReceiptModal(attendance: any) {
    if (attendance.receipt_id) {
      alert('Receipt already generated for this attendance.');
      return;
    }
    
    this.selectedAttendanceForReceipt = attendance;
    this.receiptData = {
      hours: null,
      hourlyRate: attendance.hourly_rate || null,
      paymentMethod: ''
    };
    this.errorMessage = '';
    this.isReceiptModalOpen = true;
  }

  onGenerateReceipt() {
    if (!this.selectedAttendanceForReceipt) return;

    const billingData: any = {};
    
    if (this.receiptData.hours !== null && this.receiptData.hours !== undefined) {
      billingData.hours = Number(this.receiptData.hours);
    }
    
    if (this.receiptData.hourlyRate !== null && this.receiptData.hourlyRate !== undefined) {
      billingData.hourlyRate = Number(this.receiptData.hourlyRate);
    }
    
    if (this.receiptData.paymentMethod) {
      billingData.paymentMethod = this.receiptData.paymentMethod;
    }

    this.isGeneratingReceipt = true;
    this.errorMessage = '';

    this.http.post(`${this.apiUrl}/${this.selectedAttendanceForReceipt.id}/generate-receipt`, billingData, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `receipt_${this.selectedAttendanceForReceipt.id}_${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.isReceiptModalOpen = false;
        this.isGeneratingReceipt = false;
        this.successMessage = 'Receipt generated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
        this.loadAttendances();
      },
      error: (error) => {
        console.error('Error generating receipt:', error);
        this.isGeneratingReceipt = false;
        
        if (error.status === 404) {
          this.errorMessage = 'Receipt endpoint not found. Please check backend route configuration.';
        } else if (error.error instanceof Blob) {
          error.error.text().then((text: string) => {
            try {
              const errorObj = JSON.parse(text);
              this.errorMessage = errorObj.message || 'Error generating receipt. Please try again.';
            } catch {
              this.errorMessage = 'Error generating receipt. Please try again.';
            }
          });
        } else {
          this.errorMessage = error.error?.message || error.message || 'Error generating receipt. Please try again.';
        }
      }
    });
  }

  onCancelReceipt() {
    this.isReceiptModalOpen = false;
    this.errorMessage = '';
    this.selectedAttendanceForReceipt = null;
    this.receiptData = {
      hours: null,
      hourlyRate: null,
      paymentMethod: ''
    };
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? `${student.first_name} ${student.last_name}` : `Student #${studentId}`;
  }

  getGroupName(groupId: number): string {
    const group = this.groups.find(g => g.id === groupId);
    return group ? group.name : `Group #${groupId}`;
  }

  formatDuration(minutes: number): string {
    if (!minutes) return '0 min';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${mins}min`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch {
      return '';
    }
  }
}
