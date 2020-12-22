import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {

  @Input() cars: Car [] = [];
  constructor() { }

  ngOnInit() {}

}
