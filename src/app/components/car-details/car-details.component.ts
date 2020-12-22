import { Component, Input, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Car } from 'src/app/interfaces/interfaces';


import { YonkeDetailsComponent } from 'src/app/components/yonke-details/yonke-details.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent  {

  @Input() car: Car;

  @ViewChild('sliderRef', { static: true }) protected slides: IonSlides;

  img:string = "https://http2.mlstatic.com/jeep-patriot-2014-4x2-24-at-en-partes-refacciones-desarme-D_NQ_NP_911004-MLM30493848664_052019-F.jpg";
  constructor(private modalCtrl: ModalController){}

  ionViewDidEnter () {
    this.slides.update();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  sendWhatsApp(YonkeWhatsApp:string){
    let URL = 'https://api.whatsapp.com/send?phone=+52'+YonkeWhatsApp+'&text=Hola!%20vi%20tu%20auto%20en%20tuyonke.mx,%20quisiera%20m%C3%A1s%20informaci%C3%B3n';
    window.open(URL, '_system');
  }
  openCall(YonkePhone:string){
    let URL = 'tel:+52'+YonkePhone;
    window.open(URL, '_system');
  }

  openMaps(YonkeCity:string, YonkeState:string, YonkeAddress:string, YonkeAddressNumber:string){
    let URL = 'http://maps.google.com/?q='+YonkeCity+' '+YonkeState+', '+YonkeAddress+' '+YonkeAddressNumber;
    window.open(URL, '_system');
  }


  async openYonkeDetails(){
    let Photo = "https://tuyonke.mx/controllers/images/yonkes/icon.png";
    if(this.car.YonkePhoto){ Photo = this.car.YonkePhoto; }
    const modal = await this.modalCtrl.create({
      component: YonkeDetailsComponent,
      componentProps: {
        ID_Yonke: this.car.ID_Yonke,
        yonkePhoto: Photo
      }
    });
    modal.present();
    const data  = await modal.onWillDismiss();
  }


}
