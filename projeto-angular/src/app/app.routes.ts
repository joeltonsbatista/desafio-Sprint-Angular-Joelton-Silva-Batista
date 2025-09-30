import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'login'},
    {path:'login', component: LoginComponent},
    {path:'home', component: HomeComponent, canActivate:[authGuard]},
    {path:'dashboard', component: DashboardComponent, canActivate:[authGuard]}
];

