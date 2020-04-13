import React, {useState, useEffect} from "react";
import { Search } from 'semantic-ui-react';
import search from "../service/apicalypse";
import useDebounce from "../hooks/useDebounce";
import DB from "../service/firebase";

const initialState = { isLoading: false, results: [], value: '' };

const SearchInput = () => {
    const [value, setValue] = useState(initialState.value);
    const [results, setResults] = useState(initialState.results);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);
    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(
        () => {
            // Make sure we have a value (user has entered something in input)
            if (debouncedSearchTerm?.trim?.()) {
                setIsLoading(true);
                search(debouncedSearchTerm.trim()).then(results => {
                    setIsLoading(false);
                    setResults(results.map(({slug, name, summary, total_rating}) => ({
                        id: slug, title: name, description: summary, price: `${total_rating}`
                    })));
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

        DB.ref("/backlog/yjw9012/TO_DO").push(result.title);
    };

    const handleSearchChange = (e, { value }) => setValue(value);

    return (
        <Search
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
            input={{ fluid: true }}
            fluid       // have its results take up the width of its container.
            showNoResults
        />
    );
};

export default SearchInput;