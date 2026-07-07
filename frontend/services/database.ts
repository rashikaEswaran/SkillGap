import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface UserProfile {
  email: string;
  name: string;
  role: 'admin' | 'faculty' | 'student';
  collegeId?: string;
  Department?: string;
}

export interface College {
  name: string;
  code: string;
  departments: string[];
}

export interface Department {
  name: string;
  code: string;
  collegeId: string;
  programs: string[];
}

export async function createUserProfile(data: UserProfile): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...data,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    throw new Error(error.message || 'Failed to create profile');
  }
}

export async function getCollegeByCode(code: string): Promise<College | null> {
  try {
    const q = query(collection(db, 'colleges'), where('code', '==', code));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const data = querySnapshot.docs[0].data();
    return {
      name: data.name,
      code: data.code,
      departments: data.departments || [],
    };
  } catch (error: any) {
    console.error('Error fetching college:', error);
    throw new Error(error.message || 'Failed to fetch college');
  }
}

export async function getDepartmentsByCollege(collegeId: string): Promise<Department[]> {
  try {
    const q = query(collection(db, 'departments'), where('collegeId', '==', collegeId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as unknown as Department));
  } catch (error: any) {
    console.error('Error fetching departments:', error);
    throw new Error(error.message || 'Failed to fetch departments');
  }
}