export interface CarsResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: Car[];
}
export interface Car{
    ID_Car: number;
    ID_Yonke: number;
    Brand: string;
    Model:  string;
    Year: number;
    Description: string;
    Photo1:  string;
    Photo2:  string;
    Photo3:  string;
    Photo4:  string;
    Created:  string;
    Updated:  string;
    ID_User: number;
    YonkePhoto:  string;
    YonkeName:  string;
    YonkeCategory:  string;
    YonkePhone:  string;
    YonkeWhatsApp:  string;
    YonkeAddress:  string;
    YonkeAddressNumber:  string;
    YonkeAddressSubur:  string;
    YonkeState:  string;
    YonkeCity: string;
}
    
export interface PartsResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: Part[];
}
export interface Part{
    ID_Part: number;
    ID_Yonke: number;
    Name: string;
    Brand: string;
    Model:  string;
    Year: number;
    Description: string;
    Photo1:  string;
    Photo2:  string;
    Photo3:  string;
    Photo4:  string;
    Created:  string;
    Updated:  string;
    ID_User: number;
    YonkePhoto:  string;
    YonkeName:  string;
    YonkeCategory:  string;
    YonkePhone:  string;
    YonkeWhatsApp: string;
    YonkeAddress:  string;
    YonkeAddressNumber:  string;
    YonkeAddressSubur:  string;
    YonkeState:  string;
    YonkeCity: string;
}


export interface YonkesResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: Yonke[];
}
export interface Yonke{
    ID_Yonke?: number;
    ID_User?: number;
    Photo?: string;
    Category?: string;
    Name?: string;
    Phone?: string;
    WhatsApp?: string;
    Address?: string;
    AddressNumber?: string;
    AddressSubur?:  string;
    State?:  string;
    City?:  string;
    Description?:  string;
    Created?:  string;
    Updated?:  string;
}

export interface UsersResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: User[];
}
export interface User{
    ID_User: number;
    Name: string;
    State: string;
    City: string;
    Phone: string;
    Email: string;
    Password: string;
    Level: string;
    Created:  string;
    Updated:  string;
}

