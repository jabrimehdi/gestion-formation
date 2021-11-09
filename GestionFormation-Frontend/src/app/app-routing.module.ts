import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './formation/login/login.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'userPages',
    loadChildren: () => import('./userPages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'directeurPages',
    loadChildren: () => import('./directeurPages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component:NbAuthComponent,
    children:[
      {
      path:'login',
      component:LoginComponent},

      {
        path:'',
        component:LoginComponent},
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
