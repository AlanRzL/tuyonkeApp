import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Car, Yonke, Part } from 'src/app/interfaces/interfaces';
import { YonkesService } from 'src/app/services/yonkes.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { CarsService } from 'src/app/services/cars.service';
import { PartsService } from 'src/app/services/parts.service';

@Component({
  selector: 'app-yonke-details',
  templateUrl: './yonke-details.component.html',
  styleUrls: ['./yonke-details.component.scss'],
})
export class YonkeDetailsComponent implements OnInit {

  segmentChosen:string = "Autos";
  yonke:Yonke;
  @Input() ID_Yonke;
  @Input() yonkePhoto;


  cars: Car [] = [];
  parts: Part [] = [];

  constructor(
    private carsService: CarsService,
    private partsService: PartsService,
    private modalCtrl: ModalController,
    private yonkesService: YonkesService,
    private funcionesService: FuncionesService
    ) { }

  ngOnInit() {
    console.log("start");
    this.funcionesService.presentLoading();
    this.getYonke();
    this.getYonkeCars();
    this.getYonkeParts();
    this.funcionesService.dismissLoading();
    console.log("end");
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  
  segmentChanged(event:any){
    this.segmentChosen = event.detail.value;
  }


  getYonke(){
    console.log("getYonke");
    this.yonkesService.getYonke(this.ID_Yonke).subscribe(resp => {
      if(resp.statusID == 200){
        this.yonke = resp.data[0];
      }
    });
  }

  getYonkeCars(){
    console.log("getYonkeCars");
    this.carsService.getYonkeCars(this.ID_Yonke).subscribe(resp => {
      this.cars = [];
      this.cars.push(...resp.data);
    });
  }

  getYonkeParts(){
    console.log("getYonkeParts");
    this.partsService.getYonkeParts(this.ID_Yonke).subscribe(resp => {
      this.parts = [];
      this.parts.push(...resp.data);
    });
  }

  sendWhatsApp(){
    let URL = 'https://api.whatsapp.com/send?phone=+52'+this.yonke.WhatsApp+'&text=Hola!%20vi%20tu%20perfil%20en%20tuyonke.mx,%20quisiera%20m%C3%A1s%20informaci%C3%B3n';
    window.open(URL, '_system');
  }
  openCall(){
    let URL = 'tel:+52'+this.yonke.Phone;
    window.open(URL, '_system');
  }

  openMaps(){
    let URL = 'http://maps.google.com/?q='+this.yonke.City+' '+this.yonke.State+', '+this.yonke.Address+' '+this.yonke.AddressNumber;
    window.open(URL, '_system');
  }




}
