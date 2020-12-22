import { Injectable } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginComponent } from 'src/app/components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  isLoading = false;
  constructor(
    private modalCtrl: ModalController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: Storage
    ) { }
  

  async presentAlert(header:string, message:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentLoading(message:string = 'Cargando...') {
    this.isLoading = true;
    return await this.loadingController.create({message}).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }
  async dismissLoading() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    return null;
  }
///<<<--- Comunes

deleteSpecialCharacters(val){
    val = val.toString().replace("'", "");
    val = val.toString().replace("#", "");
  return val;
}


}
