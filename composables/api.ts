import {
    Firestore,
    collection,
    doc,
    setDoc,
    getDocs,
    where,
    query,
    deleteDoc,
  } from 'firebase/firestore';
  
  
  
  export async function getSnippetsFirebase(userId: string): Promise<any[]> {
    const { $firebaseDb } = useNuxtApp();

    console.log($firebaseDb)
    try {
      const userSnippetsRef = collection($firebaseDb as Firestore, `users/${userId}/snippets`);
      const userSnippetsSnapshot = await getDocs(userSnippetsRef);
      const snippetsDataArray: any[] = [];
  
      if (!userSnippetsSnapshot.empty) {
        userSnippetsSnapshot.forEach((doc) => {
          snippetsDataArray.push(doc.data());
        });
        return snippetsDataArray;
      } else {
        console.log('No snippets found for this user');
        return [];
      }
    } catch (error) {
      console.error('Error fetching snippets:', error);
      throw error;
    }
  }
  
  export async function saveSnippetFirebase(userId: string, snippet: any): Promise<void> {
    const { $firebaseDb } = useNuxtApp();

    const userSnippetsCollection = collection($firebaseDb as Firestore, `users/${userId}/snippets`);
  
    try {
      const userSnippetsSnapshot = await getDocs(userSnippetsCollection);
  
      if (!userSnippetsSnapshot.empty) {
        console.log('Subcollection already exists for user:', userId);
      } else {
        console.log('Subcollection does not exist for user:', userId);
        console.log('Subcollection created for user:', userId);
      }
  
      const snippetDocRef = doc(userSnippetsCollection, snippet.id);
  
      await setDoc(snippetDocRef, snippet);
      //getSnippetsFirebase();
      console.log('Snippet added to subcollection for user:', userId);
    } catch (error) {
      console.error('Error adding snippet to subcollection:', error);
      throw error;
    }
  }
  
  export async function deleteSnippetFirebase(userId: string, snippetId: string): Promise<void> {
    const { $firebaseDb } = useNuxtApp();

    try {
      const userSnippetsCollection = collection($firebaseDb as Firestore, `users/${userId}/snippets`);
  
      const q = query(userSnippetsCollection, where('id', '==', snippetId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('Snippet deleted:', doc.id);
      });
    } catch (error) {
      console.error('Error deleting snippets by content:', error);
      throw error;
    }
  }
  
  export async function deleteAllSnippetsFirebase(userId: string): Promise<void> {
    const { $firebaseDb } = useNuxtApp();

    const userSnippetsCollection = collection($firebaseDb as Firestore, `users/${userId}/snippets`);
  
    try {
      const querySnapshot = await getDocs(userSnippetsCollection);
  
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('Snippet deleted:', doc.id);
      });
      console.log('All snippets deleted for user:', userId);
    } catch (error) {
      console.error('Error deleting snippets:', error);
      throw error;
    }
  }
  