import { Component, OnInit } from '@angular/core';
import { Session } from '../classes/session';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
session:Session;
sessions:Session[];
  constructor(   private route: ActivatedRoute,
    private router: Router,private sessionService:SessionService) { }

  ngOnInit(): void {
    this.session=new Session();
    this.read();
  }
ajouter()
{
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
