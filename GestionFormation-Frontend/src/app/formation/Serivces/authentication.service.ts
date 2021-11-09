import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,private cookieService: CookieService) {}


  authenticate(username, password) {
    return this.httpClient
      .post<any>("http://localhost:8083/api/authenticate", { username, password })
      .pipe(
        map(userData => {
          this.cookieService.set("username", username);
          let tokenStr = "Bearer " + userData.jwt;
          this.cookieService.set("token", tokenStr);
          return userData;
        })
      );
  }


  isUserLoggedIn() {
    let user = this.cookieService.get("username");
    console.log(!(user === null));
    return !(user === null);
  }

  getLoggedInUser(): any{
    if(this.isUserLoggedIn)
      return this.cookieService.get("username");
    else
      return null
  }

  logOut() {
    //this.cookieService.deleteAll();
  }

}
