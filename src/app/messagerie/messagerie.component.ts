import { Component, OnInit } from '@angular/core';
import { Topic } from '../classes/topic';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {
  topics: any;
  topic: Topic;
  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.topic = new Topic();
    this.read()
  }
  CreateRecord() {
    const record = {};
    record['titre'] = this.topic.titre;
    record['description'] = this.topic.description;
    record['cle'] = this.topic.cle;

    this.topicService.create_NewTopic(record).then(resp => {
    console.log(resp);
    alert('ajouté avec succés!');

       })
         .catch(error => {
           console.log(error);
         });
       }
       read()
       {
        this.topicService.read_Topics().subscribe(data => {

          this.topics = data.map(e => {
            return {
             id: e.payload.doc.id,
    
             titre: e.payload.doc.data()["titre"],
             description: e.payload.doc.data()["description"],
             cle: e.payload.doc.data()["cle"],
    
    
    
            };
          });
          console.log(this.topics);
    
        });
       }
       access(key: string) {
        localStorage.setItem('room', key);
        //window.location.replace('chattopic');
      }
}
