import React from 'react';
import { observer } from 'mobx-react';
import { createHashRouter, RouterProvider } from "react-router-dom";
import FrontPagePresenter from './presenters/frontPagePresenter';
import AboutView from "./views/aboutView";
import ScoreboardPresenter from "./presenters/scoreboardPresenter";
import QuizPresenter from "./presenters/quizPresenter";
import FinishedPresenter from './presenters/finishedPresenter';
import QuitPresenter from './presenters/quitPresenter';
import store from './MovieQuizStore';

function makeRouter(store) {
  return createHashRouter([
    {
      path: '/',
      element: <FrontPagePresenter store={store} />,
    },
    {
      path: '/about',
      element: <AboutView />,
    },
    {
      path: '/scoreboard',
      element: <ScoreboardPresenter store={store} />,
    },
    {
      path: '/quiz',
      element: <QuizPresenter store={store} />,
    },
    {
      path: '/finished',
      element: <FinishedPresenter store={store} />,
    },
    {
      path: '/quit',
      element: <QuitPresenter store={store}/>
    }
  ]);
}

function App() {
  const router = makeRouter(store);

  return (
    <main className="flex flex-col">
      <RouterProvider router={router} />
    </main>
  );
}

export default observer(App);
