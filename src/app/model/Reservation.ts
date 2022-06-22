import { Car } from "./Car";
import { User } from "./User";

export class Reservation{
    id:number;
    startDate:Date;
    endDate:Date;
    totalPrice:number;
    status:string;
    user:User;
    vehicle:Car;

    constructor(id=0,startDate=new Date()  ,endDate=new Date()  ,totalPrice=0,status="",user=new User(),vehicle=new Car()){
        this.id=id;
        this.startDate=startDate;
        this.endDate=endDate;
        this.totalPrice=totalPrice;
        this.status=status;
        this.user=user;
        this.vehicle=vehicle;

    }



}