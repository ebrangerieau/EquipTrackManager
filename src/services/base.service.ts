import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../lib/firebase-config';

export class BaseService<T extends { id: string }> {
  constructor(protected collectionName: string) {}

  protected async getAll(constraints: QueryConstraint[] = []) {
    const q = query(collection(db, this.collectionName), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...this.convertFromFirestore(doc.data())
    })) as T[];
  }

  protected async getById(id: string) {
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return {
      id: snapshot.id,
      ...this.convertFromFirestore(snapshot.data())
    } as T;
  }

  protected async create(data: Omit<T, 'id'>) {
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...this.convertToFirestore(data),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return {
      id: docRef.id,
      ...data
    } as T;
  }

  protected async update(id: string, data: Partial<T>) {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...this.convertToFirestore(data),
      updatedAt: Timestamp.now()
    });
  }

  protected async delete(id: string) {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  protected convertFromFirestore(data: DocumentData): Partial<T> {
    const converted: any = { ...data };
    // Convertir les Timestamp en Date
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Timestamp) {
        converted[key] = data[key].toDate();
      }
    });
    return converted;
  }

  protected convertToFirestore(data: Partial<T>): DocumentData {
    const converted: any = { ...data };
    // Convertir les Date en Timestamp
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Date) {
        converted[key] = Timestamp.fromDate(data[key] as Date);
      }
    });
    return converted;
  }
}