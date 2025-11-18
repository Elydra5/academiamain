import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-billing',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export class Billing implements OnInit {
  private studentsUrl = 'https://academia.tokyohost.eu:3000/students';
  private billingUrl = 'https://academia.tokyohost.eu:3000/billing/generate';
  
  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.getCurrentLang() || 'es';
  }

  currentLang = 'es';

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
        this.translate.get('BILLING.ERROR_LOADING_STUDENTS').subscribe((text: string) => {
          this.errorMessage = text;
        });
        this.isLoading = false;
      }
    });
  }

  generateInvoice() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.invoiceData.studentId || !this.invoiceData.hoursStudied || !this.invoiceData.totalAmount) {
      this.translate.get('BILLING.ERROR_ALL_FIELDS_REQUIRED').subscribe((text: string) => {
        this.errorMessage = text;
      });
      return;
    }

    if (isNaN(this.invoiceData.hoursStudied!) || isNaN(this.invoiceData.totalAmount!)) {
      this.translate.get('BILLING.ERROR_MUST_BE_NUMBERS').subscribe((text: string) => {
        this.errorMessage = text;
      });
      return;
    }

    if (this.invoiceData.hoursStudied! <= 0 || this.invoiceData.totalAmount! <= 0) {
      this.translate.get('BILLING.ERROR_MUST_BE_POSITIVE').subscribe((text: string) => {
        this.errorMessage = text;
      });
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

        this.translate.get('BILLING.INVOICE_GENERATED_SUCCESS').subscribe((text: string) => {
          this.successMessage = text;
        });
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
              this.errorMessage = errorObj.message || '';
              if (!this.errorMessage) {
                this.translate.get('BILLING.ERROR_GENERATING_INVOICE').subscribe((translatedText: string) => {
                  this.errorMessage = translatedText;
                });
              }
            } catch {
              this.translate.get('BILLING.ERROR_GENERATING_INVOICE').subscribe((text: string) => {
                this.errorMessage = text;
              });
            }
          });
        } else {
          this.errorMessage = error.error?.message || '';
          if (!this.errorMessage) {
            this.translate.get('BILLING.ERROR_GENERATING_INVOICE').subscribe((text: string) => {
              this.errorMessage = text;
            });
          }
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
