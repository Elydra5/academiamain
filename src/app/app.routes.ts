import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Forgotpasswd } from './forgotpasswd/forgotpasswd';
import { Students } from './students/students';
import { Groups } from './groups/groups';
import { Attendance } from './attendance/attendance';
import { Billing } from './billing/billing';
import { Group } from './group/group';
import { Student } from './student/student';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: Login},
    {path: 'forgot-password', component: Forgotpasswd},
    {path: 'students', component: Students, canActivate: [authGuard]},
    {path: 'student/:id', component: Student, canActivate: [authGuard]},
    {path: 'groups', component: Groups, canActivate: [authGuard]},
    {path: 'groups/:id', component: Group, canActivate: [authGuard]},
    {path: 'attendance', component: Attendance, canActivate: [authGuard]},
    {path: 'attendance/:id', component: Attendance, canActivate: [authGuard]},
    {path: 'billing', component: Billing, canActivate: [authGuard]},
    {path: 'billing/:id', component: Billing, canActivate: [authGuard]},
    {path: 'logout', redirectTo: 'login' },
    {path: '**', redirectTo: 'login' },
];