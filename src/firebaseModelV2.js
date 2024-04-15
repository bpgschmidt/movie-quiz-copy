// fireBaseModel.js
import { reaction } from 'mobx';
import { get, set } from "firebase/database";
import { rf } from "./config/firebase.js";
import store from './MovieQuizStore';

function modelToPersistence() {
    return {
        currentQuiz: store.currentQuiz,
        currentPoints: store.numberOfPoints,
        currentIndex: store.quizIndex,
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
        set(rf, modelToPersistence());
    }
}

async function readFromFirebase() {
    store.setLoading(true);
    store.setReady(false);
    try {
        const snapshot = await get(rf);
        await persistenceToModel(snapshot.val());
    } catch (error) {
        console.error("Error reading from Firebase:", error);
    } finally {
        store.setReady(true);
        store.setLoading(false);
    }
}

function connectToFirebase() {
    // React to changes in the store and save them to Firebase
    reaction(
        () => [store.currentQuiz, store.numberOfPoints],
        () => {
            saveToFirebase();
        }
    );

    // Load initial data from Firebase
    readFromFirebase();
}

export { saveToFirebase, readFromFirebase, connectToFirebase };
