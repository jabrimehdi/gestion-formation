import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Utilisateur} from '../../formation/Models/Utilisateur';


@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private httpClient: HttpClient) { }


  getEmployees() {
    return this.httpClient.get<Utilisateur[]>("http://localhost:8083/api/utilisateur/all");
  }

  addUtilisateur(utilisateur){
  return this.httpClient
  .post<any>("http://localhost:8083/api/utilisateur/add",utilisateur)


}



UpdateUtilisateur(utilisateur){
  return this.httpClient
  .put<any>("http://localhost:8083/api/utilisateur/update",utilisateur)
}

DeleteUtilisateur(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/utilisateur/delete/"+id)
}


getRoles(){
  return this.httpClient.get<any>("http://localhost:8083/api/role/all");
}

getUtilisateurByLogin(login){
  return this.httpClient.get<any>("http://localhost:8083/api/utilisateur/"+login);
}


}
