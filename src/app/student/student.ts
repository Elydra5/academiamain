import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {
  exampleStudent={
    id:0,
    first_name:"John",
    last_name:"Doe",
    phone_number:"+36 20 2020202",
    enrollment_date:"2025. 02. 25.",
  }
}
