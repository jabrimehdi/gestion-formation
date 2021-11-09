import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpPaysService {

  constructor(private httpClient: HttpClient) { }

  getPays() {
    return this.httpClient.get<any>("http://localhost:8083/api/pays/all");
  }

  addPays(pays){
  return this.httpClient
  .post<any>("http://localhost:8083/api/pays/add",pays)

}
UpdatePays(pays){
  return this.httpClient
  .put<any>("http://localhost:8083/api/pays/update",pays)
}

DeletePays(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/pays/delete/"+id)
}
}
