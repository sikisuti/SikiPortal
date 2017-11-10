import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

import { HomeComponent } from './component/home/home.component';
import { LearningComponent } from './component/learning/learning.component';
import { LoginComponent } from './component/login/login.component';
import { NewWordComponent } from './component/new-word/new-word.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'learn', component: LearningComponent },
    { path: 'login', component: LoginComponent },
    { path: 'new', component: NewWordComponent, canActivate: [AuthGuardService] },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**',   redirectTo: '/home', pathMatch: 'full' }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}
