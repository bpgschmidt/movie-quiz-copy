import { makeAutoObservable, runInAction } from 'mobx';
import { getMovieDetails, getTopHundred } from './apiSource.js';
import resolvePromise from './resolvePromise.js';
import { saveToFirebase } from "./firebaseModelV2.js";
import { auth, googleProvider } from './config/firebase';
import { signInWithPopup, signOut } from "firebase/auth";
import { toJS } from 'mobx';

class MovieQuizStore {
    numberOfPoints = 0;
    quizIndex = 0; // HÄR SKA UPDATERAS! 
    movieIdArray = [];
    currentQuiz = [];
    loading = false;
    ready = false;
    currentMovie = null;
    currentUser = null;
    firstTimeInitiated = false;

    constructor() {
        makeAutoObservable(this);
        this.checkUserAuth();
    }

    setLoading(value) {
        this.loading = value;
    }

    setReady(value) {
        this.ready = value;
    }

    setCurrentQuiz(quiz) {
        this.currentQuiz = quiz;


    }


    setCurrentIndex(index) {
        this.quizIndex = index;
    }

    incrementPoints(points) {
        this.numberOfPoints += points;
    }

    setUser(user) {
        this.currentUser = user;
    }

    setCurrentMovie(movie) { 
        this.currentMovie = movie;
    }

    // Authentication methods
    checkUserAuth() {
        auth.onAuthStateChanged(user => {
            this.setUser(user);
        });
    }

    async signInWithGoogle() {
        try {
            const { user } = await signInWithPopup(auth, googleProvider);
            this.setUser(user);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }

    async signOut() {
        try {
            await signOut(auth);
            this.setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    randomiseMovieYears(correctYear) {
        const maxYearDiff = 20;
        const minYearDiff = 2;
        const getCurrentYear = () => new Date().getFullYear();
        const getRandomYear = () => {
            const currentYear = getCurrentYear();
            const randomYear = currentYear + Math.floor(Math.random() * (maxYearDiff - minYearDiff + 1)) - minYearDiff;
            return Math.min(currentYear, randomYear);
        };
        let yearOptions = [correctYear];
        while (yearOptions.length < 4) {
            const randomYear = getRandomYear();
            if (!yearOptions.includes(randomYear)) {
                yearOptions.push(randomYear);
            }
            else {
                yearOptions.push("SAME YEAR");
            }
        }
        const yearObjects = yearOptions.map(year => ({ year, isCorrect: year === correctYear }));
        return this.shuffleArray(yearObjects);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    isAnswerCorrect(movie) {
        if (movie === this.currentMovie) {
            this.numberOfPoints += 1;
            return true;
        } else {
            this.numberOfPoints += 0;
            return false;
        }
    }

    async generateQuizArray() {
        const hundredMovies = ['tt13287846', 'tt10545296', 'tt12037194', 'tt17351924', 'tt5755238', 'tt15398776', 'tt11304740', 'tt1136617', 'tt13651794', 'tt14849194', 'tt1448754', 'tt13751694', 'tt23289160', 'tt5537002', 'tt22687790', 'tt21328106', 'tt14227048', 'tt6166392', 'tt4589218', 'tt14230458', 'tt10676048', 'tt15799866', 'tt0097958', 'tt1392170', 'tt11858890', 'tt14362112', 'tt0314331', 'tt15744298', 'tt15654328', 'tt9682428', 'tt0099785', 'tt0319343', 'tt15782690', 'tt1517268', 'tt23334616', 'tt15671028', 'tt9663764', 'tt18411490', 'tt19406606', 'tt30216176', 'tt1462764', 'tt24429218', 'tt9362930', 'tt21942866', 'tt13560574', 'tt26047818', 'tt1392190', 'tt9603212', 'tt12003946', 'tt5535276', 'tt7038762', 'tt22866358', 'tt0170016', 'tt2709692', 'tt25289836', 'tt9362722', 'tt8002382', 'tt0446029', 'tt1951264', 'tt12747748', 'tt0457939', 'tt16491414', 'tt13274016', 'tt0068646', 'tt0241527', 'tt0338348', 'tt0816692', 'tt15354916', 'tt17009710', 'tt6587046', 'tt0095016', 'tt10638522', 'tt10366206', 'tt17024450', 'tt21064584', 'tt0455824', 'tt0111161', 'tt22041854', 'tt7846056', 'tt15257160', 'tt0047673', 'tt5198890', 'tt21335356', 'tt0111070', 'tt1877830', 'tt1951266', 'tt6710474', 'tt7599146', 'tt5302918', 'tt13238346', 'tt1464335', 'tt0104431', 'tt17527468', 'tt18394190', 'tt0172495', 'tt14998742', 'tt19864828', 'tt1160419', 'tt15009428', 'tt0085334'];
        const nrQuizQuest = 2;
        for (let i = 0; i < 10; i++) {
            const temp_object = [];
            for (let j = 0; j < nrQuizQuest; j++) {
                const movie = hundredMovies[i * nrQuizQuest + j];
                if (movie) {
                    temp_object.push(movie);
                } else {
                    temp_object.push(null);
                }
            }
            if (this.movieIdArray.length < 10) {
                this.movieIdArray.push({ idArray: temp_object, isUsed: false });
            }
        }
    }

    async compileQuiz(idArray) {
        this.loading = true;
        try {
            const quiz = [];
            for (let i = 0; i < idArray.length; i++) {
                const response = await resolvePromise(getMovieDetails(idArray[i]));
                const movie = JSON.parse(response.data);
                if (movie) {
                    quiz.push({
                        title: movie.title,
                        year: movie.year,
                        poster: movie.image.url,
                        isCorrect: false,
                        alt: [this.randomiseMovieYears(movie.year)]
                    });
                } else {
                    quiz.push({
                        title: "Error",
                        year: "Error",
                        poster: "Error",
                        isCorrect: false,
                    });
                }
            }

            this.setCurrentQuiz(quiz);
            this.setLoading(false);
        } catch (error) {
            console.error("Error compiling quiz:", error);
            this.setLoading(false);
        }
    }

    async updateCurrentQuiz() {
        if (this.movieIdArray.length === 0) {
            await this.generateQuizArray();
        }
        const quiz = this.movieIdArray.find(quiz => !quiz.isUsed);
        quiz.isUsed = true;
        await this.compileQuiz(quiz.idArray);
        /*if (!this.firstTimeInitiated){ 
            await this.compileQuiz(quiz.idArray);
            this.firstTimeInitiated = true; 
        }
        */
    }
}

const store = new MovieQuizStore();
export default store;
