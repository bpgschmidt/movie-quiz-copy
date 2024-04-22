# Action! App description
Action! is a movie quiz app using an IMDb api from RapidAPI. The main game functionality involves shuffling 10 of the top rated, and thereby most highly regarded and well known, movies on IMDb for which the user should guess its release year among 4 alternatives, based on the title and poster. The other three alternatives are brought forth using an algorithm which generates random numbers in an interval of the correct year. Upon finishing the quiz the user’s score is presented and logged with their average over time on a scoreboard, which also saves the score of other users that have played. 

For future implementation and improvement we would like to add more game options, such as guessing the top actors in a movie, guessing the budget or guessing the movie based on the IMDb description. 

## Setup
The project is set up in the standard npm-way. In your terminal run “npm install” which should install a folder of necessary node modules. This should include react-scripts which will be used when running “npm start” to run the development server. 

# What has been done and by whom
The work was generally divided such that Filip Maras and Benjamin Schmidt handled the frontend development, including all views and corresponding presenters, while Jarl Stephansson and Emil Lidbom handled the backend, including the quizStore (model) and utility functions for fetching data, authenticating users and persisting it to firebase. Some overlap in work was done for when data needed to be passed between model and presenters and generally structure needed fine tuning, but overall this is how the work was divided.

<<<<<<< HEAD
# Product
=======
>>>>>>> 3085ade (Previously uploaded an old copy. This is the right copy of the movie quiz project)
## Front end
The UI was done using Tailwind and the DaisyUI component library for straightforward CSS usage with directly applicable class names in the divs. The frontend consists of the following; a frontpageView with an action button, dropdown navbar and login button with the user’s name next to it; a scoreboardView with the results of the player’s quizzes and navigation back to front page; an aboutView which describes the app and who’s behind it; a quitView for when the user wants to quit a quiz, asking if they are sure and where they want to navigate; a finishedView for when the quiz is finished, telling them their score and asking where to navigate; and of course a quizView for when the user is playing the quiz, with the title and poster, answer alternatives and points accumulator. Because Filip had issues with npm install that could not be fixed in time, the majority of his work was done in VS code live-share together with Benjamin, and committed with shared author commits or commits with his name mentioned in the commit title. Everything in the “schmidtmari” branch, as well as commits with his name on it, was written together with Filip. Some work was divided between them, for example Filip wrote the aboutView and initial design of the finishedView by himself, while Benjamin later fine tuned these and added improved design and animation to the latter. The quizView, frontPageView and scoreboardView were written very much in collaboration.

## Back end
<<<<<<< HEAD
We have a model, an app file, presenters for our views and an index. The routing and passing of props is not fully realized as we are seeing trouble with react. 
# Project file structure (short description/purpose of each file)
## apiSource
This one is equivalent to dishSource in the labs and is used to fetch data from the api.

## apiConfig
This one stores our host URL and API key

## resolvePromise
Returns a promise chain
## frontPageView/presenter
The React file "frontPageView.jsx" was done using Tailwind as a CSS tool. 
The frontpageView consisted of a hamburger menu to show the About page, Scoreboard page, and a link to the IMDb website.
It also consisted of a title of the app called "Action!" and a big play button that sends the user to the quiz. It acts as a home screen for the app and sends the user to the quizView.
The presenter takes props from the root and sends to the view.
## QuizView/presenter
Quizpresenter passes props to QuizView from root while making sure that the API calls aren’t done indefinitely. 
QuizView uses useStates to update the currently presented data. It takes in an array passed as props.model.currentQuiz. The quiz renders each question in turn and displays a question, for example “what year was the movie “Pulp Fiction” made?” followed by four alternatives, of which one is correct. The right alternative and three wrong alternatives are passed from the model as {year: xxxx, correct: true/false} and then handled in handleAnswerClick. 
=======
The backend of the application mainly consists of three different parts: the game model in our store, the Firebase structure comprising methods for a real-time database, Firestore, and authentication, and lastly, the code for handling API calls. For the game model in our store that is passed downwards to our presenter, many variables, including currentPoints, movieIdArrays, and loading, were used to both generate the quizzes for the users and also keep the views updated on the necessary data. Many different methods were also written to assist in this process. The Firebase structure can be found in the files UserDataService.js, persistence.js, as well as AuthService, and is integrated into the website's functionality to provide the various services Firebase can offer. Lastly, the code for our API calls is integrated into the rest of our code but also in the files apiService, as well as resolvePromise and api.js. The work was divided between Emil and Jarl, where both worked on our model in the form of our store and API calls, but Emil later focused more on the overall structure, the authentication and Firestore, while Jarl worked on the persistence. 

# Project file structure
### /.firebase
A file with assets used for hosting firebase

### /dist
This folder contains meta-data for errors and firebase configuration

### /public
This file contains meta-data and an images-folder with pictures for the interface, but we later decided, for deployment purposes, to only use external image links. 

## /src
### /config
This file contains api.js which has our host URL and API-key, as well as firebase.js which contains constants for personal persistence.

### /presenters
This file contains all the presenters used to pass props from the store down to the views.

### /services
This file contains AuthService.js, QuizDataService.js, UserDataService.js and apiService.js. These are all utility files that contain methods for handling quiz-logic, authentication, user data and API-fetching.

### /utility
This file contains persistence.js which handles firebase persistence, as well as resolvePromise.js which returns a promise chain.

### /views
This file contains all the views mentioned in the front end paragraph, as well as ApiDisplay.jsx used to test fetching of data from the API.

### App.jsx
Contains the routing of the different views and mounting of the router to a react RouterProvider.

### index.js
Contains the short bootstrapping of the app to a react root, rendering this with a react AuthProvider. 

### MovieQuizStore.js
This file is equivalent to the dinnerModel in the labs, and contains a MovieQuizStore class with attributes for the user’s current points, number of completed quizzes, current quiz index, array of movie IDs and more. Along with these are methods for setting the different attribute values and manipulating app logic relating to the quizzes and user functionality.

### index.css
Contains code for importing tailwind css and google fonts.

### .firebaserc
File used to provide the firebase server with a project name.

### firebase.json
File used by firebase hosting to tell which files should be blocked and which should be deployed.

### package.json
Contains information about the project folder including name, version, dependencies, scripts used etc.

### package-lock.json
Automatically generated file that is modified when npm creates node_modules and modifies package.json.

### tailwind.config.js
Used to configure tailwind animation.
>>>>>>> 3085ade (Previously uploaded an old copy. This is the right copy of the movie quiz project)



