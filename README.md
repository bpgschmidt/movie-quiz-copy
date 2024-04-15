# Short description of your project

This is a movie quiz with data taken from an imdb api from RapidAPI. 
The idea is to let the player shuffle ten movies from the API, and for each movie name and poster guess the year that it was made among 4 alternatives. The other three alternatives are brought forward using a self made random number generator. If there is time, we would like to implement the ability for more play-styles, such as guessing top actors, director, and movie title. 

# Product
## Front end
The UI is done using Tailwind for straightforward CSS usage with directly adaptable class names in the divs. We have finished a frontPage view with a dropdown navbar for about-view, scoreboard-view and hyperlink to imdb. We have an about-view finished that describes the app and a quizView which is nearly finished. We have started a scoreboard view which is dependent on the score from the model. 
## Back end
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

### AboutView
This is just text describing the app and who is behind it, with a button to navigate back to front page. 🙂
## model
The model was made in similar spirit as the dinnerModel from the labs, with various functionality relating to fetching data and updating quiz-options. 
## App
The App.jsx is practically an equivalent to the Root in the labs, and a react app convention where we route the components and connect the props between model-presenter
## index
Here we just render our app with our model passed as prop-view. 


