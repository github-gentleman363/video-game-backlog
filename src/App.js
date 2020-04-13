import React from 'react';
import SearchInput from "./components/SearchInput";
import BoardContainer from "./components/backlog";

import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <div className="App">
            <SearchInput />
            <BoardContainer />
        </div>
    );
}

export default App;
