import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpParticipantService } from '../../formation/Serivces/http-participant.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

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
  constructor(private httpParticipantService: HttpParticipantService,private router: Router, 
    private dialogService: NbDialogService) {
    this.source = new LocalDataSource(this.participants);
  }

  ngOnInit(): void {
    this.httpParticipantService.getPays().subscribe(data => this.pays = data);
    this.httpParticipantService.getProfils().subscribe(data => this.profils = data);
    this.httpParticipantService.getParticipants().subscribe(data => this.handleSuccessfulResponse(data));
  }

  handleSuccessfulResponse(response) {
    this.participants = response;
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

}
