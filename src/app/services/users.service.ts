import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersResponse } from '../interfaces/interfaces';
import { FuncionesService } from 'src/app/services/funciones.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  homeURL = "https://tuyonke.mx/controllers/";
  constructor(private http:HttpClient,
    private funcionesService: FuncionesService  ) {  }

  getUser (ID_User){
    return this.http.get<UsersResponse>(this.homeURL+`get_user.php?ID_User=${ID_User}`);
  }

  getUserSession( Email:string, Password:string){
    return this.http.get<UsersResponse>(this.homeURL+`get_userSession.php?Email=${Email}&Password=${Password}`);
  }

  postUser(Name:string, State:string, City:string, Email:string, Password:string){
    Name  = this.funcionesService.deleteSpecialCharacters(Name);
    City  = this.funcionesService.deleteSpecialCharacters(City);
    Email  = this.funcionesService.deleteSpecialCharacters(Email);
    return this.http.get<UsersResponse>(this.homeURL+`post_user.php?Name=${Name}&State=${State}&City=${City}&Email=${Email}&Password=${Password}`);
  }

  editUser(ID_User:number, Name:string, State:string, City:string, Phone:string, Email:string, Password:string){
    Name  = this.funcionesService.deleteSpecialCharacters(Name);
    City  = this.funcionesService.deleteSpecialCharacters(City);
    Phone  = this.funcionesService.deleteSpecialCharacters(Phone);
    Email  = this.funcionesService.deleteSpecialCharacters(Email);
    return this.http.get<UsersResponse>(this.homeURL+`edit_user.php?ID_User=${ID_User}&Name=${Name}&State=${State}&City=${City}&Phone=${Phone}&Email=${Email}&Password=${Password}`);
  }

  createPayment(tokenID:string){
    return this.http.get<UsersResponse>(this.homeURL+`MercadoPagoAPI.php?tokenID=${tokenID}`);
  }


}
