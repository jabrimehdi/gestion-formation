import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FormateurService } from '../../formation/Serivces/formateur.service';
import { HttpParticipantService } from '../../formation/Serivces/http-participant.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.scss']
})
export class FormateurComponent implements OnInit {

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
        editable: false,
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
          list: [{title:"INTERNE", value:"INTERNE"},{title:"EXTERNE", value:"EXTERNE"}]
        },
        },
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
    },
  };

  formateurs: any[];
  source: LocalDataSource;
  organismes: any[];
  constructor(private httpFormateurService: FormateurService,private router: Router, 
    private dialogService: NbDialogService) {
    this.source = new LocalDataSource(this.formateurs);
  }

  ngOnInit(): void {
    this.httpFormateurService.getOrganismes().subscribe(data => this.organismes = data);
    this.httpFormateurService.getFormateurs().subscribe(data => this.handleSuccessfulResponse(data));
  }

  handleSuccessfulResponse(response) {
    this.formateurs = response;
    this.source.load(this.formateurs);
    this.settings.columns.organisme.editor.config.list = this.organismes.map(p => {
      return {'value':p.libelle, 'title': p.libelle}
    });
    this.settings = Object.assign({}, this.settings);
  }

  editHandler(ev: MouseEvent){
    console.log(ev.target)
  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete Formateur Confirmation",
        formateur: event.data,
        event: event
      },
      closeOnBackdropClick: false
    });
  }

  addUser(event): void{
    var formateur = {
      "nom": event.newData.nom,
      "prenom": event.newData.prenom,
      "email": event.newData.email,
      "tel": event.newData.tel,
      "type": event.newData.type,
      "organisme": event.newData.organisme,
    };
    formateur.organisme = this.organismes.filter(p => p.libelle === formateur.organisme)[0];
    this.httpFormateurService.addFormateur(formateur).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.organismes.push(data);
      this.ngOnInit();
    },err => {
      console.log("errreurrr");
    })
  }

  editUser(event):void{
    var formateur = {
      "id": event.newData.id,
      "nom": event.newData.nom,
      "prenom": event.newData.prenom,
      "email": event.newData.email,
      "tel": event.newData.tel,
      "type": event.newData.type,
      "organisme": event.newData.organisme,
    };
    formateur.organisme = this.organismes.filter(p => p.libelle === formateur.organisme)[0];
    this.httpFormateurService.UpdateFormateur(formateur).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.organismes.push(data);
      this.ngOnInit();
    }, err => {
      console.log("errrrreeeurr");
    })
  }

}
