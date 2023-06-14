import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MainPageComponent } from './main-page/main-page.component';
import { ProblemPageComponent } from './problem-page/problem-page.component';
import { PointsPageComponent } from './points-page/points-page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CommonModule } from '@angular/common';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ProductItemComponent } from './product-item/product-item.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import * as THREE from "three"
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import { GamePageComponent } from './game-page/game-page.component';
import * as io from 'socket.io-client';
import { ChooseRoleComponent } from './choose-role/choose-role.component';
import { ElseGamePageComponent } from './else-game-page/else-game-page.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main',component:MainPageComponent},
  { path: 'points',component:PointsPageComponent},
  { path: 'problem',component:ProblemPageComponent},
  { path: 'admin',component:AdminPageComponent},
  {path:'game',component:GamePageComponent},
  {path:'role',component:ChooseRoleComponent},
  {path:'elseGame',component:ElseGamePageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    ProblemPageComponent,
    PointsPageComponent,
    PageHeaderComponent,
    ProductItemComponent,
    AdminPageComponent,
    GamePageComponent,
    ChooseRoleComponent,
    ElseGamePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent,AdminPageComponent]
})
export class AppModule { }
