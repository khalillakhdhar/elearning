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
    return this.firestore.collection('Candidature').add(record);
  }

  read_Candidatures() {
    let id= localStorage.getItem("id");

    return this.firestore.collection('Candidature').snapshotChanges();
  }
  read_mesCandidatures() {
    return this.firestore
      .collection("Candidature", (ref) => ref.where("iduser", "==", localStorage.getItem("id")))
      .snapshotChanges();
  }
  read_nosCandidatures() {
    return this.firestore
      .collection("Candidature", (ref) => ref.where("idsession", "==", localStorage.getItem("ids")))
      .snapshotChanges();
  }
  update_Candidature(recordID, record) {
    let id= localStorage.getItem("id");

    this.firestore.doc('Candidature/' + recordID).update(record);
    console.log('updated');
  }

  delete_Candidature(record_id) {
    let id= localStorage.getItem("id");

    this.firestore.doc('Candidature/' + record_id).delete();
  }
}
