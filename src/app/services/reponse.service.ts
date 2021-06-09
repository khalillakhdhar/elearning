import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewReponse(record) {
    return this.firestore.collection('Reponses').add(record);
    console.log("ajout ",record+" added")
  }

  read_Reponses() {
    return this.firestore.collection("Reponses", (ref) => ref.where("idqst", "==", localStorage.getItem("ids")))
    .snapshotChanges();
  }
 
  update_Reponse(recordID, record) {
    this.firestore.doc('Reponses/' + recordID).update(record);
    console.log('updated');
  }

  delete_Reponse(record_id) {
    this.firestore.doc('Reponses/' + record_id).delete();
  }
}