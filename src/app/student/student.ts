import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  imports: [FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student implements OnInit {
  private apiUrl = 'http://localhost:3000/api/students';
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  exampleStudent: any = {
    id: 0,
    first_name: "Loading...",
    last_name: "",
    email: "",
    phone_number: "",
    enrollment_date: "",
    major: ""
  };

  isEditModalOpen = false;
  editingStudent: any = {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      const studentId = +params['id'];
      this.loadStudent(studentId);
    });
  }

  loadStudent(id: number) {
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (student: any) => {
        this.exampleStudent = { ...student };
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.exampleStudent = {
          id: id,
          first_name: "Student",
          last_name: "Not Found",
          email: "",
          phone_number: "",
          enrollment_date: "",
          major: ""
        };
      }
    });
  }

  onEdit(student?: any) {
    const s = student ?? this.exampleStudent;
    this.editingStudent = { ...s }; 
    this.isEditModalOpen = true;
    console.log('[student] edit clicked', s);
  }

  onSave() {
    this.http.patch(`${this.apiUrl}/${this.editingStudent.id}`, this.editingStudent).subscribe({
      next: (updatedStudent: any) => {
        this.exampleStudent = { ...updatedStudent };
        this.isEditModalOpen = false;
        console.log('[student] saved', updatedStudent);
      },
      error: (error) => {
        console.error('Error updating student:', error);
        alert('Error updating student. Please try again.');
      }
    });
  }

  onCancel() {
    this.isEditModalOpen = false;
    this.editingStudent = {};
  }

  onDelete(student?: any) {
    const s = student ?? this.exampleStudent;
    const confirmed = confirm(`Are you sure you want to delete ${s.first_name} ${s.last_name}?`);
    if (!confirmed) return;

    this.http.delete(`${this.apiUrl}/${s.id}`).subscribe({
      next: () => {
        console.log('[student] deleted', s);
        alert('Student deleted successfully');
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error deleting student:', error);
        alert('Error deleting student. Please try again.');
      }
    });
  }
}
