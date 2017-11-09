import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatProgressBarModule, MatDialogModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WordService } from './service/word.service';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlipCardComponent } from './component/learn-type/flip-card/flip-card.component';
import { LearningComponent, ConfirmDialogComponent } from './component/learning/learning.component';
import * as Hammer from 'hammerjs';
import 'hammer-timejs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { WordDirective } from './component/learn-type/word.directive';
import { TypeCardComponent } from './component/learn-type/type-card/type-card.component';
import { AudioService } from './service/audio.service';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    FlipCardComponent,
    LearningComponent,
    MainMenuComponent,
    LoginComponent,
    HomeComponent,
    WordDirective,
    TypeCardComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    WordService,
    AuthGuardService,
    AuthService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
    AudioService
  ],
  bootstrap: [AppComponent],
  entryComponents: [FlipCardComponent, TypeCardComponent, ConfirmDialogComponent]
})
export class AppModule { }
