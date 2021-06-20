import { Component, OnInit } from '@angular/core';
import { Session } from '../classes/session';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { CandidatureService } from '../services/candidature.service';
import { Candidature } from '../classes/candidature';
import { ReponseService } from '../services/reponse.service';
import { Reponses } from '../classes/reponses';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
session:Session;
sessions:Session[];
reponses:Reponses[];
downloadURL: Observable<string>;
selectedFile: File = null;
cv:string;
fb = "";
  constructor(private storage: AngularFireStorage, 
    private reponseapi:ReponseService,  private route: ActivatedRoute,
    private candidatureService:CandidatureService,
    private router: Router,private sessionService:SessionService) { }
grade:string;
candidature:Candidature;
candidatures:Candidature[];
  ngOnInit(): void {
    this.session=new Session();
    this.read();
    this.cv=localStorage.getItem("cv");
    this.grade=localStorage.getItem("grade");
this.candidature=new Candidature();
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `/offre/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`/offre/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
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
ajouter()
{
  this.session.url=this.fb;
  let sess=Object.assign({},this.session);
  this.sessionService.create_NewSession(sess);
  alert("ajouté!");
}
read()
{
this.sessionService.read_Sessions().subscribe(data => {

  this.sessions = data.map(e => {
    return {
      id: e.payload.doc.id,

    
     titre: e.payload.doc.data()["titre"],
     date: e.payload.doc.data()["date"],
     description: e.payload.doc.data()["description"],
     url: e.payload.doc.data()["url"],
     



    };
  });

console.log("interviews",this.sessions);

});



}
readrep(id)
{
  localStorage.setItem("ids",id);
  this.candidatureService.read_nosCandidatures().subscribe(data => {
  
    this.candidatures = data.map(e => {
      return {
       id: e.payload.doc.id,
  
       curriculum: e.payload.doc.data()["curriculum"],
       
       user: e.payload.doc.data()["user"],
       iduser: e.payload.doc.data()["id_user"],
       idsession: e.payload.doc.data()["idsession"],
       did:e.payload.doc.data()["did"],
  
  
  
      };
    });
  
  
    console.log("liste",this.candidatures);
  
  });
  

}
questionnaire(session)
{
localStorage.setItem("ids",session.id);
localStorage.setItem("titre",session.titre);
window.location.replace("/home/questions");


}
supprimer(id)
{
  if(confirm("vous voulez supprimer cette session?"))
  this.sessionService.delete_Session(id);
}
add(id)
{
  this.candidature.curriculum=localStorage.getItem("cv");
  this.candidature.idsession=id;
  this.candidature.iduser=localStorage.getItem("id");
  this.candidature.user=localStorage.getItem("nom");
this.candidature.did=JSON.parse(localStorage.getItem("detailles"));
let cnd=Object.assign({},this.candidature);
  this.candidatureService.create_NewCandidature(cnd);
  alert("candidature déposé");
  
}
}
