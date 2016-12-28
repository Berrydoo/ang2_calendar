import {Day} from './day';

export class Week {

    title:string = "";
    days:Day[] = [];

    getAddBlankCells(){
        return ( this.days.length > 0 &&    
                    this.days[0].calendarDay.date() == 1);
    }

    getBlankCellCount(){
        return (7 - this.days.length);
    }

}
