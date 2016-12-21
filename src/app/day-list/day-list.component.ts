import { Component, OnInit, Input } from '@angular/core';
import {Month} from '../month';

@Component({
  selector: 'day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})
export class DayListComponent implements OnInit {

  @Input() month:Month;

  constructor() { }

  ngOnInit() {

  }



}
