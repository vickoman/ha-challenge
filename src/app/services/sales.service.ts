import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales$: Observable<any[]>
  constructor( private firestore: AngularFirestore) { 
  }

  getSales() {
    return this.firestore.collection('sales').snapshotChanges();
  }

  // createSale(sale: any) {
  //   return this.firestore.collection('sales').add(sale);
  // }
}
