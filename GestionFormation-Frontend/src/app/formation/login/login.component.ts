import { Component, OnInit, Inject } from "@angular/core";
import { Router} from "@angular/router";
import { AuthenticationService } from "../Serivces/authentication.service";
import { getDeepFromObject } from "@nebular/auth";
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from "@nebular/auth";
import { NbToastrService } from "@nebular/theme";
import { HttpUserService } from "../Serivces/http-user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  redirectDelay: number = 0;

  errors: string[] = [];
  messages: string[] = [];
  user: any = { rememberMe: true };

  showMessages: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];

  validation = {};

  showPassword = false;

  constructor(
    private loginservice: AuthenticationService,
    private userService: HttpUserService,
    @Inject(NB_AUTH_OPTIONS) protected config = {},
    protected router: Router,
    private toast: NbToastrService
  ) {
    this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    this.showMessages = this.getConfigValue("forms.login.showMessages");
    this.socialLinks = this.getConfigValue("forms.login.socialLinks");

    this.validation = this.getConfigValue("forms.validation");
  }

  loginEmail() {
    this.errors = this.messages = [];
    this.submitted = false;
    this.loginservice.authenticate(this.user.email,this.user.password).subscribe(
      data => {
        this.submitted = true;
        this.messages.push(
          "Welcome " +
          this.user.email +
            ", you have successfully logged in"
            
        );
        this.showToast();
        this.redirectToDashboard();
       
    }, err => {
      if(err.status == 403){
        this.errors.push("Authentification failed! Please check your credentials and try again")
      }
      else
        this.errors.push("Error occured! Please try again later")
      this.showToast();
    })
  }

  redirectToDashboard() {
    this.userService.getUtilisateurByLogin(this.user.email).subscribe(data => {
      if(data.role.nom === "admin"){
        setTimeout(() => {
          this.router.navigate(['/pages'])
        }, this.redirectDelay);
      }else if(data.role.nom === "user"){
        setTimeout(() => {
          this.router.navigate(['/userPages'])
        }, this.redirectDelay);
      }else{
        setTimeout(() => {
          this.router.navigate(['/directeurPages'])
        }, this.redirectDelay);

      }
    })
    
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  showToast() {
    if (this.errors && this.errors.length > 0 && !this.submitted) {
      var err = this.errors[0];
      this.toast.warning(err, "Error", { duration: 5000 });
    }
    if (this.messages && this.messages.length > 0 && this.submitted) {
      var msg = this.messages[0];
      this.toast.success(msg, "Success", { duration: 5000 });
    }
  }

  getInputType(){
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword(event: MouseEvent) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }



  private loadSripts(scriptName: string) {
    var doc = document
      .getElementsByTagName("body")[0]
      .getElementsByTagName("script");

    for (var i = 0; i < doc.length; i++) {
      if (doc[i].getAttribute("src").includes(scriptName)) {
        document.getElementsByTagName("body")[0].removeChild(doc[i]);
        continue;
      }
    }
    if (i >= doc.length) {
      const node = document.createElement("script");
      node.src = "/assets/" + scriptName + ".js";
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("body")[0].appendChild(node);
    }
  }

  ngOnInit() {

    this.loadSripts("test");
  }
}


