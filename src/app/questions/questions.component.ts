import { Component, OnInit } from '@angular/core';
import { Question } from '../classes/question';
import { QuestionService } from '../services/question.service';
import { ReponseService } from '../services/reponse.service';
import { Reponses } from '../classes/reponses';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
question:Question;
questions:Question[];
titre:string;
grade:string;
reponse:Reponses;
  constructor(private reponseService:ReponseService,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.reponse=new Reponses()
    this.question=new Question();
    this.titre=localStorage.getItem("titre");
    this.read();
    this.grade=localStorage.getItem("grade");
  }
add()
{
  this.question.idsession=localStorage.getItem("ids");
  let qu=Object.assign({},this.question);
this.questionService.create_NewQuestion(qu);
alert("ajouté avec succés")

}
read()
{
this.questionService.read_Questions().subscribe(data => {

  this.questions = data.map(e => {
    return {
      id: e.payload.doc.id,

    
     titre: e.payload.doc.data()["titre"],
     texte: e.payload.doc.data()["texte"],
     recommandation: e.payload.doc.data()["recommandation"],
     reponse: e.payload.doc.data()["reponse"],
     idsession: e.payload.doc.data()["idsession"],
     



    };
  });

console.log("interviews",this.questions);

});



}
edit(qs)
{
this.reponse.idqst=localStorage.getItem("ids");
this.reponse.question=qs.titre;
this.reponse.repondeur=localStorage.getItem("nom");
//this.reponse.idqst=localStorage.getItem("id");
let rp=Object.assign({},this.reponse);
this.reponseService.create_NewReponse(rp);

}
delete(idq)
{
  if(confirm("vous voulez supprimez?"))
  {
this.questionService.delete_Question(idq);

  }
}
}
