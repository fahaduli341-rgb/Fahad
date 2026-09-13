import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Project, ClientMessage, Recommendation } from '../types';
import { INITIAL_PROJECTS, INITIAL_RECOMMENDATIONS } from '../data/initialData';

// Seed initial projects into Firestore if empty; ensure zero fake recommendations
export async function seedInitialDataIfEmpty() {
  try {
    const projectsCol = collection(db, 'projects');
    const snapshot = await getDocs(projectsCol);
    if (snapshot.empty) {
      for (const p of INITIAL_PROJECTS) {
        await setDoc(doc(db, 'projects', p.id), {
          ...p,
          createdAt: serverTimestamp(),
        });
      }
    }

    // Clean up any legacy dummy recommendations so reviews start genuinely at 0
    const dummyIds = ['rec-1', 'rec-2', 'rec-3'];
    for (const dId of dummyIds) {
      try {
        await deleteDoc(doc(db, 'recommendations', dId));
      } catch {
        // ignore if not present
      }
    }
  } catch (err) {
    console.warn('Firestore seeding check:', err);
  }
}

// Send a client message to Firestore
export async function submitContactMessage(messageData: {
  name: string;
  email: string;
  serviceType: string;
  message: string;
}) {
  const col = collection(db, 'messages');
  const docRef = await addDoc(col, {
    ...messageData,
    status: 'new',
    createdAt: serverTimestamp(),
    timestampStr: new Date().toISOString(),
  });
  return docRef.id;
}

// Submit a recommendation / testimonial
export async function submitRecommendation(recData: {
  name: string;
  role: string;
  company: string;
  rating: number;
  message: string;
  avatarColor: string;
}) {
  const col = collection(db, 'recommendations');
  const docRef = await addDoc(col, {
    ...recData,
    createdAt: serverTimestamp(),
    timestampStr: new Date().toISOString(),
  });
  return docRef.id;
}

// Increment portfolio like/applause counter
export async function togglePortfolioClap() {
  const statRef = doc(db, 'stats', 'applause');
  try {
    await setDoc(statRef, { count: increment(1) }, { merge: true });
  } catch (err) {
    console.warn('Could not increment applause:', err);
  }
}

// Mark message as read
export async function markMessageRead(messageId: string) {
  const docRef = doc(db, 'messages', messageId);
  await updateDoc(docRef, { status: 'read' });
}

// Delete message
export async function deleteMessage(messageId: string) {
  const docRef = doc(db, 'messages', messageId);
  await deleteDoc(docRef);
}

// Add a live project (with demo link)
export async function addNewProject(projectData: {
  title: string;
  liveUrl: string;
  description?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}) {
  const col = collection(db, 'projects');
  const docRef = await addDoc(col, {
    ...projectData,
    createdAt: serverTimestamp(),
    timestampStr: new Date().toISOString(),
  });
  return docRef.id;
}

// Delete a project
export async function deleteProjectDoc(projectId: string) {
  const docRef = doc(db, 'projects', projectId);
  await deleteDoc(docRef);
}

