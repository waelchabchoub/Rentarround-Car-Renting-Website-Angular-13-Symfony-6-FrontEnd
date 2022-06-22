import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from "../authentification.service";

@Injectable()
export class AdminGuard implements CanActivate{
 
    constructor(private router: Router,private authentificationService:AuthentificationService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.authentificationService.isAdmin();
    }
}