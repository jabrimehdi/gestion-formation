import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpOrganismeService {

  constructor(private httpClient: HttpClient) { }

  getOrganismes() {
    return this.httpClient.get<any>(" http://localhost:8083/api/organisme/all");
  }

  addOrganisme(Organisme){
  return this.httpClient
  .post<any>("http://localhost:8083/api/organisme/add",Organisme)

}
UpdateOrganisme(Organisme){
  return this.httpClient
  .put<any>("http://localhost:8083/api/organisme/update",Organisme)
}

DeleteOrganisme(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/organisme/delete/"+id)
}
}
