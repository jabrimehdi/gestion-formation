import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpPaysService } from '../../formation/Serivces/http-pays.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit {
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
      nom: {
        title: 'Nom',
        type: 'string',
      },
      
    },
  };

    
  pays:any;
  source: LocalDataSource;
  constructor(private httpOrganismetService: HttpPaysService,private router: Router, private dialogService: NbDialogService,
    private toast: NbToastrService) {
    this.source = new LocalDataSource(this.pays);
  }

  handleSuccessfulResponse(response) {
    this.pays = response;
    this.source.load(response);
    console.log(this.pays);

  }

  editPays(event):void{
    if(!event.newData.nom){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    var pays = {
      "id":event.newData.id,
      "nom" : event.newData.nom,
    };
    this.httpOrganismetService.UpdatePays(pays).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.pays.push(data);
      this.ngOnInit();


  });
}
}

  addPays(event): void{

    if(!event.newData.nom){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    var pays = {
      "id":event.newData.id,
      "nom" : event.newData.nom,
    };


       
this.httpOrganismetService.addPays(pays).subscribe(data => {
  console.log(data);
  event.confirm.resolve(event.newData);
  this.pays.push(data);
  
  this.ngOnInit();
  
});
}
  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete pays Confirmation",
        pays: event.data,
        event: event

      },
      closeOnBackdropClick: false
    }); 
  }
  

  ngOnInit(): void {
    
    this.httpOrganismetService
    .getPays()
    .subscribe(response => this.handleSuccessfulResponse(response));
    
  
  }

}
