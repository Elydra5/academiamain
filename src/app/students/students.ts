import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  private apiUrl = 'http://localhost:3000/api/students';
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  students: any[] = [];
  isCreateModalOpen = false;
  newStudent: any = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    enrollment_date: '',
    major: ''
  };

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.students = [];
      }
    });
  }

  openCreateModal() {
    this.newStudent = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      enrollment_date: '',
      major: ''
    };
    this.isCreateModalOpen = true;
  }

  onCreateStudent() {
    this.http.post(this.apiUrl, this.newStudent).subscribe({
      next: (createdStudent: any) => {
        this.students.push(createdStudent);
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
      email: '',
      phone_number: '',
      enrollment_date: '',
      major: ''
    };
  }

  onStudentClick(studentId: number) {
    this.router.navigate(['/student', studentId]);
  }
}
