import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpDomaineService } from '../../../../formation/Serivces/http-domaine.service';
import { HttpOrganismeService } from '../../../../formation/Serivces/http-organisme.service';
import { HttpPaysService } from '../../../../formation/Serivces/http-pays.service';
import { HttpProfileService } from '../../../../formation/Serivces/http-profile.service';
import { HttpUserService } from '../../../../formation/Serivces/http-user.service';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;
  @Input() user?: any;
  @Input() event: any;
  @Input() organisme?:any;
  @Input() profile?:any;
  @Input() pays?:any;
  @Input() domaine?:any;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private httpOrganismetService: HttpOrganismeService,private httpUsertService: HttpUserService,
    private httpDomainetService: HttpDomaineService,private httpPaystService: HttpPaysService,private httpProfiletService: HttpProfileService) {}

  delete(){
    if(this.user)
    this.httpUsertService.DeleteUtilisateur(this.user.code).subscribe(data => {
    });
    if(this.organisme)
    this.httpOrganismetService.DeleteOrganisme(this.organisme.id).subscribe(data => {
    });
    if(this.profile)
    this.httpProfiletService.DeleteProfil(this.profile.id).subscribe(data => {
    });
    if(this.domaine)
    this.httpDomainetService.DeleteDomaine(this.domaine.id).subscribe(data => {
    });
    if(this.pays)
    this.httpPaystService.DeletePays(this.pays.id).subscribe(data => {
    });
    this.ref.close();
    this.event.confirm.resolve();
  }
  
  dismiss() {
    this.ref.close();
    this.event.confirm.reject();
  }
}
