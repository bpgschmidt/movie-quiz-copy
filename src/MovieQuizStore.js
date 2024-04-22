import { makeAutoObservable, runInAction, autorun } from 'mobx';
import { authService } from './services/AuthService';
import { userDataService } from './services/UserDataService';
import { quizDataService } from './services/QuizDataService';


class MovieQuizStore {
    currentPoints = 0;
    savedPoints = 0;
    currentIndex = 0; 
    completedQuizes = 0;
    movieIdArrays = {
        mostPopular: [],
        topRated: [],
    };
    currentQuiz = [];
    allUsersData = [];
    loading = false;
    ready = false;
    currentMovie = null;
    currentUser = null;

    constructor() {
        makeAutoObservable(this);
        this.subscribeToAuthChanges(); // Subscribe to changes in AuthService
    }

    // Setters
    setLoading(value) {
        this.loading = value;
    }

    setReady(value) {
        this.ready = value;
    }

    setCurrentQuiz(quiz) {
        this.currentQuiz = quiz;
    }

    savePoints() {  
        if (typeof this.savedPoints === 'number') {
            this.savedPoints += this.currentPoints;
        } else {
            console.error('savedpoints is not a number:', this.currentPoints);
        }
    }

    addCompletedQuiz(){
        this.completedQuizes += 1;
    }


    setCurrentIndex(index) {
        this.currentIndex = index;
    }

    incrementCurrentIndex() {
        console.log("incrementCurrentIndex", this.currentIndex);
        this.currentIndex += 1;
    }

    incrementPoints() {
        this.currentPoints += 1;
    }

    setCurrentPoints(points) {
        this.currentPoints = points;
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    quitQuiz() {
        //this.setCurrentPoints(0);
        //this.setCurrentIndex(0);
    }

    // Async function to complete a quiz
    async completeQuiz() {
        console.log("completeQuiz", this.completedQuizes) ;
        this.addCompletedQuiz();
        console.log("completeQuiz", this.completedQuizes) ;

        this.savePoints();
    
        try {
            await userDataService.saveUserData({
                savedPoints: this.savedPoints,
                completedQuizes: this.completedQuizes
            });
        } catch (error) {
            console.error("Error saving quiz completion data:", error);
        } 
    }

    // Authentication methods
    async signInWithGoogle() {
        return await authService.signInWithGoogle();
    }


    async signOut() {
        return await authService.signOut();
    }

    /* Methods to handle user Data */
    setCurrentUserAndLoadData(user) {
        this.setCurrentUser(user);
        if (user) {
            this.loadUserDataAsync();
        }
    }

    // Subscribe to AuthService user changes
    subscribeToAuthChanges() {
        autorun(() => {
            const user = authService.currentUser;
            this.setCurrentUserAndLoadData(user);
            if (user) {
                this.unsubscribeFromUsersData = this.fetchAllUsersDataRealtime();
            } else if (this.unsubscribeFromUsersData) {
                this.unsubscribeFromUsersData();
            }
        });
    }

    // Async function to load user data
    async loadUserDataAsync() {
        // Directly use the method from UserDataService
        await userDataService.loadUserData();
        runInAction(() => {
            // Update local state with the data from UserDataService
            this.savedPoints = userDataService.savedPoints;
            this.completedQuizes = userDataService.completedQuizes;
        });
    }
    

    fetchAllUsersDataRealtime() {
        return userDataService.getAllUsersDataRealtime((usersData) => {
          runInAction(() => {
            this.allUsersData = usersData;
          });
        });
    }


    async updateCurrentQuiz(category) {
        this.setLoading(true);
        if (!this.movieIdArrays[category] || this.movieIdArrays[category].length === 0) {
            const quizSlices = await quizDataService.generateQuizArray(
                category, 
                10 // questions per quiz
            );

            this.movieIdArrays[category] = quizSlices.map(slice => ({ idArray: slice, isUsed: false }));
        }

        const quiz = this.movieIdArrays[category].find(q => !q.isUsed);
        if (quiz) {
            quiz.isUsed = true;
            this.setCurrentPoints(0); 
            this.setCurrentIndex(0);

            const compiledQuiz = await quizDataService.compileQuiz(quiz.idArray);
            this.setCurrentQuiz(compiledQuiz);
            this.setLoading(false);
        } else {
            console.error("No available quizzes in category:", category);
            this.setLoading(false);
        }
    }
    
}

const store = new MovieQuizStore();
export default store;
