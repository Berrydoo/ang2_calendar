import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';

import {Month} from '../month';
import {Week}  from '../week';
import {Day}   from '../day';

@Component({
  selector: 'month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  days:moment.Moment[] = [];
  startDate:moment.Moment;
  numDaysInMonth:number;
  monthYearTitle:string;
  month:Month; 

  @Input() monthNumber:number;
  @Input() yearNumber:number;

  constructor( ) { }

  ngOnInit() {

    this.startDate = moment()
                  .year(this.yearNumber )
                  .month( this.monthNumber-1)
                  .date(1);

    this.numDaysInMonth = this.startDate.daysInMonth();
    this.monthYearTitle = this.startDate.format("MMMM YYYY");

    this.days.push( this.startDate );
    for ( let i = 1; i < this.numDaysInMonth; i++ ){
      this.days.push( this.startDate.clone().add(i, 'day') );
    }

    let globalMonth = new Month();
    let globalWeek = new Week();
    let globalDay = new Day();

    for(let day of this.days ){

      if ( day.date() === 1){

        let week = new Week();
        week.title = "Week " + (globalMonth.weeks.length + 1);

        let calDay = new Day();
        calDay.title = day.format("d");
        calDay.calendarDay = day;
        calDay.columnOffset = day.weekday();

        week.days.push( calDay );
        globalMonth.weeks.push( week );

        globalDay = calDay;
        globalWeek = week;
      }

      else if ( day.weekday() == 0 ){

        let week = new Week();
        week.title = "Week " + (globalMonth.weeks.length + 1);
        globalMonth.weeks.push( week );
        globalWeek = week;

        let calDay = new Day()
        calDay.calendarDay = day;
        calDay.title = day.format("d");
        calDay.columnOffset = day.weekday();

        globalWeek.days.push( calDay );

      }
      else {
        let calDay = new Day()
        calDay.calendarDay = day;
        calDay.title = "abc";
        calDay.columnOffset = day.weekday();

        globalWeek.days.push( calDay );
      }
    }
    this.month = globalMonth;
  }
}