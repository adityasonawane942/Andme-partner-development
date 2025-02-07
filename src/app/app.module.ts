import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './landing/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UpdatesComponent } from './user/updates/updates.component';
import { StoreComponent } from './user/store/store.component';
import { PerformanceComponent } from './user/performance/performance.component';

import { ChartsModule } from 'ng2-charts'

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApplyformComponent } from './landing/applyform/applyform.component';
import { DataService } from './data.service';
import { ResourcesComponent } from './user/resources/resources.component';
import { AboutComponent } from './landing/about/about.component';
import { AdminportalComponent } from './adminportal/adminportal.component';
import { ListComponent } from './adminportal/list/list.component';
import { DetailComponent } from './adminportal/detail/detail.component';
import { ProductlistPipe } from './user/store/productlist.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UserComponent,
    HomeComponent,
    ProfileComponent,
    UpdatesComponent,
    StoreComponent,
    PerformanceComponent,
    ApplyformComponent,
    ResourcesComponent,
    AboutComponent,
    AdminportalComponent,
    ListComponent,
    DetailComponent,
    ProductlistPipe
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:LandingComponent,
        children: [
          {path:'home',component:HomeComponent},
          {path:'about',component:AboutComponent},
          {path:'form',component:ApplyformComponent},
        ]},
      {path:'user',component:UserComponent,
        children: [
          {path:'profile',component:ProfileComponent},
          {path:'updates',component:UpdatesComponent},
          {path:'resources',component:ResourcesComponent},
          {path:'store',component:StoreComponent},
          {path:'performance',component:PerformanceComponent},
        ]},
        {path:'admin-panel', component:AdminportalComponent, children: [
          {path:'list', component:ListComponent},
          {path:'detail/:type/:email', component:DetailComponent},
        ]},
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
