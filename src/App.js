import React, {useEffect, useState, useRef} from 'react';
import SearchInput from "./components/SearchInput";
import BoardContainer from "./components/backlog";
import {listenToBacklog, updateBacklog} from "./service/firebase";
import {getGames} from "./service/apicalypse";
import {getImageUrl} from "./utils";
import {colors} from "@atlaskit/theme";
import {BACKLOG_COLUMN_TYPE, PLACEHOLDER_ITEMS_NUM} from "./constants";

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const initialData = Object.freeze({
    [BACKLOG_COLUMN_TYPE.TO_DO]: Array(PLACEHOLDER_ITEMS_NUM).fill({ isPlaceholder: true }),
    [BACKLOG_COLUMN_TYPE.IN_PROGRESS]: Array(PLACEHOLDER_ITEMS_NUM).fill({ isPlaceholder: true }),
    [BACKLOG_COLUMN_TYPE.DONE]: Array(PLACEHOLDER_ITEMS_NUM).fill({ isPlaceholder: true })
});

function App() {

    const [backlogData, setBacklogData] = useState(initialData);
    const initialRunRef = useRef(true);
    const initialDataLoadedRef = useRef(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        listenToBacklog().then((backlog) => {
            initialDataLoadedRef.current = true;

            if (!backlog) {
                setIsLoading(false);
                return;
            }

            const orderToGameIdMap = backlog[BACKLOG_COLUMN_TYPE.TO_DO];

            if (!orderToGameIdMap) {
                setIsLoading(false);
                return;
            }

            getGames(Object.values(orderToGameIdMap)).then((games) => {

                const gameIdToGameMap = games.reduce((acc, {id, ...rest}, idx) => {
                    acc[id] = rest;
                    return acc;
                }, {});

                const columnData = Object.values(orderToGameIdMap).map((gameId) => {
                    const game = gameIdToGameMap[gameId];
                    return {
                        id: gameId,
                        ...game,
                        coverImageUrl: getImageUrl(game.cover?.image_id),
                        colors: { soft: colors.Y50, hard: colors.N400A }
                    };
                });

                setBacklogData({
                    [BACKLOG_COLUMN_TYPE.TO_DO]: columnData,
                    [BACKLOG_COLUMN_TYPE.IN_PROGRESS]: [],
                    [BACKLOG_COLUMN_TYPE.DONE]: []
                });
                setIsLoading(false);
            });
        });

        // TODO: detach listeners as a cleanup
    }, []);

    useEffect(() => {
        if (initialRunRef.current) {
            initialRunRef.current = false;
            return;
        }
        
        if (initialDataLoadedRef.current) {
            initialDataLoadedRef.current = false;
            return;
        }

        const reduce = (arr) => arr.reduce((acc, {id}, idx) => {
            acc[idx] = id;
            return acc;
        }, {});

        console.log("update backlog request")

        const newBacklog = {
            [BACKLOG_COLUMN_TYPE.TO_DO]: reduce(backlogData[BACKLOG_COLUMN_TYPE.TO_DO]),
            [BACKLOG_COLUMN_TYPE.IN_PROGRESS]: reduce(backlogData[BACKLOG_COLUMN_TYPE.IN_PROGRESS]),
            [BACKLOG_COLUMN_TYPE.DONE]: reduce(backlogData[BACKLOG_COLUMN_TYPE.DONE]),
        };

        console.log(newBacklog)

        // TODO: handle error
        updateBacklog(newBacklog);

        }, [backlogData]);

    const onSearchInputResultSelect = (result) => {
        const newEntry = {
            ...result,
            coverImageUrl: getImageUrl(result.cover?.image_id),
            colors: { soft: colors.Y50, hard: colors.N400A }
        };
        setBacklogData({ ...backlogData, [BACKLOG_COLUMN_TYPE.TO_DO]: [newEntry, ...backlogData[BACKLOG_COLUMN_TYPE.TO_DO]] })
    };

    return (
        <div className="App">
            <SearchInput onSelect={onSearchInputResultSelect} />
            <BoardContainer data={backlogData} />
        </div>
    );
}

export default App;
