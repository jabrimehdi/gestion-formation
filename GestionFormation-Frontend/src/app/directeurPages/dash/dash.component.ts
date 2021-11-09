import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { Subscription, zip } from 'rxjs';
import { HttpFormationService } from '../../formation/Serivces/http-formation.service';


export interface AppConfig {
  inputStyle?: string;
  dark?: boolean;
  theme?: string;
  ripple?: boolean;
}

@Component({
  selector: 'ngx-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})

export class DashComponent implements OnInit {
  options: any;
  constructor(private httpFormationService:HttpFormationService) {}
  xAxisData:any[] = [];
  sessions:any[] = [];
  formation:any[] = [];
   data1 = [];
   data2 = [];
  
  ngOnInit(): void {
    
    var sess: {
        "participant":number,
          "annne":number,
}
    
    this.httpFormationService.getFormations().subscribe(p=> {
      this.formation = p ;
      console.log(this.formation);
      
      }
      ,eer=> console.log("mamchetech")) ;

      setTimeout(() => {
        this.formation.map(v=> {
          this.httpFormationService.getSessionsDeFormationByFormationId(v.id).subscribe(data=> {
            this.sessions.push(data);
           
            
            
            
             },
        erre=> console.log("nope"))});
      }, 500);
      
      
    setTimeout(() => {
      console.log(this.sessions);
      this.xAxisData =this.formation.map(z=> z.annee.toString());
      this.xAxisData = [... new Set(this.xAxisData)];
      console.log(this.xAxisData);

      
      for(let i = parseInt(this.xAxisData[0]);i <= (this.xAxisData[this.xAxisData.length - 1]);i++) {

        var somm= 0 ;
        var u =0 ;
          for(let j =0 ; j <= (this.sessions.length -1 );j++){
            var date:Date =  new Date(this.sessions[j][0].date_debut);
            
           if(date.getFullYear() == i){
            for(let z =0 ;z <= (this.sessions[j].length - 1);z++){
            
            
            somm= somm + this.sessions[j][z].participants.length ;
           
            }
            u=u+this.sessions[j].length;
         

            
          }
          
          }   
          this.data2.push(u.toString());
          u=0;
          this.data1.push(somm.toString());
             somm=0; 
               
      }
       
    this.loadChart();
    }, 1000);
    


    
  }






  loadChart(){
    
   

    this.options = {
      legend: {
        data: ['participants', 'sessions'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'participants',
          type: 'bar',
          data: this.data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'sessions',
          type: 'bar',
          data: this.data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
    
  }
    

  


}
