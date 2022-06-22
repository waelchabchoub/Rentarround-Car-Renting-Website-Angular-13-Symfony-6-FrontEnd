export class Car{
    id : number;
    model: string;
    color : string;
    pricePerDay : number;
    placeNb:number;
    region:string;
    availability: boolean;
    image : string;
    constructor(id=0,model='',color='',pricePerDay=0,placeNb=0,region='',availability=false,image=''){
        this.id=id;
        this.model=model;
        this.color=color;
        this.pricePerDay=pricePerDay;
        this.placeNb=placeNb;
        this.region=region;
        this.availability=availability;
        this.image = image;
        
    }
    
}
