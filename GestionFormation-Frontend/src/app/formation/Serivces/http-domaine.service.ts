import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpDomaineService {

  constructor(private httpClient: HttpClient) { }

  getDomaines() {
    return this.httpClient.get<any>(" http://localhost:8083/api/domaine/all");
  }

  addDomaine(domaine){
  return this.httpClient
  .post<any>("http://localhost:8083/api/domaine/add",domaine)

}
UpdateDomaine(domaine){
  return this.httpClient
  .put<any>("http://localhost:8083/api/domaine/update",domaine)
}

DeleteDomaine(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/domaine/delete/"+id)
}
}
