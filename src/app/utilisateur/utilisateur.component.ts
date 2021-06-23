import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../classes/utilisateur';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
user:Utilisateur;
grade:string;
users:Utilisateur[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user=new Utilisateur();
    this.grade=localStorage.getItem("grade");
    this.read();
  }
ajouter()
{
  this.user.grade="responsable"
  let us=Object.assign({},this.user);
  this.userService.create_NewUser(us);
}
read()
{
this.userService.read_Users().subscribe(data => {

  this.users = data.map(e => {
    return {
     id: e.payload.doc.id,

     nom: e.payload.doc.data()["nom"],
     age: e.payload.doc.data()["age"],
     adresse: e.payload.doc.data()["adresse"],
     niveau: e.payload.doc.data()["niveau"],
     specialite: e.payload.doc.data()["specialite"],
     email: e.payload.doc.data()["email"],
     mdp: e.payload.doc.data()["mdp"],
     telephone: e.payload.doc.data()["telephone"],
     grade: e.payload.doc.data()["grade"],
     curriculum_vitae: e.payload.doc.data()["curriculum_vitae"],



    };
  });


  console.log("liste",this.users);

});



}
supprimer(id)
{
  if(confirm("vous voulez supprimer l'utilisateur?"))
  this.userService.delete_User(id);
}
}
