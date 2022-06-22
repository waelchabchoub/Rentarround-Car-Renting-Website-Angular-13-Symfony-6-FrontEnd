import { Car } from "./Car";
import { User } from "./User";


export class Comment{
    id:number;
    content:string;
    createdAt:Date;
    user:User;
    vehicle:Car;

    constructor(id=0,createdAt=new Date()  ,content="",user=new User(),vehicle=new Car()){
        this.id=id;
        this.createdAt=createdAt;
        this.content=content;
        this.user=user;
        this.vehicle=vehicle;

    }



}