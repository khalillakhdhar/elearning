import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewQuestion(record) {
    return this.firestore.collection('Questions').add(record);
    console.log("ajout ",record+" added")
  }

  read_Questions() {
    return this.firestore.collection('Questions').snapshotChanges();
  }

  update_Question(recordID, record) {
    this.firestore.doc('Questions/' + recordID).update(record);
    console.log('updated');
  }

  delete_Question(record_id) {
    this.firestore.doc('Questions/' + record_id).delete();
  }
}