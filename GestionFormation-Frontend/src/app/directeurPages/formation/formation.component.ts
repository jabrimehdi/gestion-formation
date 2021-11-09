import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { NbCalendarYearCellComponent, NbDateService, NbSelectComponent, NbStepperComponent } from '@nebular/theme';
import { FormateurService } from '../../formation/Serivces/formateur.service';
import { HttpDomaineService } from '../../formation/Serivces/http-domaine.service';
import { HttpFormationService } from '../../formation/Serivces/http-formation.service';
import { HttpOrganismeService } from '../../formation/Serivces/http-organisme.service';
import { HttpParticipantService } from '../../formation/Serivces/http-participant.service';
import { HttpSessionService } from '../../formation/Serivces/http-session.service';

@Component({
  selector: 'ngx-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
})
export class FormationComponent implements OnInit, OnDestroy{
  
  linearMode = true;
  year = new Date();
  yearCellComponent = NbCalendarYearCellComponent
  
  min: Date;
  max: Date;
  domains: any[];
  domaineForm: any;
  formation: any = {};
  sessionFormation: any = {};
  organismes: any[];
  formateurs: any[];
  participants: any[];
  showedFormation: any = {};
  showedSession: any = {};
  showedDomaine:any;
  constructor(protected dateService: NbDateService<Date>, private httpDomaineService: HttpDomaineService, 
    private httpOrganismeService: HttpOrganismeService, private httpFormateurService: FormateurService, 
    private httpParticipantService: HttpParticipantService, private httpFormationService: HttpFormationService,
    private httpSessionService: HttpSessionService) { 
    this.min = this.dateService.addYear(this.dateService.today(), 0)
    this.max = this.dateService.addYear(this.dateService.today(), 2)
  }
  

  dataChanged(event,form: NgForm){
    var dateDeb: Date,dateFin: Date;
    dateDeb = this.sessionFormation.dateDeb;
    dateFin = this.sessionFormation.dateFin;
    if(dateDeb && dateFin){
        if((dateFin.valueOf() - dateDeb.valueOf()) !== this.formation.duree*24*60*60*1000){
            form.form.controls['dateDeb'].setErrors({valid:false});
            form.form.controls['dateFin'].setErrors({valid:false});
        }else{
            if(form.form.controls['dateDeb'].errors !== null)
              form.form.controls['dateDeb'].clearAsyncValidators();
            if(form.form.controls['dateFin'].errors !== null)
              form.form.controls['dateFin'].clearAsyncValidators();
        }
    }
  }

  participantEvent(event, form: NgForm){
    if(this.sessionFormation.nbParticipants && this.sessionFormation.participants){
      if(this.sessionFormation.participants.length > this.sessionFormation.nbParticipants){
        form.form.controls['nbParticipants'].setErrors({valid:false});
        form.form.controls['participant'].setErrors({valid:false});
        console.log("shiit")
      }else{
        if(form.form.controls['nbParticipants'].errors !== null)
            form.form.controls['nbParticipants'].clearAsyncValidators();
        if(form.form.controls['participant'].errors !== null)
            form.form.controls['participant'].clearAsyncValidators();
        console.log("jawik fisfis")
      }
    }
  }

  
  addFormation(form: NgForm){
    var annee = this.formation.annee.getFullYear();
    var sess = {
      "date_debut":this.sessionFormation.dateDeb,
      "date_fin":this.sessionFormation.dateFin,
      "lieu":this.sessionFormation.lieu,
      "nb_participant":this.sessionFormation.nbParticipants,
      "organisme":this.sessionFormation.organisme,
      "formateur":this.sessionFormation.formateur,
      "participants":this.sessionFormation.participants,
      "formations": []
    }
    sess.formateur = this.formateurs.filter(f => f.id == sess.formateur)[0];
    sess.organisme = this.organismes.filter(o => o.id == sess.organisme)[0];
    sess.participants = sess.participants.map(p => this.participants.filter(pt => pt.id == p)[0]);
    if(this.formation.id){
      var formation = {"id": this.formation.id};
      sess.formations.push(formation);
      this.httpSessionService.addSession(sess).subscribe(data => {
        console.log(data);
      },err => {
        console.log("errrreeuur");
      })
      setTimeout(() => {
      this.formation.domaine = this.formation.domaine.libelle;
      this.showedFormation = this.formation;
      },500)
    }else{
      var f = {
        "titre": this.formation.titre,
        "annee": annee,
        "duree": this.formation.duree,
        "budget": this.formation.budget,
        "nb_session": this.formation.nb_session,
        "type": this.formation.type,
        "domaine": this.domaineForm,
    }
    f.domaine = this.domains.filter(d => d.id == f.domaine)[0];
    console.log(f)
    this.httpFormationService.addFormation(f).subscribe((data) => sess.formations.push({"id": data.id}));    
    console.log(sess);
    setTimeout(() => {
      this.httpSessionService.addSession(sess).subscribe(data => {
        console.log(data);
      },err => {
        console.log("errrreeuur add session");
      })
    },500)
    
    setTimeout(()=>{
      f.domaine = f.domaine.libelle;
      this.showedFormation = f;
    },500)
    }

    setTimeout(() => {
      sess.formateur = sess.formateur.nom + " " + sess.formateur.prenom;
      sess.organisme = sess.organisme.libelle;
      this.showedSession = sess;
      console.log(this.showedSession);
    },500)
  }

  ngOnInit(): void {
    this.httpFormateurService.getFormateurs().subscribe(data => this.formateurs = data);
    this.httpOrganismeService.getOrganismes().subscribe(data => this.organismes = data);
    this.httpDomaineService.getDomaines().subscribe(data => this.domains = data);
    this.httpParticipantService.getParticipants().subscribe(data => this.participants = data);
    if(this.httpFormationService._selectedFormation.titre !== ""){
      this.formation = this.httpFormationService._selectedFormation;
      var today = new Date(); 
      this.formation.annee = new Date(this.formation.annee, today.getMonth(), today.getDate());
      this.domaineForm = this.formation.domaine.id.toString();
      this.httpFormationService._selectedFormation = {
        "titre": "",
      "annee": "",
      "duree": "",
      "budget": "",
      "nb_session": "",
      "type": "",
      "domaine": "",
      }
    }
  }

  test(nameForm: NgForm,stepper: NbStepperComponent){
    var sessions: any[];
    if(this.formation.id){
    this.httpFormationService.getSessionsDeFormationByFormationId(this.formation.id).subscribe(data => {
      sessions = data;
    });
    setTimeout(() =>{
      if(nameForm.form.disabled && (this.formation.nb_session > sessions.length))
      nameForm.form.enable({onlySelf:true});
    else
      console.log("max sessions added");
    },500)
  }
  }

  ngOnDestroy(): void {
    this.formation = null;
  }

}
