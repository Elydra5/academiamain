import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groups',
  imports: [CommonModule, FormsModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups implements OnInit {
  private apiUrl = 'http://10.10.10.165:3000/groups';
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  groups: any[] = [];

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => {
        console.error('Error loading groups:', error);
        this.groups = [];
      }
    });
  }

  onGroupClick(groupId: number) {
    this.router.navigate(['/groups', groupId]);
  }

  openCreateModal() {
    // TODO: Implement create modal
    console.log('Create group modal');
  }
}
