import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpDomaineService } from '../../formation/Serivces/http-domaine.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.scss']
})
export class DomaineComponent implements OnInit {

  

  
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
        title: 'ID',
        type: 'number',
        addable: false,
        editable: false
      },
      libelle: {
        title: 'Libelle',
        type: 'string',
      },
      
    },
  };

    
  domaines:any;
  source: LocalDataSource;
  constructor(private httpOrganismetService: HttpDomaineService,private router: Router, private dialogService: NbDialogService,
    private toast: NbToastrService) {
    this.source = new LocalDataSource(this.domaines);
  }

  handleSuccessfulResponse(response) {
    this.domaines = response;
    this.source.load(response);
    console.log(this.domaines);

  }

  editDomaine(event):void{
    if(!event.newData.libelle){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    var domaine = {
      "id":event.newData.id,
      "libelle" : event.newData.libelle,
    };
    this.httpOrganismetService.UpdateDomaine(domaine).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.domaines.push(data);
      this.ngOnInit();


  });
}
}

  addDomaine(event): void{

    if(!event.newData.libelle){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    console.log(event.newData)
    var domaine = {
      "id":event.newData.id,
      "libelle" : event.newData.libelle,
    };


       
this.httpOrganismetService.addDomaine(domaine).subscribe(data => {
  console.log(data);
  event.confirm.resolve(event.newData);
  this.domaines.push(data);
  
  this.ngOnInit();
  
});
}
  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete Domaine Confirmation",
        domaine: event.data,
        event: event
      },
      closeOnBackdropClick: false
    }); 
  }
  

  ngOnInit(): void {
    
    this.httpOrganismetService
    .getDomaines()
    .subscribe(response => this.handleSuccessfulResponse(response));
    
  
  }
}
