import { Utilisateur } from './../classes/utilisateur';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
user:Utilisateur;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user=new Utilisateur();
    //this.user.grade="user";
  }
adduser()
{
let us=Object.assign({},this.user); // convertir la classe en json
this.userService.create_NewUser(us); // ajout dans BD
alert("ajouté avec succés!");
//window.location.replace("");
}
}
