import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { NewCarComponent } from './new-car/new-car.component';
import { NewPartComponent } from './new-part/new-part.component';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { PartsComponent } from './parts/parts.component';
import { PartComponent } from './part/part.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { EditYonkeComponent } from './edit-yonke/edit-yonke.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { EditPartComponent } from './edit-part/edit-part.component';
import { LoginComponent } from './login/login.component';
import { PopoverComponent } from './popover/popover.component';
import { YonkeDetailsComponent } from './yonke-details/yonke-details.component';


@NgModule({
  declarations: [
    NewCarComponent,
    NewPartComponent,
    CarsComponent,
    CarComponent,
    CarDetailsComponent,
    PartsComponent,
    PartComponent,
    PartDetailsComponent,
    EditYonkeComponent,
    EditCarComponent,
    EditPartComponent,
    LoginComponent,
    PopoverComponent,
    YonkeDetailsComponent
  ],
  exports:[
      NewCarComponent,
      NewPartComponent,
      CarsComponent,
      CarComponent,
      CarDetailsComponent,
      PartsComponent,
      PartComponent,
      PartDetailsComponent,
      EditYonkeComponent,
      EditCarComponent,
      EditPartComponent,
      LoginComponent,
      PopoverComponent,
      YonkeDetailsComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
