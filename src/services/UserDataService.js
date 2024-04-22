import { makeAutoObservable } from 'mobx';
import { firestore } from '../config/firebase';
import { authService } from './AuthService';
import { collection, onSnapshot, doc, setDoc, getDoc  } from "firebase/firestore";

class UserDataService {
    savedPoints = 0;
    completedQuizes = 0;

    unsubscribeFromAllUsersDataRealtime() {
        if (this.unsubscribeFromAllUsersDataRealtimeFn) {
            this.unsubscribeFromAllUsersDataRealtimeFn();
            this.unsubscribeFromAllUsersDataRealtimeFn = null;
        }
    }

    constructor() {
        makeAutoObservable(this);
        this.loadUserData();
    }

    async createUserProfile(user) {
        const userPublicProfileRef = doc(firestore, `public_profiles/${user.uid}`);
        try {
            await setDoc(userPublicProfileRef, {
                username: user.displayName || user.email.split('@')[0],
                savedPoints: 0,
                completedQuizes: 0,
            }, { merge: true });
            console.log("Public user profile created/updated");
        } catch (error) {
            console.error("Error setting up public user profile:", error);
        }
    }

    async saveUserData(userData) {
        if (authService.currentUser) {
            const userPublicProfileRef = doc(firestore, `public_profiles/${authService.currentUser.uid}`);
            try {
                await setDoc(userPublicProfileRef, userData, { merge: true });
                console.log("User data saved successfully to public profile", userData);
            } catch (error) {
                console.error("Error saving user data to public profile:", error);
            }
        }
    }

    getAllUsersDataRealtime(updateCallback) {
        const publicProfilesRef = collection(firestore, "public_profiles");
        
        const unsubscribe = onSnapshot(publicProfilesRef, (querySnapshot) => {
          const usersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log("Real-time users' public data:", usersData);
          updateCallback(usersData); 
        }, (error) => {
          console.error("Error fetching real-time users' public data:", error);
        });
        
        this.unsubscribeFromAllUsersDataRealtimeFn = unsubscribe;
        return unsubscribe;
      }


    async loadUserData() {
        if (authService.currentUser) {
            const userPublicProfileRef = doc(firestore, `public_profiles/${authService.currentUser.uid}`);
            try {
                const docSnapshot = await getDoc(userPublicProfileRef);
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    this.savedPoints = userData.savedPoints ?? 0;
                    this.completedQuizes = userData.completedQuizes ?? 0;
                } else {
                    console.log("No user data found in public profile");
                }
            } catch (error) {
                console.error("Error loading user data from public profile:", error);
            }
        }
    }
}

export const userDataService = new UserDataService();
