import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Forgotpasswd } from './forgotpasswd/forgotpasswd';
import { Students } from './students/students';
import { Groups } from './groups/groups';
import { Attendance } from './attendance/attendance';
import { Billing } from './billing/billing';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: Login},
    {path: 'forgot-password', component: Forgotpasswd},
    {path: 'students', component: Students},
    {path: 'students/:id', component: Students},
    {path: 'groups', component: Groups},
    {path: 'groups/:id', component: Groups},
    {path: 'attendance', component: Attendance},
    {path: 'attendance/:id', component: Attendance},
    {path: 'billing', component: Billing},
    {path: 'billing/:id', component: Billing},
    {path: 'logout', redirectTo: 'login' },
    {path: '**', redirectTo: 'login' },
];
