import { Component, OnInit } from '@angular/core';
import { Session } from '../classes/session';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
session:Session;
sessions:Session[];
downloadURL: Observable<string>;
selectedFile: File = null;
fb = "";
  constructor(private storage: AngularFireStorage,   private route: ActivatedRoute,
    private router: Router,private sessionService:SessionService) { }
grade:string;
  ngOnInit(): void {
    this.session=new Session();
    this.read();
    this.grade=localStorage.getItem("grade");

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
     description: e.payload.doc.data()["description"],
     url: e.payload.doc.data()["url"],
     



    };
  });

console.log("interviews",this.sessions);

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
}
