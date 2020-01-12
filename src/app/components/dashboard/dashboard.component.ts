import { Agent } from './../../models/agent.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Highcharts from 'highcharts';
import { AgentsService } from 'src/app/services/agents.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public token;
  public identity;
  public agents:Agent[]=[];
  public agent:Agent;
  public alert;
  public enable:boolean=false;

  public options: any = {
    chart: {
      type: 'column',
      height: 450
    },
    title: {
      text: 'Grafica de Agentes'
    },tooltip: {

    },
    xAxis:{
        categories:[]
      },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Comisiones',
        turboThreshold: 500000,
        data: []
      }
    ]
  }

subscription: Subscription;
  constructor(private userService: UserService, private route: Router, private agentsService:AgentsService) {
    this.token = this.userService.getToken();
    this.identity= this.userService.getIdentity();
    this.agent=new Agent('','','',0);

    if(!this.identity){
      this.route.navigate(['/login']);
    }
   }

   getDataAgents(){
    this.agentsService.getAgents(this.token).subscribe((data:any) => {
      const updated_normal_data = [];
      const name_agent=[];
      this.agents=data.agents;
      this.agents.forEach(row => {
        updated_normal_data.push(row.agentCommission);
        name_agent.push(row.agentName);
        this.options.xAxis.categories=name_agent;
      });
      this.options.series[0]['data'] = updated_normal_data;

      Highcharts.chart('container', this.options);
    },
    error => {
      console.log('Something went wrong.');
    })
   }

   transferData(){
     this.agentsService.trasferData(this.token).subscribe((res:any)=>{
        if(!res){
          console.log('Error Interno');
        }else{
          this.enable=true;
          this.alert="Transfiriendo Datos..."
          console.log('Insertando Datos');
          setInterval(()=>{
            this.enable=false;
          },3000);
        }
     });
   }

  ngOnInit() {
    if(this.identity && this.token){
        const source = interval(10000);
        const trasf=interval(10500);
        this.getDataAgents();
        source.subscribe(v=>this.transferData());
        trasf.subscribe(val=>this.getDataAgents());
    }



  }

}
