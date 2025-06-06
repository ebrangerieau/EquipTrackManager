import { db } from './firebase-config';
import { collection, getDocs, query, limit } from 'firebase/firestore';

export async function validateFirestoreConnection() {
  try {
    // Tenter de lire un document pour vérifier la connexion
    const testQuery = query(collection(db, 'equipments'), limit(1));
    await getDocs(testQuery);
    return {
      success: true,
      message: 'Connexion Firestore réussie'
    };
  } catch (error) {
    console.error('Erreur de connexion Firestore:', error);
    return {
      success: false,
      error,
      message: 'Échec de la connexion Firestore'
    };
  }
}

export function handleFirestoreError(error: any) {
  console.error('Erreur Firestore:', error);
  
  const errorMessages: { [key: string]: string } = {
    'permission-denied': 'Accès refusé. Vérifiez vos permissions.',
    'not-found': 'Document ou collection introuvable.',
    'already-exists': 'Le document existe déjà.',
    'failed-precondition': 'Opération impossible dans l\'état actuel.',
    'invalid-argument': 'Arguments invalides pour l\'opération.',
  };

  return {
    message: errorMessages[error.code] || 'Une erreur est survenue',
    code: error.code,
    original: error
  };
}