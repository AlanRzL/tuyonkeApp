import { Component, OnInit, Input } from '@angular/core';
import {  Part } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit {

  @Input() parts: Part [] = [];
  constructor() { }

  ngOnInit() {}

}
