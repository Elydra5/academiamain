import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../services/notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  standalone: true
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription?: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.getNotifications().subscribe(
      notifications => {
        this.notifications = notifications;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  remove(id: number) {
    this.notificationService.remove(id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01 9 11.01';
      case 'error':
        return 'M18 6L6 18M6 6l12 12';
      case 'warning':
        return 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01';
      case 'info':
        return 'M12 16v-4 M12 8h.01 M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z';
      default:
        return '';
    }
  }
}

