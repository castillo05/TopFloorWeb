import { Agent } from './../../models/agent.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Highcharts from 'highcharts';
import { AgentsService } from 'src/app/services/agents.service';


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

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    series: [
    {
      data: [
        10
      ],
      type: 'spline',
      color:'red'
    }
  ],
  title: {
    text: "Estadisticas de Agentes"
 },
 xAxis:{
  categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
}
   }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {} // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor(private userService: UserService, private route: Router, private agentsService:AgentsService) {
    this.token = this.userService.getToken();
    this.identity= this.userService.getIdentity();
    this.agent=new Agent('','','',0);

    if(!this.identity){
      this.route.navigate(['/login']);
    }

   }

   getDataAgents(){
     this.agentsService.getAgents(this.token).subscribe((res:any)=>{
        if(res.agents){
          this.agents=res.agents;
          this.agents.forEach(element => {
            this.agent=element;
            console.log(this.agent.agentCommission);

          });
        }
     },error=>{

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
    this.getDataAgents();
  }

}
