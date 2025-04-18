// utils/auth.ts
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../app/firebase';

export const signInWithGoogle = async (idToken: string) => {
  const credential = GoogleAuthProvider.credential(idToken);
  return await signInWithCredential(auth, credential);
};
