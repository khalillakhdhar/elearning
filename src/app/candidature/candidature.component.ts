import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../classes/utilisateur';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  user:Utilisateur;
  users:Utilisateur[];
    constructor(private userService:UserService) { }
  
    ngOnInit(): void {
      this.user=new Utilisateur();
      this.read();
    }
  ajouter()
  {
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
