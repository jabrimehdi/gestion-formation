import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpSessionService {

  constructor(private httpClient: HttpClient) { }

  getSession() {
    return this.httpClient.get<any>(" http://localhost:8083/api/sessionDeFormation/all");
  }

  addSession(session){
  return this.httpClient
  .post<any>("http://localhost:8083/api/sessionDeFormation/add",session)

}
UpdateSession(session){
  return this.httpClient
  .put<any>("http://localhost:8083/api/sessionDeFormation/update",session)
}

DeleteSession(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/sessionDeFormation/delete/"+id)
}

getFormationBySessionId(id){
  return this.httpClient.get<any>(" http://localhost:8083/api/sessionDeFormation/formation/"+id);
}
}
