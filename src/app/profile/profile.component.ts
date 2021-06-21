import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../classes/utilisateur';
import { UserService } from '../services/user.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Did } from '../classes/did';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
id:string;
grade:string;
downloadURL: Observable<string>;
selectedFile: File = null;
fb = "";
did:Did;
b=true;
dids:Did[];
user:Utilisateur;
users:Utilisateur[];
constructor(private storage: AngularFireStorage,private userService:UserService) { }

ngOnInit(): void {
  this.user=new Utilisateur();
  this.did=new Did();
  this.id=localStorage.getItem("id");
  this.read();
  this.reading();
}
onFileSelected(event) {
  var n = Date.now();
  const file = event.target.files[0];
  const filePath = `/Curriculum/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`/Curriculum/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.fb = url;
            this.search(event.target.files[0].name);
            alert(event.target.files[0].name);
          }
          console.log(this.fb);
        });
      })
    )
    .subscribe((url) => {
      if (url) {
        console.log(url);
      }
    });
}
search(data)
{
  for (let cr of this.dids)
  {
    if(data.includes(cr.titre))
    {
this.did=cr;
console.log(cr);
localStorage.setItem("detailles",JSON.stringify(cr));
this.b=false;
  }
}
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
  for (let u of this.users)
{
if((u.id==this.id))
{
this.user.id=u.id;
this.user.adresse=u.adresse;
this.user.age=u.age;
this.user.nom=u.nom;
this.user.email=u.email;
this.user.telephone=u.telephone;
 this.user.curriculum_vitae=u.curriculum_vitae;
this.user.mdp=u.mdp;
this.user.specialite=u.specialite;
this.user.grade=u.grade;
this.user.niveau=u.niveau;

}
console.log("user",this.user);
localStorage.setItem("cv",this.user.curriculum_vitae);
localStorage.setItem("nom",this.user.nom);



}

  console.log("liste",this.users);

});



}
reading()
{
this.userService.read_learning().subscribe(data => {

  this.dids = data.map(e => {
    return {
     id: e.payload.doc.id,

     titre: e.payload.doc.data()["titre"],
     specialite: e.payload.doc.data()["specialite"],
     specialite2: e.payload.doc.data()["specialite2"],
     specialite3: e.payload.doc.data()["specialite3"],
     s1: e.payload.doc.data()["s1"],
     s2: e.payload.doc.data()["s2"],
     s3: e.payload.doc.data()["s3"],



    };
  });


  console.log("res",this.dids);

});



}
update()
{
  this.user.curriculum_vitae=this.fb;
  let us=Object.assign({},this.user);
  localStorage.setItem("cv",this.fb);
this.userService.update_User(this.id,us);

alert("updated successfully");


}
}
