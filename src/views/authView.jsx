import { useState } from "react";
import store from '../MovieQuizStore'; // Import the store

export const Auth = () => {

    const signInWithGoogle = async () => {
        await store.signInWithGoogle();
    };

    const logout = async () => {
        await store.signOut();
    };

    function returnToHomeScreen() {
        window.location.hash = "#/";
    }

    return (
        <div>
            <button className={"btn"} onClick={signInWithGoogle}> Sign In With Google</button>
            <button className={"btn"} onClick={logout}> Logout </button>
            <button className="btn" onClick={returnToHomeScreen}>Return to Homescreen</button>
        </div>
    );
};
