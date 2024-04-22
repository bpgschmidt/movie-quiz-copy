// fireBaseModel.js
import { reaction } from 'mobx';
import { get, set, ref} from "firebase/database";
import { db_base } from "../config/firebase.js";
import store from '../MovieQuizStore.js';

function get_path() {
  const userAgent = navigator.userAgent;
  const path = userAgent.split('').reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0).toString();
  return path;
}

function getUserRef(uid) {
  return ref(db_base, `users/${uid}`);
}

function modelToPersistence() {
  return {
    currentQuiz: store.currentQuiz,
    currentPoints: store.currentPoints,
    currentIndex: store.currentIndex,
  };
}

async function persistenceToModel(obj) {
  store.setLoading(true);
  try {
    store.setCurrentQuiz(obj?.currentQuiz ?? []);
    store.setCurrentPoints(obj?.currentPoints ?? 0);
    store.setCurrentIndex(obj?.currentIndex ?? 0);
  } finally {
    store.setLoading(false);
  }
}

function saveToFirebase() {
  if (store.ready) {
    const path = get_path();
    const userRef = getUserRef(path);
    set(userRef, modelToPersistence());
  }
}

async function readFromFirebase() {
  store.setLoading(true);
  store.setReady(false);
  try {
    const path = get_path();
    const userRef = getUserRef(path);
    const snapshot = await get(userRef);
    await persistenceToModel(snapshot.val());
  } catch (error) {
    console.error("Error reading from Firebase:", error);
  } finally {
    store.setReady(true);
    store.setLoading(false);
  }
}

function connectToFirebase() {
  reaction(
    () => [store.currentQuiz, store.currentPoints, store.currentIndex],
    () => {
      saveToFirebase();
    }
  );
  readFromFirebase();
}

async function clearDatabase() {
  try {
    const path = get_path();
    const userRef = getUserRef(path);
    if (!userRef) {
      console.error('Error clearing database: Invalid user reference.');
      return;
    }
    set(userRef, null).then(() => {
      console.log('Database cleared successfully.');
    }).catch((error) => {
      console.error('Error clearing database:', error);
    });
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

export { saveToFirebase, readFromFirebase, connectToFirebase, clearDatabase };
