import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/interfaces/interfaces';
import { CarDetailsComponent } from '../car-details/car-details.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {

  @Input() car: Car;

  constructor( private modalCtr: ModalController) { }

  ngOnInit() {}


  async showCarDetails(car:Car){
    const modal = await this.modalCtr.create({
      component: CarDetailsComponent,
      componentProps:{
        car
      }
    })
    modal.present();
}



}
