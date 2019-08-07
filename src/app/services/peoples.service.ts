import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { of } from 'rxjs';
import { People } from '../models/people';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {

  public peopleCollection: AngularFirestoreCollection<People>;
//  public people: Observable<Array<People>>;
  public people: People;
  public peopleDoc: AngularFirestoreDocument<People>;
  

  constructor(public db: AngularFirestore) { }

  getPeoples(): Observable<Array<People>> {
    return this.db.collection<People>('Peoples')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as People;
          data.id = a.payload.doc.id;
          return data;
        }))
      );
  }

  getPeopleById(id: string): Observable<People> {
    this.peopleDoc = this.db.doc<People>(`Peoples/${id}`);
    return this.peopleDoc.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as People;
        data.id = a.payload.id;
        return data;
      })
    );
  }

  deletePeople(id: string): Promise<void> {
    return this.db
      .collection('Peoples')
      .doc(id)
      .delete();
  }

  addPeople(people: People) {
    people.nuevo = false;
    return this.db
      .collection("Peoples")
      .add(people);
  }

  updtaePeople(people: People): Promise<void> {
    return this.db
      .collection('Peoples')
      .doc(people.id)
      .set(people);
  }

}
