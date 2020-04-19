import React, {useState, useEffect} from "react";
import Board from "./Board";
import {listenToBacklog} from "../../service/firebase";
import {getGames} from "../../service/apicalypse";
import {getImageUrl} from "../../utils";
import {BACKLOG_COLUMN_TYPE} from "../../constants";
import {colors} from "@atlaskit/theme";

import "./index.css";

const initialData = Object.freeze({ [BACKLOG_COLUMN_TYPE.TO_DO]: [], [BACKLOG_COLUMN_TYPE.IN_PROGRESS]: [], [BACKLOG_COLUMN_TYPE.DONE]: [] });

const BoardContainer = () => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        listenToBacklog(undefined, (gameIdToSlugMap) => {
            getGames(Object.keys(gameIdToSlugMap)).then((games) => {

                console.log(games)

                const columnData = games.map((game) => ({
                    ...game,
                    coverImageUrl: getImageUrl(game.cover?.image_id),
                    colors: { soft: colors.Y50, hard: colors.N400A }
                }));

                setData({ ...data, [BACKLOG_COLUMN_TYPE.TO_DO]: columnData });
            });
        });

        // TODO: detach listeners as a cleanup
    }, []);

    return (
        <div style={{paddingTop: "36px"}}>
            <Board data={data} />
        </div>
    );
};

export default BoardContainer;