import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpOrganismeService } from '../../formation/Serivces/http-organisme.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.scss']
})
export class OrganismeComponent implements OnInit {

  

  
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
        editable:false
        
      },
      libelle: {
        title: 'Libelle',
        type: 'string',
      },
      
    },
  };

    
  organismes:any;
  source: LocalDataSource;
  constructor(private httpOrganismetService: HttpOrganismeService,private router: Router, private dialogService: NbDialogService, 
    private toast: NbToastrService) {
    this.source = new LocalDataSource(this.organismes);
  }

  handleSuccessfulResponse(response) {
    this.organismes = response;
    this.source.load(response);
    console.log(this.organismes);

  }

  editOrganisme(event):void{
    if(!event.newData.libelle){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    var organisme = {
      "id":event.newData.id,
      "libelle" : event.newData.libelle,
    };
    this.httpOrganismetService.UpdateOrganisme(organisme).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.organismes.push(data);
      this.ngOnInit();


  });
}
}

  addOrganisme(event): void{

    if(!event.newData.libelle){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    var organisme = {
      "id":event.newData.id,
      "libelle" : event.newData.libelle,
    };


       
this.httpOrganismetService.addOrganisme(organisme).subscribe(data => {
  console.log(data);
  event.confirm.resolve(event.newData);
  this.organismes.push(data);
  
  this.ngOnInit();
  
});
}

  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete Organisme Confirmation",
        organisme: event.data,
        event: event
      },
      closeOnBackdropClick: false
    }); 
  }
  

  ngOnInit(): void {
    
    this.httpOrganismetService
    .getOrganismes()
    .subscribe(response => this.handleSuccessfulResponse(response));
    
  
  }
}
