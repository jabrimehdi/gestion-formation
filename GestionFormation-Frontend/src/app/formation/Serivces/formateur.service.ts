import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(private httpClient: HttpClient) { }

  getFormateurs() {
    return this.httpClient.get<any>(" http://localhost:8083/api/formateur/all");
  }

  addFormateur(formateur){
  return this.httpClient
  .post<any>("http://localhost:8083/api/formateur/add",formateur)

}
UpdateFormateur(formateur){
  return this.httpClient
  .put<any>("http://localhost:8083/api/formateur/update",formateur)
}

DeleteFormateur(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/formateur/delete/"+id)
}

getOrganismes(){
  return this.httpClient
  .get<any>("http://localhost:8083/api/organisme/all/");
}
}
