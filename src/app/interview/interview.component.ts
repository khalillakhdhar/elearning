import { Component, OnInit } from '@angular/core';
import { Interview } from '../classes/interview';
import { InterviewService } from '../services/interview.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
interview:Interview;
interviews=[]
  constructor(private interviewService:InterviewService) { }

  ngOnInit(): void {
    this.interview=new Interview();
    this.read();
  }


  ajouter()
{
  let inter=Object.assign({},this.interview);
  this.interviewService.create_NewInterview(inter);
  alert("ajouté avec succés");
}
read()
{
this.interviewService.read_Interviews().subscribe(data => {

  this.interviews = data.map(e => {
    return {
      id: e.payload.doc.id,

     id_session: e.payload.doc.data()["id_session"],
     id_candidat: e.payload.doc.data()["id_candidat"],
     titre: e.payload.doc.data()["titre"],
     date: e.payload.doc.data()["date"],
     remarque: e.payload.doc.data()["remarque"],



    };
  });

console.log("interviews",this.interviews);

});



}
supprimer(id)
{
  if(confirm("vous voulez supprimer cet interview?"))
  {
    this.interviewService.delete_Interview(id);
  }

}
}


