import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'

import {Month} from '../month';
import {Week}  from '../week';
import {Day}   from '../day';
import {DropdownMonth} from '../dropdown-month';
import {CalendarEvent} from '../calendar-event';

@Component({
  selector: 'month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  myForm:FormGroup;

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

    this.myForm = new FormGroup({
      eventName : new FormControl('', [
        Validators.required, 
        Validators.minLength(5)
      ]),
      eventDate : new FormControl('', Validators.required)
    })
  }

  createEvent(){

    for ( let week of this.month.weeks ){
      for ( let day of week.days ){
        if ( day.calendarDay.isSame( this.myForm.value.eventDate, 'day')){
          let newEvent:CalendarEvent = new CalendarEvent();
          newEvent.eventDay = day;
          newEvent.title = this.myForm.value.eventName;
          day.events.push( newEvent );
        }
      }
    }
    this.myForm.reset();
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

        let calDay = this.creatCalendarDay( day );

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

        let calDay = this.creatCalendarDay( day );

        globalWeek.days.push( calDay );

      }
      else {
        let calDay = this.creatCalendarDay( day );
        globalWeek.days.push( calDay );
      }
    }
    this.month = globalMonth;
  }

  creatCalendarDay( day:moment.Moment ){
      let calDay = new Day()
      calDay.calendarDay = day;
      calDay.columnOffset = day.weekday();

      return calDay;

  }

  setMonth( value:number ){
    this.monthNumber = value;
    this.createCalendar();
  }

  setYear( value:number ){
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