import { Routes } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { HomepageComponent } from './homepage/homepage.component';
export const HomeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: ':id',
        component: BlogDetailsComponent,
      },
    ]
  }
];
