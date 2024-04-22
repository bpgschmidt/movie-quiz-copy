import React from "react";
import { observer } from "mobx-react";
import FrontPageView from "../views/frontPageView";

const FrontPagePresenter = ({ store }) => {
    if (store.loading) {
        return <div className='overflow-hidden bg-gradient-to-b bg-gradient-to-b bg-gradient-to-b from-blue-950 to-indigo-700 to-80% h-screen flex flex-col items-center justify-center relative w-screen min-h'>
                    <div className="loading loading-spinner loading-lg w-48 h-48 mt-48">Loading front page...</div>
                </div>;
    }

    const onLogOut = async () => {
        await store.signOut();
    };

    const onLogIn = async () => {
        await store.signInWithGoogle();
    };

    const setLoading = (bool) => {
        store.setLoading(bool);
    }

    const update = async () =>{
        await store.updateCurrentQuiz("topRated");
    }

    return (
        <FrontPageView
            onLogIn={onLogIn}
            onLogOut={onLogOut}
            setLoading={setLoading}
            update={update}
            currentUser={store.currentUser}
        />
    );
};

export default observer(FrontPagePresenter);
