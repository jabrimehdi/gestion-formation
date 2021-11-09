import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Role, Utilisateur } from '../../formation/Models/Utilisateur';
import { HttpUserService } from '../../formation/Serivces/http-user.service';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {


  
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
      code: {
        title: 'code',
        type: 'number',
        addable: false,
        editable: false
      },
      login: {
        title: 'Login',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
      },
      role: {
        title: 'Role',
        editor:{
        type:'list',
        config: {
          selectText: 'Select',
          list: []
        },
        },
        valuePrepareFunction: (role) => {
          return role.nom;
          
        },
        filterFunction(role?: any, search?: string): boolean {
          let match = true;
          Object.keys(role).map(u => role.nom).filter(it => {
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

    
  users:Utilisateur[];
  source: LocalDataSource;
  role:Role;
  roles: any[];
  constructor(private httpUsertService: HttpUserService,private router: Router, private dialogService: NbDialogService,
    private toast: NbToastrService) {
    this.source = new LocalDataSource(this.users);
  }

  handleSuccessfulResponse(response) {
    this.users = response;
    this.source.load(response);
    var listRoles: String[];
    console.log(this.roles);
    listRoles = this.roles.map(role => role.nom);
    this.settings.columns.role.editor.config.list = this.roles.map(role => {
      return {'value':role.nom, 'title': role.nom}
    });
    this.settings = Object.assign({}, this.settings);
  }

  editUser(event):void{
    if(!event.newData.login || !event.newData.password){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+([a-zA-Z0-9-]+){2,4}$/.test(event.newData.login))){
      this.toast.danger("Login must be an email form", "Error", {duration: 5000})
      return ;
    }else if(event.newData.password.length < 4){
      this.toast.danger("Password should be 4 characters minimum", "Error", {duration: 5000})
      return ;
    }else{
    var user = {
      "code":event.newData.code,
      "login" : event.newData.login,
    "password" : event.newData.password,
    "role" : event.newData.role
    };
    user.role=this.roles.filter(role => role.nom === user.role)[0];
    this.httpUsertService.UpdateUtilisateur(user).subscribe(data => {
      event.confirm.resolve(event.newData);
      this.users.push(data);
      this.ngOnInit();


  }, err => {
    if(err.status == 500){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }
  });
}
}

  addUser(event): void{
    if(!event.newData.login || !event.newData.password || !event.newData.role){
      this.toast.warning("all fields are required! try again", "Warning", {duration: 5000})
      return ;
    }else if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+([a-zA-Z0-9-]+){2,4}$/.test(event.newData.login))){
        this.toast.danger("Login must be an email form", "Error", {duration: 5000})
        return ;
    }else if(event.newData.password.length < 4){
        this.toast.danger("Password should be 4 characters minimum", "Error", {duration: 5000})
        return ;
    }else{
   
    var user = {
      "code":event.newData.code,
      "login" : event.newData.login,
    "password" : event.newData.password,
    "role" : event.newData.role
    };
user.role=this.roles.filter(role => role.nom === user.role)[0];
console.log(user.role);
       
this.httpUsertService.addUtilisateur(user).subscribe(data => {
  console.log(data);
  event.confirm.resolve(event.newData);
  this.users.push(data);
  console.log(this.users);
  this.ngOnInit();
  
});
    }

  }

  onDeleteConfirm(event): void {
    const diagRef = this.dialogService.open(ShowcaseDialogComponent, {
      context:{
        title: "Delete User Confirmation",
        user: event.data,
        event: event
      },
      closeOnBackdropClick: false
    }); 
  }

  ngOnInit(): void {
    this.httpUsertService.getRoles().subscribe(res => this.roles = res);
    this.httpUsertService
    .getEmployees()
    .subscribe(response => this.handleSuccessfulResponse(response));
  
  }

}
