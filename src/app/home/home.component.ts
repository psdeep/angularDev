import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('goals',[
        transition('* => *', [
            query(':enter', style({opacity:0}), {optional:true}),
            query(':enter', stagger('300ms',[
              animate('.6s ease-in', keyframes([
                style({opacity:   0, transition:'translateY(-75%)',offset:0}),
                style({opacity: 0.5, transition:'translateY(35px)',offset:.3}),
                style({opacity:   1, transition:'translateY(0)',offset:1})
              ])
             )
            ]),{optional:true}),
            query(':leave', stagger('300ms',[
              animate('.6s ease-in', keyframes([
                style({opacity:   1, transition:'translateY(0)',offset:0}),
                style({opacity: 0.5, transition:'translateY(35px)',offset:.3}),
                style({opacity:   0, transition:'translateY(-75%)',offset:1})
              ])
             )
            ]),{optional:true})
        ])
    ])
  ]
})
export class HomeComponent implements OnInit {
   
  itemCount : number;
  btnText : string = "Add a item";
  goalText : string = "My first goal is climb from sky";
  goals = [];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res=> this.goals = res);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }
  
  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  removeItem(i) {
    this.goals.splice(i,1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }
}
