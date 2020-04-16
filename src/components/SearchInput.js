import React, {useState, useEffect} from "react";
import {Search, Image, Icon} from 'semantic-ui-react';
import {searchGames} from "../service/apicalypse";
import useDebounce from "../hooks/useDebounce";
import {updateBacklog} from "../service/firebase";
import {getImageUrl} from "../utils";
import {BACKLOG_COLUMN_TYPE} from "../constants";

const SearchResultEntry = ({title, imgUrl}) => (
    <div>
        {
            imgUrl &&
            <Image src={imgUrl} rounded inline style={{width: "35px", height: "35px", float: "none", marginRight: "12px"}} />
        }
        <span>{title}</span>
        <Icon name="add circle" size="big" style={{float: "right"}} />
    </div>
);

const initialState = { isLoading: false, results: [], value: '' };

const SearchInput = () => {
    const [value, setValue] = useState(initialState.value);
    const [results, setResults] = useState(initialState.results);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);
    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(
        () => {
            // match IGDB website behavior
            if (debouncedSearchTerm?.trim?.()?.length >= 3) {
                setIsLoading(true);
                searchGames(debouncedSearchTerm.trim()).then(games => {
                    setIsLoading(false);

                    const results = games.map(({id, slug, name, summary, total_rating, cover}) => ({
                        id, slug, title: name, description: summary, price: total_rating != null ? `${Math.round(total_rating)}` : "",
                        imgUrl: cover?.image_id ? getImageUrl(cover.image_id) : null
                    }));
                    setResults(results);
                });
            } else {
                setResults(initialState.results);
            }
        },
        [debouncedSearchTerm]
    );

    const handleResultSelect = (e, { result }) => {
        setValue(initialState.value);
        setResults(initialState.results);
        setIsLoading(initialState.isLoading);

        updateBacklog(BACKLOG_COLUMN_TYPE.TO_DO, result.id, result.slug);
    };

    const handleSearchChange = (e, { value }) => setValue(value);

    return (
        <Search
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            resultRenderer={SearchResultEntry}
            results={results}
            value={value}
            input={{ fluid: true }}
            fluid       // have its results take up the width of its container.
            showNoResults
            placeholder="type at least 3 characters to search"
        />
    );
};

export default SearchInput;