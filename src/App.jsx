import React from 'react';
import FrontPageView from "./views/frontPageView";
import AboutView from "./views/aboutView";
import ScoreboardPresenter from "./presenters/scoreboardPresenter";
import QuizPresenter from "./presenters/quizPresenter";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./views/authView";
import store from './MovieQuizStore'; 
import FrontPagePresenter from './presenters/frontPagePresenter';

function makeRouter() {
  return createHashRouter([
    {
      path: '/',
      element: <FrontPagePresenter />,
    },
    {
      path: '/about',
      element: <AboutView />,
    },
    {
      path: '/scoreboard',
      element: <ScoreboardPresenter />,
    },
    {
      path: '/quiz',
      element: <QuizPresenter />
    },
    {
      path: '/auth',
      element: <Auth />
    }
  ]);
}

function App() {
  const router = makeRouter();

  return (
    <main className="flex flex-col">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
