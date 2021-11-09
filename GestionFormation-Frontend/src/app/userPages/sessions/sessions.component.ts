import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbCalendarYearCellComponent, NbDateService, NbDialogService, NbGetters, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowRef, NbWindowService } from '@nebular/theme';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';
import { FormateurService } from '../../formation/Serivces/formateur.service';
import { HttpFormationService } from '../../formation/Serivces/http-formation.service';
import { HttpOrganismeService } from '../../formation/Serivces/http-organisme.service';
import { HttpParticipantService } from '../../formation/Serivces/http-participant.service';
import { HttpSessionService } from '../../formation/Serivces/http-session.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';



@Component({
  selector: 'ngx-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit{

  settings = {
    mode:'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
    }, 
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave : true,

    },
    
    actions:{
      delete: false,
    },
    columns: {
      id: {
        title: 'code',
        type: 'number',
        addable: false,
        editable: false,
      },
      date_debut: {
        title: 'Date Début',
        type: 'text',
        editor: {
          type: 'custom',
          component: CustomDateComponent,
        },
      },
      date_fin: {
        title: 'Date Fin',
        type: 'text',
        editor: {
          type: 'custom',
          component: CustomDateComponent,
        },
      },
      lieu: {
        title: 'Lieu',
        type: 'String',
      },
      nb_participant: {
        title: 'Nombre Participants',
        type: 'number',
      },
      formateur: {
        title: 'Formateur',
        editor:{
        type:'list',
        config: {
          selectText: 'Select',
          list: []
        },
        },
        valuePrepareFunction: (formateur) => {
          return formateur.nom;
          
        },
        filterFunction(formateur?: any, search?: string): boolean {
          let match = true;
          Object.keys(formateur).map(u => formateur.nom).filter(it => {
            match = it.toLowerCase().includes(search);
          });

          if (match || search === '') {
            return true;
          } else {
            return false
          }
        },
        filter: true,
        compareFunction: (direction: any, a: any, b: any) => {
          let first = typeof a.nom === 'string' ? a.nom.toLowerCase(): a.nom;
          let second = typeof b.nom === 'string' ? b.nom.toLowerCase(): b.nom;

          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        }
      },
      organisme: {
        title: 'Organisme',
        editor:{
        type:'list',
        config: {
          selectText: 'Select',
          list: []
        },
        },
        valuePrepareFunction: (organisme) => {
          return organisme.libelle;
          
        },
        filterFunction(organisme?: any, search?: string): boolean {
          let match = true;
          Object.keys(organisme).map(u => organisme.libelle).filter(it => {
            match = it.toLowerCase().includes(search);
          });

          if (match || search === '') {
            return true;
          } else {
            return false
          }
        },
        filter: true,
        compareFunction: (direction: any, a: any, b: any) => {
          let first = typeof a.nom === 'string' ? a.nom.toLowerCase(): a.nom;
          let second = typeof b.nom === 'string' ? b.nom.toLowerCase(): b.nom;

          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        }
      },
      formations: {
        title: 'Formation',
        addable: false,
        editable: false,
        editor:{
          type:'text',
        },
        filter: false,
        valuePrepareFunction: (formations) => {
          return formations[0].titre;
        },
      },
    },
  };

  sessions: any[];
  source: LocalDataSource;
  formateurs: any[];
  organismes: any[];
  participants: any[] = [];
  allParticipants: any[] = [];
  selectedFormation: any;
  selectedSess: any = {};
  selectedParticipants: any[] = [];
  showParticipants: boolean;
  windRef: NbWindowRef;

  @ViewChild('listParts') listParticipants: TemplateRef<any>;

  constructor(private httpSessionService: HttpSessionService, private dialogService: NbDialogService,
    private httpFormateurService: FormateurService, private httpOrganismeService: HttpOrganismeService,
    private httpFormationService: HttpFormationService, private windowService: NbWindowService,
    private httpParticipantService: HttpParticipantService, private datePipe: DatePipe) {
    this.source = new LocalDataSource(this.sessions);
  }


  ngOnInit(): void {
    this.httpOrganismeService.getOrganismes().subscribe(data => this.organismes = data);
    this.httpFormateurService.getFormateurs().subscribe(data => this.formateurs = data);
    this.fetchParticipants()
    this.httpSessionService.getSession().subscribe(data => this.handleSuccessfulResponse(data))
    this.selectedFormation = this.httpFormationService._selectedFormation;
  }

  handleSuccessfulResponse(response) {
    this.sessions = response;
    this.sessions = this.sessions.filter(ss => ss.formations[0].id == this.selectedFormation.id);
    this.sessions.forEach(x => {
      x.date_debut = this.datePipe.transform(x.date_debut,"yyyy-MM-dd")
      x.date_fin = this.datePipe.transform(x.date_fin,"yyyy-MM-dd")
    })
    this.source.load(this.sessions);
    this.settings.columns.formateur.editor.config.list = this.formateurs.map(d => {
      return {'value':d.nom, 'title': d.nom}
    });
    this.settings.columns.organisme.editor.config.list = this.organismes.map(d => {
      return {'value':d.libelle, 'title': d.libelle}
    });
    this.settings = Object.assign({}, this.settings);
  }

  fetchParticipants(){
    this.httpParticipantService.getParticipants().subscribe(data => this.allParticipants = data);
  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete Session Confirmation",
        formation: event.data,
        event: event
      },
      closeOnBackdropClick: false
    });
  }

  addSessionToFormation(event): void{
    console.log(event.newData);
    var sess = {
      "date_debut":event.newData.date_debut,
      "date_fin":event.newData.date_fin,
      "lieu":event.newData.lieu,
      "nb_participant":event.newData.nb_participant,
      "organisme":event.newData.organisme,
      "formateur":event.newData.formateur,
      "formations": [], 
    }
    sess.organisme = this.organismes.filter(d => d.libelle === sess.organisme)[0];
    sess.formateur = this.formateurs.filter(d => d.nom ===  sess.formateur)[0];
    var formation = {"id": this.selectedFormation.id};
    sess.formations.push(formation);
    this.httpSessionService.addSession(sess).subscribe(data => {
      console.log(data);
      event.confirm.resolve(event.newData);
      this.sessions.push(data);
      this.ngOnInit();
    },err => {
      console.log("errrreeuur");
    })
  }

  editSession(event):void{
    /*var formation = {
      "id": event.newData.id,
      "titre": event.newData.titre,
      "annee": event.newData.annee,
      "duree": event.newData.duree,
      "budget": event.newData.budget,
      "nb_session": event.newData.nb_session,
      "type": event.newData.type,
      "domaine": event.newData.domaine
    };
    formation.domaine = this.domains.filter(d => d.libelle === formation.domaine)[0];
    this.httpFormationService.UpdateFormation(formation).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.formations.push(data);
      this.ngOnInit();
    }, err => {
      console.log("errrrreeeurr");
    })*/
  }

  syncParts(){
    var deleteParts: any[] = [];
    this.fetchParticipants()
    this.participants = this.selectedSess.participants;
    if(this.participants.length < 1){
      return;
    }
    else if(this.participants.length == this.allParticipants.length)
      this.allParticipants = [];
    else{
    this.allParticipants.forEach((p,i) => {
      var part = this.participants.filter(pp => pp.id == p.id)[0]
      if(part){
        deleteParts.push(part);
      }
    })
    deleteParts.forEach(d => {
      this.allParticipants = this.allParticipants.filter(p => p.id !== d.id)
    })
    console.log("mod allparts")
    console.log(this.allParticipants)
  }
  }

  onUserRowSelect(event): void{
    this.selectedSess = event.data;
    this.syncParts()
    this.showParticipants = true;
  }

  addParticipant(){
    this.syncParts()
    this.windRef = this.windowService.open(this.listParticipants,{
      title: 'Liste des Participants',
      context: {allParts: this.allParticipants}
    })
  }

  joinSessionParticipant(event, parts){
    this.selectedParticipants.push(parts);
  }

  addToSession(event: MouseEvent){
    event.preventDefault();
    this.selectedParticipants.forEach(p => {
      this.selectedSess.participants.push(p);
    })
    this.httpSessionService.UpdateSession(this.selectedSess).subscribe(data => {
      console.log(data.participants.length);
      this.windRef.close();
      this.selectedParticipants = []
      this.syncParts()
    }, err => {
      console.log("errrrrrrrrrrreuur")
    })
  }

  checkList(){
    return this.allParticipants.length < 1
  }

}

@Component({
  template: `
  <div *ngIf="cell.getTitle() === 'Date Début'; else elseBlock">
    <input  [placeholder]="cell.getTitle()"
                        class="form-control"
                        [name]="cell.getTitle()"
                        required
                        [nbDatepicker]="picker1"
                        (ngModel)="sessionFormation.dateDeb"
                        (ngModelChange)="dataChanged($event)">
                        <nb-datepicker #picker1 [min]="min" [max]="max"></nb-datepicker>
   </div>
   <ng-template #elseBlock>
   <input  [placeholder]="cell.getTitle()"
         class="form-control"
        [name]="cell.getTitle()"
        required
          [nbDatepicker]="picker2"
          (ngModel)="sessionFormation.dateFin"
          (ngModelChange)="dataChanged($event)">
          <nb-datepicker #picker2 [min]="min" [max]="max"></nb-datepicker>
   </ng-template>
  `,
})
export class CustomDateComponent extends DefaultEditor implements AfterViewInit {
  
  min: Date;
  max: Date;
  yearCellComponent = NbCalendarYearCellComponent
  
  constructor(protected dateService: NbDateService<Date>) {
    super();
    this.min = this.dateService.addYear(this.dateService.today(), 0)
    this.max = this.dateService.addYear(this.dateService.today(), 2)
  }

  ngAfterViewInit(): void {
  }

  dataChanged(event){
    this.cell.setValue(event)
  }

}
