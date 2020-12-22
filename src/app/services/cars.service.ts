import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarsResponse } from '../interfaces/interfaces';
import { FuncionesService } from 'src/app/services/funciones.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  homeURL = "https://tuyonke.mx/controllers/";
  constructor(private http:HttpClient,
    private funcionesService: FuncionesService  ) {  }


  getMyCars(ID_User:number){
    return this.http.get<CarsResponse>(this.homeURL+`get_myCars.php?ID_User=${ID_User}`);
  }

  getCars(searchValue:String, searchState:string){
    searchValue  = this.funcionesService.deleteSpecialCharacters(searchValue);
    return this.http.get<CarsResponse>(this.homeURL+`get_cars.php?searchValue=${searchValue}&searchState=${searchState}`);
  }

  getCar(ID_Car:number){
    return this.http.get<CarsResponse>(this.homeURL+`get_cars.php?ID_Car=${ID_Car}`);
  }

  postCar(Brand:string, Model:string, Year:number, Description:string, ID_Yonke:number, ID_User:number){
    Model  = this.funcionesService.deleteSpecialCharacters(Model);
    Year  = this.funcionesService.deleteSpecialCharacters(Year);
    Description  = this.funcionesService.deleteSpecialCharacters(Description);
    return this.http.get<CarsResponse>(this.homeURL+`post_car.php?Brand=${Brand}&Model=${Model}&Year=${Year}&Description=${Description}&ID_Yonke=${ID_Yonke}&ID_User=${ID_User}`);
  }

  deleteCar(ID_Car:number){
    return this.http.get<CarsResponse>(this.homeURL+`delete_car.php?ID_Car=${ID_Car}`);
  }

  editCar(ID_Car:Number, Brand:String, Model:String, Year:number, Description:String, ID_Yonke:Number){
    Model  = this.funcionesService.deleteSpecialCharacters(Model);
    Year  = this.funcionesService.deleteSpecialCharacters(Year);
    Description  = this.funcionesService.deleteSpecialCharacters(Description);
    return this.http.get<CarsResponse>(this.homeURL+`edit_car.php?ID_Car=${ID_Car}&Brand=${Brand}&Model=${Model}&Year=${Year}&Description=${Description}&ID_Yonke=${ID_Yonke}`);
 }

  getYonkeCars(ID_Yonke:number){
    return this.http.get<CarsResponse>(this.homeURL+`get_yonkeCars.php?ID_Yonke=${ID_Yonke}`);
  }
  
}
