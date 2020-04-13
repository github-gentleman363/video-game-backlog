import React, {useState, useEffect} from "react";
import DB from "../../service/firebase";
import Board from "./Board";
import { authorQuoteMap } from './data';

import "./index.css";

const BoardContainer = () => {
    const [toDoItems, setToDoItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        DB.ref("/backlog/yjw9012/TO_DO").on("value", (snapshot) => {
            if (snapshot.val()) {
                setToDoItems(Object.values(snapshot.val()));
            }
            setIsLoading(false);
        });
        // TODO: clean up
    }, []);

    return (
        <div style={{paddingTop: "36px"}}>
            <Board initial={authorQuoteMap} />
        </div>
    );
};

export default BoardContainer;