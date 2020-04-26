import React, {useEffect, useState, useRef} from 'react';
import SearchInput from "./components/SearchInput";
import BoardContainer from "./components/backlog";
import {listenToBacklog, updateBacklog} from "./service/firebase";
import {getGames} from "./service/apicalypse";
import {getImageUrl} from "./utils";
import {colors} from "@atlaskit/theme";
import {BACKLOG_COLUMN_TYPE, BACKLOG_COLUMN_TYPES, PLACEHOLDER_ITEMS} from "./constants";
import LogIn from "./components/LogIn";
import useLogIn from "./hooks/useLogIn";

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import "./firebaseui-styling.global.css";

export const BacklogContext = React.createContext(() => {});
export const LogInContext = React.createContext(null);

const initialData = Object.freeze({
    [BACKLOG_COLUMN_TYPE.TO_DO]: PLACEHOLDER_ITEMS,
    [BACKLOG_COLUMN_TYPE.IN_PROGRESS]: PLACEHOLDER_ITEMS,
    [BACKLOG_COLUMN_TYPE.DONE]: PLACEHOLDER_ITEMS
});

function App() {

    const [backlogData, setBacklogData] = useState(initialData);
    const isLoggedIn = useLogIn(null);
    const initialDataLoadedRef = useRef(false);

    useEffect(() => {
        if (isLoggedIn == null) return;

        // logged out
        if (!isLoggedIn) {
            setBacklogData(initialData);
            return;
        }

        listenToBacklog().then((backlog) => {
            initialDataLoadedRef.current = true;

            if (!backlog) {
                setBacklogData({
                    [BACKLOG_COLUMN_TYPE.TO_DO]: [],
                    [BACKLOG_COLUMN_TYPE.IN_PROGRESS]: [],
                    [BACKLOG_COLUMN_TYPE.DONE]: []
                });
                return;
            }

            const allGameIds = Object.values(backlog).reduce((acc, cur) => acc.concat(Object.values(cur)), []);

            getGames(allGameIds).then((games) => {

                const gameIdToGameMap = games.reduce((acc, {id, ...rest}) => {
                    acc[id] = rest;
                    return acc;
                }, {});

                const newBacklog = BACKLOG_COLUMN_TYPES.reduce((acc, cur) => {
                    const orderToGameIdMap = backlog[cur] || {};
                    acc[cur] = Object.values(orderToGameIdMap).map((gameId) => {
                        const game = gameIdToGameMap[gameId];
                        return {
                            id: `${gameId}`,
                            ...game,
                            coverImageUrl: getImageUrl(game.cover?.image_id),
                            colors: { soft: colors.Y50, hard: colors.N400A }
                        };
                    });
                    return acc;
                }, {});

                setBacklogData(newBacklog);
            });
        });

        // TODO: detach listeners as a cleanup
    }, [isLoggedIn]);

    useEffect(() => {
        if (backlogData === initialData) {
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
            id: `${result.id}`,
            coverImageUrl: getImageUrl(result.cover?.image_id),
            colors: { soft: colors.Y50, hard: colors.N400A }
        };
        setBacklogData({ ...backlogData, [BACKLOG_COLUMN_TYPE.TO_DO]: [newEntry, ...backlogData[BACKLOG_COLUMN_TYPE.TO_DO]] })
    };

    return (
        <div className="App">
            <LogInContext.Provider value={isLoggedIn}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <SearchInput onSelect={onSearchInputResultSelect} />
                    <LogIn />
                </div>
                <BacklogContext.Provider value={setBacklogData}>
                    <BoardContainer data={backlogData} />
                </BacklogContext.Provider>
            </LogInContext.Provider>
        </div>
    );
}

export default App;
