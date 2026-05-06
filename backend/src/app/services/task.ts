import { inject, Injectable, WritableSignal } from '@angular/core';
import { Firebase } from './firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly firebase = inject(Firebase);

  get collection() {
    if (!this.firebase.auth.currentUser)
      throw new Error('User not authenticated');

    return collection(this.firebase.db, 'userTasks', this.firebase.auth.currentUser.uid, 'tasks')
      .withConverter({
        toFirestore: (task: Task) => ({
          name: task.name,
          isDone: task.isDone
        }),
        fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options) as any;

          return {
            id: snapshot.id,
            name: data.name,
            isDone: data.isDone
          }
        }
      });
  }

  watchTasks(signal: WritableSignal<Task[]>) {
    return onSnapshot(this.collection, (snapshot) => {
      signal.set(snapshot.docs.map(doc => doc.data() as Task));
    });
  }

  async getTasks() {
    const taskSnapshot = await getDocs(this.collection);
    const taskList = taskSnapshot.docs.map(doc => doc.data() as Task);

    return taskList;
  }

  async getTask(id: string) {
    const snapshot = await getDoc(doc(this.collection, id));
    return snapshot.data() as Task;
  }

  async createTask(task: Task) {
    return setDoc(doc(this.collection), task);
  }

  async editTask(task: Task) {
    return setDoc(doc(this.collection, task.id), task);
  }

  deleteTask(id: string) {
    return deleteDoc(doc(this.collection, id));
  }
}
