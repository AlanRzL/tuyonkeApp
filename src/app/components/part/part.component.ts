import { Component, OnInit, Input } from '@angular/core';
import {  Part } from 'src/app/interfaces/interfaces';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { ModalController } from '@ionic/angular';
import { PartDetailsComponent } from '../part-details/part-details.component';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
})
export class PartComponent implements OnInit {

  @Input() part: Part;

  constructor( private modalCtr: ModalController) { }

  ngOnInit() {}


  async showPartDetails(part:Part){
    const modal = await this.modalCtr.create({
      component: PartDetailsComponent,
      componentProps:{
        part
      }
    })
    modal.present();
  }
  



}
