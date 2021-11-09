import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpProfileService {

 
  constructor(private httpClient: HttpClient) { }

  getProfils() {
    return this.httpClient.get<any>("http://localhost:8083/api/profil/all");
  }

  addProfil(Profil){
  return this.httpClient
  .post<any>("http://localhost:8083/api/profil/add",Profil)

}
UpdateProfil(Profil){
  return this.httpClient
  .put<any>("http://localhost:8083/api/profil/update",Profil)
}

DeleteProfil(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/profil/delete/"+id)
}
}
