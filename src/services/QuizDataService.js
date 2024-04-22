import { getMovieDetails, getToprated, getMostPopular } from './apiService.js';
import resolvePromise from '../utilities/resolvePromise.js';

class QuizDataService {

    // Quiz logic methods 
    // generates randomly generated years close to the correct year movie
    randomiseMovieYears(correctYear) {
        const maxYearDiff = 10;
        const minYearDiff = 1;
        const getRandomYear = (correctYear, usedYears) => {
            const currentYear = new Date().getFullYear();
            let randomYear;
            do {
                const yearDiff = Math.floor(Math.random() * (maxYearDiff - minYearDiff + 1)) + minYearDiff;
                const direction = Math.random() < 0.5 ? -1 : 1;
                randomYear = correctYear + direction * yearDiff;
            } while (randomYear === correctYear || randomYear > currentYear || usedYears.includes(randomYear));
            return randomYear;
        };
        let yearOptions = [correctYear];
        let usedYears = [correctYear];
        while (yearOptions.length < 4) {
            const randomYear = getRandomYear(correctYear, usedYears);
            yearOptions.push(randomYear);
            usedYears.push(randomYear);
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

    // Method to extract movie IDs from different data formats
    extractMovieIds(dataArray) {
        return dataArray.map(item => {
            if (typeof item === 'string') {
                // Extract from string format (e.g., "/title/tt123456/")
                const match = item.match(/tt\d+/);
                return match ? match[0] : null;
            } else if (item && typeof item === 'object' && item.id) {
                // Extract from object format (e.g., { id: "/title/tt123456/", chartRating: 9.0 })
                return item.id.split('/').find(part => part.startsWith('tt'));
            }
            return null;
        }).filter(id => id !== null);
    }

    // Method to shuffle an array, taken from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    async generateQuizArray(category, questionsPerQuiz = 2) {
        
        let rawData;

        // Decide which function to call based on the category
        if (category === 'mostPopular') {
            rawData = await getMostPopular();
        } else if (category === 'topRated') {
            rawData = await getToprated();
        } else {
            console.error("Invalid category:", category);
            return;
        }
    
    
        // Parse rawData if it's a string
        let parsedData;
        try {
            parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
        } catch (error) {
            console.error("Error parsing rawData:", error);
            return;
        }
    
        // Extract IDs from parsed data
        const idArray = this.shuffleArray(this.extractMovieIds(parsedData));
        console.log("idArray:", idArray);
    
        return idArray.reduce((acc, _, i) => {
            if (i % questionsPerQuiz === 0) acc.push(idArray.slice(i, i + questionsPerQuiz));
            return acc;
        }, []);
    }

    async compileQuiz(idArray) {
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

            return quiz;
        } catch (error) {
            console.error("Error compiling quiz:", error);
        }
    }
}

export const quizDataService = new QuizDataService();