import React from "react";
import Board from "./Board";

import "./index.css";

const BoardContainer = ({data}) => {
    if (!data)  return null;
    return (
        <div style={{paddingTop: "36px"}}>
            <Board data={data} />
        </div>
    );
};

export default BoardContainer;