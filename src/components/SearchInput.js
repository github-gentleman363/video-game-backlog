import React, {useState, useEffect} from "react";
import {Search, Image, Icon, Loader} from 'semantic-ui-react';
import {searchGames} from "../service/igdb";
import useDebounce from "../hooks/useDebounce";
import {getImageUrl} from "../utils";
import {LogInContext} from "../App";

const SearchResultEntry = ({name, cover}) => (
    <div>
        {
            cover?.image_id &&
            <Image src={getImageUrl(cover.image_id)} rounded inline style={{width: "35px", height: "35px", float: "none", marginRight: "12px"}} />
        }
        <span>{name}</span>
        <Icon name="add circle" size="big" style={{float: "right"}} />
    </div>
);

const initialState = { isLoading: false, results: [], value: '' };

const SearchInput = ({onSelect}) => {
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
                    setResults(games);
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

        onSelect(result);
    };

    const handleSearchChange = (e, { value }) => setValue(value);

    return (
        <LogInContext.Consumer>
            {(isLoggedIn) => (
                <Search
                    loading={isLoading}
                    onResultSelect={handleResultSelect}
                    onSearchChange={handleSearchChange}
                    resultRenderer={SearchResultEntry}
                    results={results}
                    value={value}
                    input={{ fluid: true }}
                    noResultsMessage={<Loader active inline />}
                    placeholder="type at least 3 characters to search"
                    style={{width: `calc(100% - ${isLoggedIn == null || isLoggedIn ? 60 : 210}px)`}}
                    fluid
                    disabled={!isLoggedIn}
                />
            )}
        </LogInContext.Consumer>
    );
};

export default SearchInput;