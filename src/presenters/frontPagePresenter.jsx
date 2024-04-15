import store from "../MovieQuizStore";
import { observer } from "mobx-react";
import FrontPageView from "../views/frontPageView";
import React from "react";

const FrontPagePresenter = observer(() => {
    if (store.loading) {
        return <div className='flex flex-col items-center justify-center relative w-screen min-h'>
                    <div className="loading loading-spinner loading-lg w-48 h-48 mt-48">Loading front page...</div>
                </div>;
    }

    const onLogOut= async () => {
        await store.signOut();
    };

    const onLogIn= async () => {
        await store.signInWithGoogle();
    };

    const setLoading = (bool) => {
        store.setLoading(bool);
    }

    const update = async () =>{
        await store.updateCurrentQuiz();
    }

    return (
        <FrontPageView
            onLogIn={onLogIn}
            onLogOut={onLogOut}
            setLoading={setLoading}
            update={update}
        />
    );
});

export default FrontPagePresenter;