import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarsService } from 'src/app/services/cars.service';
import { Car, Yonke } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { YonkesService } from 'src/app/services/yonkes.service';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
})
export class EditCarComponent implements OnInit {
  
  ID_User:number;
  @Input() car:Car;
  yonkes: Yonke [] = [];
  ID_Car:Number = 0;
  Brand:String = "";
  Model:String = "";
  Year:any = 0;
  Description:String = "";
  ID_Yonke:number = 0;
  
  constructor(
    private modalCtrl: ModalController,
    private carsService: CarsService,
    private storage: Storage,
    private funcionesService: FuncionesService,
    private yonkesService: YonkesService
  ) { }

  ngOnInit() {
    this.checkSession();
  }

  closeModal(action:string = "null"){
    this.modalCtrl.dismiss(action);
  }


  checkSession(){
    this.funcionesService.presentLoading();
    this.storage.get('ID_User').then((val) => {
      this.funcionesService.dismissLoading();
      if(val > 0){
        this.ID_User = val;
        this.getMyYonkes();
      }else{
        this.closeModal();
      }
    });
  }
  
  getMyYonkes(){
    this.funcionesService.presentLoading();
    this.yonkes = [];
    this.yonkesService.getMyYonkes(this.ID_User).subscribe(resp => {
      this.yonkes.push(...resp.data);
      this.funcionesService.dismissLoading();
      this.ID_Car = this.car.ID_Car;
      this.Brand = this.car.Brand;
      this.Model = this.car.Model;
      this.Year = this.car.Year;
      this.Description = this.car.Description;
      this.ID_Yonke = this.car.ID_Yonke;
    });
  }

  editCar(){

    if(this.Year > 2025 || this.Year < 1900){
      this.funcionesService.presentAlert("Error", "Revisa el año");
      return;
    }
    
    this.funcionesService.presentLoading("Actualizando...");
    this.carsService.editCar(this.ID_Car, this.Brand, this.Model, this.Year, this.Description, this.ID_Yonke).subscribe( resp => {
      this.funcionesService.dismissLoading();
      if( resp.statusID == 200){
        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
        this.closeModal("Refresh");
      }else{
        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
      }
      
    });

  }

} 
