import React, {useState, useEffect} from 'react';
import DB from "./service";

import './App.css';

function App() {
    const [toDoItems, setToDoItems] = useState([]);

    useEffect(() => {
        DB.ref("/backlog/yjw9012/TO_DO").on("value", (snapshot) => {
            if (snapshot.val())
                setToDoItems(Object.values(snapshot.val()));
        });
    }, []);

    const addData = () => {
        DB.ref("/backlog/yjw9012/TO_DO").push(`${Math.random()}`);
    };

    return (
        <div className="App">
            <button onClick={addData}>Click to add data</button>
            <div>
                VIDEO GAME BACKLOG: {toDoItems.toString()}
            </div>
        </div>
    );
}

export default App;
