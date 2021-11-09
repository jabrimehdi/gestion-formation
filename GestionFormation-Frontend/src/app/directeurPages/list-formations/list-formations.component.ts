import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpDomaineService } from '../../formation/Serivces/http-domaine.service';
import { HttpFormationService } from '../../formation/Serivces/http-formation.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-list-formations',
  templateUrl: './list-formations.component.html',
  styleUrls: ['./list-formations.component.scss']
})
export class ListFormationsComponent implements OnInit {

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
    actions:{
      custom: [{ name: 'Associer', title: '<i class="nb-shuffle"></i>' }],
    },
    columns: {
      id: {
        title: 'code',
        type: 'number',
        addable: false,
        editable: false,
      },
      titre: {
        title: 'Titre',
        type: 'string',
      },
      annee: {
        title: 'Année',
        type: 'number',
      },
      budget: {
        title: 'Budget',
        type: 'number',
      },
      duree: {
        title: 'Durée',
        type: 'number',
      },
      nb_session: {
        title: 'Nombre Sessions',
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
      domaine: {
        title: 'Domaine',
        editor:{
        type:'list',
        config: {
          selectText: 'Select',
          list: []
        },
        },
        valuePrepareFunction: (domaine) => {
          return domaine.libelle;
          
        },
        filterFunction(domaine?: any, search?: string): boolean {
          let match = true;
          Object.keys(domaine).map(u => domaine.libelle).filter(it => {
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

  formations: any[];
  source: LocalDataSource;
  domains: any[];

  constructor(private httpFormationService: HttpFormationService, private httpDomaineService: HttpDomaineService, 
    private dialogService: NbDialogService, private router: Router) {
    this.source = new LocalDataSource(this.formations);
   }

  ngOnInit(): void {
    this.httpDomaineService.getDomaines().subscribe(data => this.domains = data);
    this.httpFormationService.getFormations().subscribe(data => this.handleSuccessfulResponse(data))
  }

  handleSuccessfulResponse(response) {
    this.formations = response;
    this.source.load(this.formations);
    this.settings.columns.domaine.editor.config.list = this.domains.map(d => {
      return {'value':d.libelle, 'title': d.libelle}
    });
    this.settings = Object.assign({}, this.settings);
  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete Formation Confirmation",
        formation: event.data,
        event: event
      },
      closeOnBackdropClick: false
    });
  }

  addUser(event): void{
    var formation = {
      "titre": event.newData.titre,
      "annee": event.newData.annee,
      "duree": event.newData.duree,
      "budget": event.newData.budget,
      "nb_session": event.newData.nb_session,
      "type": event.newData.type,
      "domaine": event.newData.domaine
    };
    formation.domaine = this.domains.filter(d => d.libelle === formation.domaine)[0];
    this.httpFormationService.addFormation(formation).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.formations.push(data);
      this.ngOnInit();
    },err => {
      console.log("errreurrr");
    })
  }

  editUser(event):void{
    var formation = {
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
    })
  }

  onCustomAction(event): void {
    this.httpFormationService._selectedFormation = event.data;
    this.router.navigate(['userPages/formation'])
  }

}
