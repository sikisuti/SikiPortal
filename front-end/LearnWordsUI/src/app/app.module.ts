import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WordService } from './service/word.service';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlipCardComponent } from './component/flip-card/flip-card.component';
import { LearningComponent } from './component/learning/learning.component';
import 'hammerjs';
import 'hammer-timejs';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FlipCardComponent,
    LearningComponent,
    MainMenuComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [WordService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
