import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewInterview(record) {
    return this.firestore.collection('Interviews').add(record);
  }

  read_Interviews() {
    return this.firestore.collection('Interviews').snapshotChanges();
  }

  update_Interview(recordID, record) {
    this.firestore.doc('Interviews/' + recordID).update(record);
    console.log('updated');
  }

  delete_Interview(record_id) {
    this.firestore.doc('Interviews/' + record_id).delete();
    console.log("deleted");
  }
}