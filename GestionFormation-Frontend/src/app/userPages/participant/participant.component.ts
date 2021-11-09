import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbGetters, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpParticipantService } from '../../formation/Serivces/http-participant.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';


interface FSEntry {
  name: string;
  kind: string;
  items?: string;
  childEntries?: FSEntry[];
  expanded?: boolean;
}

@Component({
  selector: 'ngx-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

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
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    
    columns: {
      id: {
        title: 'code',
        type: 'number',
        addable: false,
        editable:false
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
      },
      tel: {
        title: 'Tel',
        type: 'number',
      },
      type: {
        title: 'Type',
        editor:{
        type:'list',
        config: {
          selectText: 'Select',
          list: [{title:"INTERNATIONAL", value:"INTERNATIONAL"},{title:"NATIONAL", value:"NATIONAL"}]
        },
        },
      },
      pays: {
        title: 'Pays',
        editor:{
        type:'list',
        config: {
          selectText: 'Select',
          list: []
        },
        },
        valuePrepareFunction: (pays) => {
          return pays.nom;
          
        },
        filterFunction(pays?: any, search?: string): boolean {
          let match = true;
          Object.keys(pays).map(u => pays.nom).filter(it => {
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
      profil: {
        title: 'Profil',
        editor:{
        type:'list',
        config: {
          selectText: 'Select',
          list: []
        },
        },
        valuePrepareFunction: (profil) => {
          return profil.libelle;
          
        },
        filterFunction(profil?: any, search?: string): boolean {
          let match = true;
          Object.keys(profil).map(u => profil.libelle).filter(it => {
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
    },
  };

  participants: any[];
  source: LocalDataSource;
  pays: any[];
  profils: any[];
  selectedParticipant: any;
  showSessions: boolean;

  customColumn = 'name';
  defaultColumns = ['items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  partSessions: NbTreeGridDataSource<FSEntry>;
  sessions: FSEntry[] = [];
  session:any;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  
  constructor(private httpParticipantService: HttpParticipantService,private router: Router, 
    private dialogService: NbDialogService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.source = new LocalDataSource(this.participants);
  }

  ngOnInit(): void {
    this.httpParticipantService.getPays().subscribe(data => this.pays = data);
    this.httpParticipantService.getProfils().subscribe(data => this.profils = data);
    this.httpParticipantService.getParticipants().subscribe(data => this.handleSuccessfulResponse(data));
  }

  handleSuccessfulResponse(response) {
    this.participants = response;
    console.log(this.participants)
    this.source.load(this.participants);
    this.settings.columns.pays.editor.config.list = this.pays.map(p => {
      return {'value':p.nom, 'title': p.nom}
    });
    this.settings.columns.profil.editor.config.list = this.profils.map(p => {
      return {'value':p.libelle, 'title': p.libelle}
    });
    this.settings = Object.assign({}, this.settings);
  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete Participant Confirmation",
        participant: event.data,
        event: event
      },
      closeOnBackdropClick: false
    });
  }

  addUser(event): void{
    var participant = {
      "nom": event.newData.nom,
      "prenom": event.newData.prenom,
      "email": event.newData.email,
      "tel": event.newData.tel,
      "type": event.newData.type,
      "pays": event.newData.pays,
      "profil": event.newData.profil,
    };
    participant.pays = this.pays.filter(p => p.nom === participant.pays)[0];
    participant.profil = this.profils.filter(p => p.libelle === participant.profil)[0];
    this.httpParticipantService.addParticipant(participant).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.participants.push(data);
      this.ngOnInit();
    },err => {
      console.log("errreurrr");
    })
  }

  editUser(event):void{
    var participant = {
      "id": event.newData.id,
      "nom": event.newData.nom,
      "prenom": event.newData.prenom,
      "email": event.newData.email,
      "tel": event.newData.tel,
      "type": event.newData.type,
      "pays": event.newData.pays,
      "profil": event.newData.profil,
    };
    participant.pays = this.pays.filter(p => p.nom === participant.pays)[0];
    participant.profil = this.profils.filter(p => p.libelle === participant.profil)[0];
    this.httpParticipantService.UpdateParticipant(participant).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.participants.push(data);
      this.ngOnInit();
    }, err => {
      console.log("errrrreeeurr");
    })
  }

  loadSessions(){
    this.sessions = []
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    if(this.participants.length > 0){
    this.httpParticipantService.getSessionsByParticipantId(this.selectedParticipant.id).subscribe(data => {
      data.forEach((elem) => {
        var parts = elem.participants.map((p) => {
          return {name:"Nom & Prénom", kind:'doc', items:p.nom+" "+p.prenom}
        })
        var formats = elem.formations.map((f) => {
          return "Formation: "+f.id+": "+f.titre;
        })[0];
        this.session = { name:elem.lieu, kind:'dir', items:formats,
        childEntries: [
          {name:"Date-Début", kind:'doc', items:elem.date_debut},
          {name:"Date-Fin", kind:'doc', items:elem.date_fin},
          {name:"Nombre participants Maximale", kind:'doc', items:elem.nb_participant},
          {name:"Formateur", kind:'dir',
          childEntries:[
            {name:"Nom & Prénom", kind:'doc', items:elem.formateur.nom+" "+elem.formateur.prenom},
            {name:"Email", kind:'doc', items:elem.formateur.email},
          ]
          },
          {name:"Organisme", kind:'doc', items:elem.organisme.libelle},
          {name:"Participants", kind:'dir',
          childEntries:parts
          },
        ]
        }
        this.sessions.push(this.session);
        })
        this.partSessions = this.dataSourceBuilder.create(this.sessions, getters);
      })
    }
  }

  onCustomAction(event): void {
    this.selectedParticipant = event.data;
    this.loadSessions();
    this.showSessions = true;
  }

  hide(){
    this.showSessions = false;
  }

  
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
