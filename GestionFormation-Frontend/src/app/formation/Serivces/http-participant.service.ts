import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpParticipantService {

  constructor(private httpClient: HttpClient) { }

  getParticipants() {
    return this.httpClient.get<any>(" http://localhost:8083/api/participant/all");
  }

  addParticipant(participant){
  return this.httpClient
  .post<any>("http://localhost:8083/api/participant/add",participant)

}
UpdateParticipant(participant){
  return this.httpClient
  .put<any>("http://localhost:8083/api/participant/update",participant)
}

DeleteParticipant(id){
  return this.httpClient
  .delete<any>("http://localhost:8083/api/participant/delete/"+id)
}

getPays(){
  return this.httpClient
  .get<any>("http://localhost:8083/api/pays/all/");
}

getProfils(){
  return this.httpClient
  .get<any>("http://localhost:8083/api/profil/all/");
}

getSessionsByParticipantId(id){
  return this.httpClient
  .get<any>("http://localhost:8083/api/participant/"+id+"/sessions");
}

}
