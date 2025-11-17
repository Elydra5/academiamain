import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-students',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  private apiUrl = 'https://academia.tokyohost.eu:3000/students';
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  students: any[] = [];
  paginatedStudents: any[] = [];
  isCreateModalOpen = false;
  newStudent: any = {
    first_name: '',
    last_name: '',
    phone: ''
  };

  currentPage = 1;
  pageSize = 20;
  pageSizeOptions = [10, 20, 30, 50];
  totalPages = 1;
  Math = Math;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (students) => {
        this.students = students;
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.students = [];
        this.paginatedStudents = [];
        this.totalPages = 1;
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.students.length / this.pageSize);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStudents = this.students.slice(startIndex, endIndex);
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  openCreateModal() {
    this.newStudent = {
      first_name: '',
      last_name: '',
      phone: ''
    };
    this.isCreateModalOpen = true;
  }

  onCreateStudent() {
    this.http.post(this.apiUrl, this.newStudent).subscribe({
      next: (createdStudent: any) => {
        this.students.push(createdStudent);
        this.updatePagination();
        this.isCreateModalOpen = false;
        console.log('[students] created', createdStudent);
      },
      error: (error) => {
        console.error('Error creating student:', error);
        alert('Error creating student. Please try again.');
      }
    });
  }

  onCancelCreate() {
    this.isCreateModalOpen = false;
    this.newStudent = {
      first_name: '',
      last_name: '',
      phone: ''
    };
  }

  onStudentClick(studentId: number) {
    console.log('Student clicked, ID:', studentId);
    console.log('Navigating to:', `/student/${studentId}`);
    this.router.navigate(['/student', studentId]);
  }
}
