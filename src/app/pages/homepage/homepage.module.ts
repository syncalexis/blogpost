import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeRoutes } from './homepage.routing';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HomeRoutes),
        FormsModule,
        NgxSkeletonLoaderModule
    ],
    declarations: [
        HomepageComponent,
        BlogDetailsComponent,

    ]
})

export class HomeModule {}
