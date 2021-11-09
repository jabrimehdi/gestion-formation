import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormateurService } from '../../../../formation/Serivces/formateur.service';
import { HttpFormationService } from '../../../../formation/Serivces/http-formation.service';
import { HttpParticipantService } from '../../../../formation/Serivces/http-participant.service';
import { HttpUserService } from '../../../../formation/Serivces/http-user.service';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;
  @Input() participant?: any
  @Input() formateur?: any
  @Input() event: any;
  @Input() formation?: any

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private httpParticipantService: HttpParticipantService,
    private httpFormateurService: FormateurService, private httpFormationService: HttpFormationService) {
    }

  delete(){
    if(this.participant)
      this.httpParticipantService.DeleteParticipant(this.participant.id).subscribe(data => {
      });
    if(this.formateur)
      this.httpFormateurService.DeleteFormateur(this.formateur.id).subscribe(data => {
      });
    if(this.formation)
      this.httpFormationService.DeleteFormation(this.formation.id).subscribe(data => {
      });  
    this.ref.close();
    this.event.confirm.resolve();
  }
  
  dismiss() {
    this.ref.close();
    this.event.confirm.reject();
  }
}
