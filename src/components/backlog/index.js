import React from "react";
import Board from "./Board";

import "./index.css";

const BoardContainer = ({data}) => {
    return (
        <div style={{paddingTop: "36px"}}>
            <Board data={data} />
        </div>
    );
};

export default BoardContainer;