import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NewCarComponent } from 'src/app/components/new-car/new-car.component';
import { NewPartComponent } from 'src/app/components/new-part/new-part.component';
import { EditYonkeComponent } from 'src/app/components/edit-yonke/edit-yonke.component';
import { EditCarComponent } from 'src/app/components/edit-car/edit-car.component';
import { EditPartComponent } from 'src/app/components/edit-part/edit-part.component';
import { YonkesService } from 'src/app/services/yonkes.service';
import { CarsService } from 'src/app/services/cars.service';
import { PartsService } from 'src/app/services/parts.service';
import { Yonke, Car, Part, User  } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UsersService } from 'src/app/services/users.service';
import { FuncionesService } from 'src/app/services/funciones.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  User:User;
  segmentChosen:string = "perfil";
  ID_User:number = 0;
  Name:string = "";
  Email:string = "";
  Phone:string = "";
  State:string = "";
  City:string = "";
  Password:string = "";

  yonkes: Yonke [] = [];
  cars: Car [] = [];
  parts: Part [] = [];


  showSkeleton:boolean;


  constructor(
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private yonkesService: YonkesService,
    private carsService: CarsService,
    private partsService: PartsService,
    private funcionesService: FuncionesService,
    private storage: Storage,
    private usersService: UsersService
    ) {
    }

    ionViewWillEnter(){
      this.checkSession();
    }

  
    segmentChanged(event:any){
      this.segmentChosen = event.detail.value;
      console.log(this.segmentChosen );
      if(this.segmentChosen == "yonkes"){
        this.getMyYonkes();
      }else if(this.segmentChosen == "autos"){
        this.getMyCars();
      }else if(this.segmentChosen == "partes"){
        this.getMyParts();
      }
    }

    checkSession(){
      this.funcionesService.presentLoading();
      this.storage.get('ID_User').then((val) => {
        if(val > 0){
          this.ID_User = val;
          this.getUserData();
        }else{
          this.openLoginCompnent();
        }
      });
      this.funcionesService.dismissLoading();
    }

    async openLoginCompnent(){
      this.funcionesService.dismissLoading();
      const modal = await this.modalCtrl.create({
        component: LoginComponent
      });
      modal.present();
      const data  = await modal.onWillDismiss();
      if(data.data != "null"){
        this.checkSession();
      }
    } 
    

    deleteSession(){
      this.storage.clear();
      this.ID_User = 0;
      this.Name = "";
      this.Email = "";
      this.Phone = "";
      this.State = "";
      this.City = "";
      this.Password = "";
      this.openLoginCompnent();
    }




    getMyYonkes(){
      this.funcionesService.presentLoading();
      this.yonkesService.getMyYonkes(this.ID_User).subscribe(resp => {
        this.yonkes = [];
        this.yonkes.push(...resp.data);
        this.funcionesService.dismissLoading();
      });
    }    
    
    getMyCars(){
      this.funcionesService.presentLoading();
      this.carsService.getMyCars(this.ID_User).subscribe(resp => {
        this.cars = [];
        this.cars.push(...resp.data);
        this.funcionesService.dismissLoading();
      });
    }
    getMyParts(){
      this.funcionesService.presentLoading();
      this.partsService.getMyParts(this.ID_User).subscribe(resp => {
        this.parts = [];
        this.parts.push(...resp.data);
        this.funcionesService.dismissLoading();
      });
    }



    ////--------------- User --------------- ////
    async getUserData(){  
      this.funcionesService.presentLoading("Obteniendo...");   
      this.usersService.getUser(this.ID_User).subscribe( resp => {
        this.funcionesService.dismissLoading();
        if( resp.statusID == 200){
          this.User = resp.data[0];
          this.Name =  resp.data[0].Name;
          this.Email =  resp.data[0].Email;
          this.Phone =  resp.data[0].Phone;
          this.State = resp.data[0].State;
          this.City = resp.data[0].City;
          this.Password = resp.data[0].Password;
        }else{
          this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
        }
      });
      this.funcionesService.dismissLoading();
    }

    async editUserData(){     
      this.funcionesService.presentLoading("Actualizando...");
      this.usersService.editUser(this.ID_User, this.Name, this.State, this.City, this.Phone, this.Email, this.Password).subscribe( resp => {
        this.funcionesService.dismissLoading();
        if( resp.statusID == 200){
          this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
        }else{
          this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
        }
      });
    }
    ////--------------- User --------------- ////

  




    ////--------------- Parts --------------- //// 
    async openNewPartComponent(){
      const modal = await this.modalCtrl.create({
        component: NewPartComponent
      });
      modal.present();
      const data  = await modal.onWillDismiss();
      if(data.data == "Refresh"){
        this.getMyParts();
      }
    } 
    async openEditPartComponent(part:Part){
      const modal = await this.modalCtrl.create({
        component: EditPartComponent,
        componentProps: {
          part: part
        }
      });
      modal.present();
      const data  = await modal.onWillDismiss();
      if(data.data == "Refresh"){
        this.getMyParts();
      }
    } 
    async deletePart(part:Part) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Eliminar',
        message: 'Seguro que deseas eliminar ' + part.Name,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Eliminar',
            handler: () => {
                    this.funcionesService.presentLoading();
                    this.partsService.deletePart(part.ID_Part).subscribe(resp => {
                      this.funcionesService.dismissLoading();
                      if(resp.statusID == 200){
                        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
                        this.getMyParts();
                      }else{
                        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
                      }
                    });
            }
          }
        ]
      });
      await alert.present();
    }
    

    
    ////--------------- Parts --------------- ////









    ////--------------- Cars --------------- ////
    async openNewCarComponent(){
      const modal = await this.modalCtrl.create({
        component: NewCarComponent
      });
      modal.present();
      const data  = await modal.onWillDismiss();
      if(data.data == "Refresh"){
        this.getMyCars();
      }
    } 
    async openEditCarComponent(car:Car){
      const modal = await this.modalCtrl.create({
        component: EditCarComponent,
        componentProps: {
          car: car
        }
      });
      modal.present();
      const data  = await modal.onWillDismiss();
      if(data.data == "Refresh"){
        this.getMyCars();
      }
    } 
    async deleteCar(car:Car) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Eliminar',
        message: 'Seguro que deseas eliminar ' + car.Brand + ' ' + car.Model + ' ' + car.Year,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Eliminar',
            handler: () => {
                    this.funcionesService.presentLoading();
                    this.carsService.deleteCar(car.ID_Car).subscribe(resp => {
                      this.funcionesService.dismissLoading();
                      if(resp.statusID == 200){
                        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
                        this.getMyCars();
                      }else{
                        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
                      }
                    });
            }
          }
        ]
      });
      await alert.present();
    }
    ////--------------- Cars --------------- ////


    ////--------------- Yonkes --------------- ////
    async openNewYonkeComponent(){
        let URL = "https://tuyonke.mx/";
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          subHeader: 'Nivel de cuenta',
          message: 'En tu nivel '+ this.User.Level +' solamente puedes publicar 1 yonke o perfil de vendedor, ve todos nuestros niveles disponibles, publica y vende más',
          buttons: [ 
            {
              text: 'Ok',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Ver niveles',
              handler: () => {
                window.open(URL, '_system');
              }
            }
          ]
        });
        await alert.present();
      }
      async openEditYonkeComponent(yonke:Yonke){
        const modal = await this.modalCtrl.create({
          component: EditYonkeComponent,
          componentProps: {
            yonke: yonke
          }
        });
        modal.present();
        const data  = await modal.onWillDismiss();
        if(data.data == "Refresh"){
          this.getMyYonkes();
        }
      } 

    ////--------------- Yonkes --------------- ////


    ////--------------- Profile --------------- ////
    async openProfile(){
      let URL = "https://tuyonke.mx/";
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Nivel de cuenta',
        message: 'El nivel de tu cuenta actual es: '+ this.User.Level +' da click abajo para conocer más detalles',
        buttons: [ 
          {
            text: 'Cerrar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Ver más detalles',
            handler: () => {
              window.open(URL, '_system');
            }
          }
        ]
      });
      await alert.present();
    }
  ////--------------- Profile --------------- ////


}
