import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-35%)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))]), { optional: true }),
      ])
    ])
  ]

})



export class HomeComponent implements OnInit {
  itemCount: number;
  btnText: string = 'Add an item'
  item: string = "";
  goals: string[] = [];

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.goal.subscribe(
      res => {
        this.goals = res
      }
    )
    this.service.changeGoal(this.goals)
    this.itemCount = this.goals.length;
  }

  addGoal() {
    this.goals.push(this.item)
    this.service.changeGoal(this.goals)
    this.itemCount = this.goals.length;

  }

  removeGoal(i) {
    this.goals.splice(i, 1)
    this.service.changeGoal(this.goals)
    this.itemCount = this.goals.length;
  }

}
