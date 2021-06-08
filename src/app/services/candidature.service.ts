import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewCandidature(record) {
   let id= localStorage.getItem("id");
    return this.firestore.collection('candidature').add(record);
  }

  read_Candidatures() {
    let id= localStorage.getItem("id");

    return this.firestore.collection('candidature').snapshotChanges();
  }

  update_Candidature(recordID, record) {
    let id= localStorage.getItem("id");

    this.firestore.doc('candidature/' + recordID).update(record);
    console.log('updated');
  }

  delete_Candidature(record_id) {
    let id= localStorage.getItem("id");

    this.firestore.doc('candidature/' + record_id).delete();
  }
}
