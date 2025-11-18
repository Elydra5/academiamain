import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Forgotpasswd } from './forgotpasswd/forgotpasswd';
import { Students } from './students/students';
import { Groups } from './groups/groups';
import { Users } from './users/users';
import { Attendance } from './attendance/attendance';
import { Billing } from './billing/billing';
import { Dashboard } from './dashboard/dashboard';
import { Calendar } from './calendar/calendar';
import { Group } from './group/group';
import { Student } from './student/student';
import { User } from './user/user';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: Login},
    {path: 'forgot-password', component: Forgotpasswd},
    {path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    {path: 'calendar', component: Calendar, canActivate: [authGuard]},
    {path: 'students', component: Students, canActivate: [authGuard]},
    {path: 'student/:id', component: Student, canActivate: [authGuard]},
    {path: 'groups', component: Groups, canActivate: [authGuard]},
    {path: 'groups/:id', component: Group, canActivate: [authGuard]},
    {path: 'users', component: Users, canActivate: [authGuard]},
    {path: 'user/:username', component: User, canActivate: [authGuard]},
    {path: 'attendance', component: Attendance, canActivate: [authGuard]},
    {path: 'attendance/:id', component: Attendance, canActivate: [authGuard]},
    {path: 'billing', component: Billing, canActivate: [authGuard]},
    {path: 'billing/:id', component: Billing, canActivate: [authGuard]},
    {path: 'logout', redirectTo: 'login' },
    {path: '**', redirectTo: 'login' },
];