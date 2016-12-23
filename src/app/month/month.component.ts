import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';

import {Month} from '../month';
import {Week}  from '../week';
import {Day}   from '../day';
import {DropdownMonth} from '../dropdown-month';

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

  // dropdown values
  months:DropdownMonth[] = [];
  years:number[] = [];

  monthNumber:number = moment().month();
  yearNumber:number = moment().year();

  constructor( ) {
    this.createDropdownValues();
   }

  ngOnInit() {
    this.createCalendar();
  }

  createCalendar(){  
    this.days = [];

    this.startDate = moment()
                  .year(this.yearNumber )
                  .month( this.monthNumber )
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

  setMonth( value:number ){
    console.log('Month:', value);
    this.monthNumber = value;
    this.createCalendar();
  }

  setYear( value:number ){
    console.log('Year', value);
    this.yearNumber = value;
    this.createCalendar();
  }

  private createDropdownValues(){

    for( let i = 1; i < 22; i++){
      this.years.push(1999+i);
    }  

    this.months.push( new DropdownMonth(0, 'January'));
    this.months.push( new DropdownMonth(1, 'February'));
    this.months.push( new DropdownMonth(2, 'March'));
    this.months.push( new DropdownMonth(3, 'April'));
    this.months.push( new DropdownMonth(4, 'May'));
    this.months.push( new DropdownMonth(5, 'June'));
    this.months.push( new DropdownMonth(6, 'July'));
    this.months.push( new DropdownMonth(7, 'August'));
    this.months.push( new DropdownMonth(8, 'September'));
    this.months.push( new DropdownMonth(9, 'October'));
    this.months.push( new DropdownMonth(10, 'November'));
    this.months.push( new DropdownMonth(11, 'December'));
    
  }
}