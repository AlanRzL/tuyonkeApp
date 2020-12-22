import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  isLoading = false;
  registerOrLogin = "Login";
  Name = "";
  State = "";
  City = "";
  Email = "";
  Password = "";
  sessionEmail = "";
  sessionPassword = "";

  constructor(
    private modalCtrl: ModalController,
    private usersService: UsersService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: Storage
    ) { }

  ngOnInit() {}


  closeModal(action:any = "null"){
    this.modalCtrl.dismiss(action);
  }


  changeRegisterOrLogin(value:string){
    this.registerOrLogin = value;
  }


  registerCustomer(){
      this.presentLoading("Registrando...");
      this.usersService.postUser(this.Name, this.State, this.City, this.Email, this.Password).subscribe( resp => {
        this.dismissLoading();
        if( resp.statusID == 200){
          this.storage.set('ID_User', resp.data[0].ID_User);
          this.presentAlert(resp.statusName, resp.statusDescription);

          this.registerOrLogin = "Login";
          this.Name = "";
          this.State = "";
          this.City = "";
          this.Email = "";
          this.Password = "";
          this.sessionEmail = "";
          this.sessionPassword = "";

          //this.closeModal(resp.data[0].ID_User);
        }else{
          this.presentAlert(resp.statusName, resp.statusDescription);
        }
      });
  }
  startSession(){
    this.presentLoading("Iniciando...");
    this.usersService.getUserSession(this.sessionEmail, this.sessionPassword).subscribe( resp => {
      this.dismissLoading();
      if( resp.statusID == 200){
        this.storage.set('ID_User', resp.data[0].ID_User);
        this.closeModal(resp.data[0].ID_User);
      }else{
        this.presentAlert(resp.statusName, resp.statusDescription);
      }
    });
  }
  





  ///--->>> Comunes
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

}
