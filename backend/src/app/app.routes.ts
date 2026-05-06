import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { TaskList } from './pages/task-list/task-list';
import { CreateOrEditTask } from './pages/create-or-edit-task/create-or-edit-task';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'tasks', component: TaskList, canActivate: [authGuard] },
  { path: 'create-or-edit', component: CreateOrEditTask, canActivate: [authGuard] },
  { path: 'create-or-edit/:id', component: CreateOrEditTask, canActivate: [authGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];
