import { useState, useEffect } from 'react';
import {FIREBASE_AUTH} from "../service/firebase";

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export default function useLogIn(value) {
    // State and setters for debounced value
    const [isLoggedIn, setIsLoggedIn] = useState(value);

    useEffect(() => {
        const unregisterAuthObserver = FIREBASE_AUTH.onAuthStateChanged(
            (user) => setIsLoggedIn(!!user)
        );

        return () => {
            unregisterAuthObserver();
        };
    }, []);

    return isLoggedIn;
}

