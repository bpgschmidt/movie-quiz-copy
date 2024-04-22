// services/AuthService.js
import { makeAutoObservable } from 'mobx';
import { auth, googleProvider, firestore } from '../config/firebase';
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

class AuthService {
    currentUser = null;

    constructor() {
        makeAutoObservable(this);
        this.checkUserAuth();
    }

    checkUserAuth() {
        auth.onAuthStateChanged(user => {
            this.setUser(user);
        });
    }

    async updateUserProfile(user) {
        if (!user) return;
      
        // Update the main user document with private information (email and uid)
        const userRef = doc(firestore, `users/${user.uid}`);
        await setDoc(userRef, {
            email: user.email,
            // Any other private fields you want to store
        }, { merge: true });
    
        // Check and update public_profile with public information
        const publicProfileRef = doc(firestore, `public_profiles/${user.uid}`);
        const publicProfileSnapshot = await getDoc(publicProfileRef);
    
        if (publicProfileSnapshot.exists()) {
            // Update the username if it has changed
            const publicProfileData = publicProfileSnapshot.data();
            if (user.displayName && user.displayName !== publicProfileData.username) {
                await setDoc(publicProfileRef, {
                    username: user.displayName,
                }, { merge: true });
            }
        } else {
            // If the public profile does not exist, create it with the default values
            await setDoc(publicProfileRef, {
                username: user.displayName || user.email.split('@')[0], // Use displayName or part of the email as a username
                savedPoints: 0,
                completedQuizes: 0,
            });
        }
    }
    
    

    async signInWithGoogle() {
        try {
            const { user } = await signInWithPopup(auth, googleProvider);
            await this.updateUserProfile(user); // Update user profile in Firestore
            this.setUser(user);
            return user;
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error; // Rethrow error to handle it in the UI if needed
        }
    }

    async signOut() {
        try {
            await signOut(auth);
            this.setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error; // Rethrow error to handle it in the UI if needed
        }
    }

    setUser(user) {
        this.currentUser = user;
    }
}

export const authService = new AuthService();
