import React, {useState, useEffect} from "react";
import Board from "./Board";
import { authorQuoteMap } from './data';
import {listenToBacklog} from "../../service/firebase";
import {getGames} from "../../service/apicalypse";

import "./index.css";
import {getImageUrl} from "../../utils";

const BoardContainer = () => {
    const [data, setData] = useState(authorQuoteMap);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        listenToBacklog(undefined, (gameIdToSlugMap) => {
            getGames(Object.keys(gameIdToSlugMap)).then((games) => {
                const columnData = games.map(({ id, slug, name, total_rating, cover = {} }) => {
                    return {
                        id: total_rating ? Math.round(total_rating) : null,
                        content: name,
                        author: {
                            id: 2020,
                            name: "PS4",
                            avatarUrl: getImageUrl(cover.image_id),
                            "colors": {
                                "soft": "#FFFAE6",
                                "hard": "rgba(9, 30, 66, 0.71)"
                            }
                        }
                    };
                });

                setData({ ...data, "TO DO": columnData });
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