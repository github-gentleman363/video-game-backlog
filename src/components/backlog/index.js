import React from "react";
import Board from "./Board";
import {LogInContext} from "../../App";

import "./index.css";

const BoardContainer = ({data}) => (
    <LogInContext.Consumer>
        {(isLoggedIn) => (
            <div style={{paddingTop: "36px", opacity: isLoggedIn ? 1 : 0.5}}>
                <Board data={data} />
            </div>
        )}
    </LogInContext.Consumer>
);

export default BoardContainer;