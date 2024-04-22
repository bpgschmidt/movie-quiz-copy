import React from 'react';
import { observer } from 'mobx-react';
import QuitView from '../views/quitView';


const QuizPresenter  = ({ store }) => {
    
    const onQuit = () => {
        store.quitQuiz();
    }
    
    return (
        <QuitView onQuit = {onQuit}/>
    );
};
export default observer(QuizPresenter);
