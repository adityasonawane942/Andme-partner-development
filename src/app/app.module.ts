import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './landing/home/home.component';
import { LoginComponent } from './landing/login/login.component';
import { ApplyComponent } from './landing/apply/apply.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdatesComponent } from './user/updates/updates.component';
import { StoreComponent } from './user/store/store.component';
import { PerformanceComponent } from './user/performance/performance.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApplyformComponent } from './landing/applyform/applyform.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    ApplyComponent,
    ProfileComponent,
    UpdatesComponent,
    StoreComponent,
    PerformanceComponent,
    ApplyformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:LandingComponent,
        children: [
          {path:'home',component:HomeComponent},
          {path:'login',component:LoginComponent},
          {path:'apply',component:ApplyComponent},
          {path:'form',component:ApplyformComponent},
        ]},
      {path:'user',component:UserComponent,
        children: [
          {path:'profile',component:ProfileComponent},
          {path:'updates',component:UpdatesComponent},
          {path:'store',component:StoreComponent},
          {path:'performance',component:PerformanceComponent},
        ]},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
