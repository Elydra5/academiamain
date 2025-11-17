import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing',
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export class Billing implements OnInit {
  private studentsUrl = 'http://10.10.10.165:3000/students';
  private billingUrl = 'http://10.10.10.165:3000/billing/generate';
  
  constructor(private http: HttpClient) {}

  students: any[] = [];
  isLoading = false;
  isGenerating = false;
  errorMessage = '';
  successMessage = '';

  invoiceData = {
    studentId: null as number | null,
    hoursStudied: null as number | null,
    totalAmount: null as number | null
  };

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = true;
    this.http.get<any[]>(this.studentsUrl).subscribe({
      next: (students) => {
        this.students = students || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.errorMessage = 'Error loading students. Please try again.';
        this.isLoading = false;
      }
    });
  }

  generateInvoice() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.invoiceData.studentId || !this.invoiceData.hoursStudied || !this.invoiceData.totalAmount) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (isNaN(this.invoiceData.hoursStudied!) || isNaN(this.invoiceData.totalAmount!)) {
      this.errorMessage = 'Hours studied and total amount must be numbers';
      return;
    }

    if (this.invoiceData.hoursStudied! <= 0 || this.invoiceData.totalAmount! <= 0) {
      this.errorMessage = 'Hours studied and total amount must be positive numbers';
      return;
    }

    this.isGenerating = true;

    const requestBody = {
      studentId: Number(this.invoiceData.studentId),
      hoursStudied: Number(this.invoiceData.hoursStudied),
      totalAmount: Number(this.invoiceData.totalAmount)
    };

    this.http.post(this.billingUrl, requestBody, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice_${this.invoiceData.studentId}_${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.successMessage = 'Invoice generated successfully!';
        this.isGenerating = false;
        
        setTimeout(() => {
          this.resetForm();
        }, 2000);
      },
      error: (error) => {
        console.error('Error generating invoice:', error);
        this.isGenerating = false;
        
        if (error.error instanceof Blob) {
          error.error.text().then((text: string) => {
            try {
              const errorObj = JSON.parse(text);
              this.errorMessage = errorObj.message || 'Error generating invoice. Please try again.';
            } catch {
              this.errorMessage = 'Error generating invoice. Please try again.';
            }
          });
        } else {
          this.errorMessage = error.error?.message || 'Error generating invoice. Please try again.';
        }
      }
    });
  }

  resetForm() {
    this.invoiceData = {
      studentId: null,
      hoursStudied: null,
      totalAmount: null
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  getSelectedStudentName(): string {
    if (!this.invoiceData.studentId) return '';
    const student = this.students.find(s => s.id === this.invoiceData.studentId);
    return student ? `${student.first_name} ${student.last_name}` : '';
  }
}
