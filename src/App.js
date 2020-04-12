import React, {useState, useEffect} from 'react';
import DB from "./service";
import SearchInput from "./components/SearchInput";

import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
    const [toDoItems, setToDoItems] = useState([]);

    // useEffect(() => {
    //     DB.ref("/backlog/yjw9012/TO_DO").on("value", (snapshot) => {
    //         if (snapshot.val())
    //             setToDoItems(Object.values(snapshot.val()));
    //     });
    // }, []);

    const addData = () => {
        DB.ref("/backlog/yjw9012/TO_DO").push(`${Math.random()}`);
    };

    return (
        <div className="App">
            <SearchInput />
        </div>
    );
}

export default App;
