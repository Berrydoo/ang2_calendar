import * as moment from 'moment';
import { OnInit } from '@angular/core';
import { CalendarEvent } from './calendar-event'

export class Day implements OnInit{

// import moment by installing the .d.ts file with this command in the console
// typings install dt~moment --global
    title:string;
    calendarDay:moment.Moment;
    columnOffset: number = 0;
    offsetClassName: string = "";
    events:CalendarEvent[] = [];

    dayIsToday(){
        return this.calendarDay.isSame( moment(), 'day' );
    }

    ngOnInit(){
        if ( this.calendarDay.date() == 1 &&
                 this.columnOffset > 0 ){
            this.offsetClassName = `col-md-offset-${this.columnOffset}`;
        }
    }

}
