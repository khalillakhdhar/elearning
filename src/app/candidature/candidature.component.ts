import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../classes/utilisateur';
import { UserService } from '../services/user.service';
import { Candidature } from '../classes/candidature';
import { CandidatureService } from '../services/candidature.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  candidat:Candidature;
  candidatures:Candidature[];
  downloadURL: Observable<string>;
  selectedFile: File = null;
  fb = "";
    constructor(private candidatureService:CandidatureService,
      private storage: AngularFireStorage,
      ) { }
  
    ngOnInit(): void {
      this.candidat=new Candidature();
      this.read();
    }
  ajouter()
  {
    let us=Object.assign({},this.candidat);
    this.candidatureService.create_NewCandidature(us);
  }
  read()
  {
  this.candidatureService.read_Candidatures().subscribe(data => {
  
    this.candidatures = data.map(e => {
      return {
       id: e.payload.doc.id,
  
       curriculum: e.payload.doc.data()["curriculum"],
       description: e.payload.doc.data()["description"],
       type: e.payload.doc.data()["type"],
       
  
  
  
      };
    });
  
  
    console.log("liste",this.candidatures);
  
  });
  
  
  
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `/Curriculum/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`/Products/${n}`, file);
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
  supprimer(id)
  {
    if(confirm("vous voulez supprimer l'utilisateur?"))
    this.candidatureService.delete_Candidature(id);
  }
}
