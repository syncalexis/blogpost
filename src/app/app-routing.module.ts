import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authguard/auth.guard';
import { FullComponent } from './layout/full/full.component';
import { HomepageComponent } from './pages/homepage/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';

export const AppRoutes: Routes =  [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
    {
      path: '',
      component: FullComponent,
      children: [
          {
            path: 'home',canActivate: [AuthGuard],
            loadChildren: () => import('../app/pages/homepage/homepage.module').then(m => m.HomeModule),
          },
       
  
  ]}
];


  