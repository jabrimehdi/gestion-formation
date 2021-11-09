import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpFormationService {

  _selectedFormation: any = {
    "titre": "",
      "annee": "",
      "duree": "",
      "budget": "",
      "nb_session": "",
      "type": "",
      "domaine": "",
  };

  constructor(private httpClient: HttpClient) { }

  getFormations() {
    return this.httpClient.get<any>(" http://localhost:8083/api/formation/all");
  }

  addFormation(formation){
  return this.httpClient
  .post<any>("http://localhost:8083/api/formation/add",formation)

}
UpdateFormation(formation){
  return this.httpClient
  .put<any>("http://localhost:8083/api/formation/update",formation)
}

DeleteFormation(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/formation/delete/"+id)
}

getSessionsDeFormationByFormationId(id){
  return this.httpClient
  .get<any>("http://localhost:8083/api/formation/"+id+"/sessions");
}

}
