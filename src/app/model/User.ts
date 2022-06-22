import { Reservation } from "./Reservation";

export class User{
    id : number;
    name: string;
    surname : string;
    email : string;
    roles:Array<string>;
    password:string;
    image : string;
    reservations: Reservation[];
    constructor(id=0,name='',surname='',email='',roles=[],password='',image='',reservations=[]){
        this.id=id;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.roles=roles;
        this.password=password;
        this.image = image;
        this.reservations = reservations;
        
    }
    
}
