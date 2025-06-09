import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { EducationComponent } from './components/education/education.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectComponent } from './components/project/project.component';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [authGuard], // Add your auth guard here if needed
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'education',
        component: EducationComponent
      },
      {
        path: 'projects',
        component: ProjectComponent
      }
    ]
  }
];
