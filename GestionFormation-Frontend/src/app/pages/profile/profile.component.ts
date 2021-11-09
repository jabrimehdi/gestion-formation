import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpProfileService } from '../../formation/Serivces/http-profile.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  
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

    
  profils:any;
  source: LocalDataSource;
  constructor(private httpOrganismetService: HttpProfileService,private router: Router, private dialogService: NbDialogService, 
    private toast: NbToastrService) {
    this.source = new LocalDataSource(this.profils);
  }

  handleSuccessfulResponse(response) {
    this.profils = response;
    this.source.load(response);
    console.log(this.profils);

  }

  editProfile(event):void{
    if(!event.newData.libelle){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    var profile = {
      "id":event.newData.id,
      "libelle" : event.newData.libelle,
    };
    this.httpOrganismetService.UpdateProfil(profile).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.profils.push(data);
      this.ngOnInit();


  });
}
}

  addProfile(event): void{

    if(!event.newData.libelle){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else{
    var profile = {
      "id":event.newData.id,
      "libelle" : event.newData.libelle,
    };


       
this.httpOrganismetService.addProfil(profile).subscribe(data => {
  console.log(data);
  event.confirm.resolve(event.newData);
  this.profils.push(data);
  
  this.ngOnInit();
  
});}

  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete Profile Confirmation",
        profile: event.data,
        event: event
      },
      closeOnBackdropClick: false
    }); 
  }
  

  ngOnInit(): void {
    
    this.httpOrganismetService
    .getProfils()
    .subscribe(response => this.handleSuccessfulResponse(response));
    
  
  }

}
