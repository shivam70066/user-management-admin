import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditTemplateComponent } from './components/settings/edit-template/edit-template.component';
import { authGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';
import { EditDetailsComponent } from './components/settings/edit-details/edit-details.component';
import { EditBasicSettingsComponent } from './components/settings/edit-basic-settings/edit-basic-settings.component';
// import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',title:"Login", component:LoginComponent},
  {path:'users',title:"List Users", component:ListUsersComponent,canActivate:[authGuard]},
  // {path:'user/:id',component:UserDetailsComponent}
  {path:'users',children:[
    {path:'user/:id',title:"User Details", component: UserDetailsComponent},
    {path:'edit/:id', component: EditUserComponent},
    {path:'update/:id', component: UpdateUserComponent},
    {path:'add-user', component: AddUserComponent},
  ],canActivate:[authGuard]},

  {path:'settings', component:SettingsComponent,canActivate:[authGuard]},
  {path:'settings', children:[
    {path:'email-template/:slug', component: EditTemplateComponent},
    {path:'change-password', component: ChangePasswordComponent},
    {path:'update-details', component: EditDetailsComponent},
    {path:'basic-settings', component: EditBasicSettingsComponent},


  ],canActivate:[authGuard]},

  { path: '**','title':"Coming Soon", component: ComingSoonComponent ,canActivate:[authGuard]},

];
