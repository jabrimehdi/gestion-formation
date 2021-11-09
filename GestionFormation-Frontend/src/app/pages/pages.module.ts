import { NgModule } from '@angular/core';
import { NbCardModule, NbDialogModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { FormsModule } from '@angular/forms';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrganismeComponent } from './organisme/organisme.component';
import { ProfileComponent } from './profile/profile.component';
import { DomaineComponent } from './domaine/domaine.component';
import { PaysComponent } from './pays/pays.component';

@NgModule({
  imports: [
    NbCardModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot(),
  ],
  declarations: [
    PagesComponent,
    UtilisateurComponent,
    OrganismeComponent,
    ProfileComponent,
    DomaineComponent,
    PaysComponent,
    
  ],
})
export class PagesModule {
}
