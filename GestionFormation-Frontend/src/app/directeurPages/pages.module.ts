import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCalendarKitModule, NbCardModule,   NbDatepickerModule,   NbDialogModule, NbInputModule, NbMenuModule, NbSelectModule, NbStepperModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ParticipantComponent } from './participant/participant.component';
import { FormateurComponent } from './formateur/formateur.component';
import { ShowcaseDialogComponent } from './modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { ModalOverlaysModule } from './modal-overlays/modal-overlays.module';
import { FormationComponent } from './formation/formation.component';
import { ListFormationsComponent } from './list-formations/list-formations.component';
import { DashComponent } from './dash/dash.component';
import {ChartsModule} from './charts/charts.module'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot(),
    NbStepperModule,
    NbInputModule,
    NbButtonModule,
    NbCalendarKitModule,
    NbDatepickerModule,
    NbSelectModule,
    NbTabsetModule,
    ChartsModule,
    NgxChartsModule,
    ChartModule,
    NgxEchartsModule,
    
    
  ],
  declarations: [
    PagesComponent,
    ParticipantComponent,
    FormateurComponent,
    FormationComponent,
    ListFormationsComponent,
    DashComponent,
  ],
})
export class PagesModule {
}
