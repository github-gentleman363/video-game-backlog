import React, {useState, useEffect} from "react";
import { Search } from 'semantic-ui-react';
import _ from "lodash";

const initialState = { isLoading: false, results: [], value: '' };

const data = [
    {
        "title": "Renner - McKenzie",
        "description": "Fundamental next generation moderator",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/vitorleal/128.jpg",
        "price": "$74.15"
    },
    {
        "title": "Daugherty - Kuhlman",
        "description": "Open-source 6th generation ability",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/longlivemyword/128.jpg",
        "price": "$37.16"
    },
    {
        "title": "Ritchie - Weissnat",
        "description": "Profound bifurcated encryption",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/marklamb/128.jpg",
        "price": "$91.27"
    },
    {
        "title": "Botsford - Reilly",
        "description": "Cloned client-server task-force",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/amanruzaini/128.jpg",
        "price": "$65.39"
    },
    {
        "title": "Adams - Denesik",
        "description": "Extended secondary knowledge user",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg",
        "price": "$58.98"
    }
];

const SearchInput = () => {
    const [value, setValue] = useState(initialState.value);
    const [results, setResults] = useState(initialState.results);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);

    const handleResultSelect = (e, { result }) => setValue(initialState.value);

    const handleSearchChange = (e, { value }) => {
        setIsLoading(true);
        setValue(value);

        setTimeout(() => {
            if (value.length < 1) {
                setValue(initialState.value);
                setResults(initialState.results);
                setIsLoading(initialState.isLoading);
                return;
            }

            const re = new RegExp(_.escapeRegExp(value), 'i');
            const isMatch = (result) => re.test(result.title);

            setResults(_.filter(data, isMatch));
            setIsLoading(false);
        }, 300)
    };

    return (
        <Search
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true,
            })}
            results={results}
            value={value}
            input={{ fluid: true }}
            fluid       // have its results take up the width of its container.
        />
    );
};

export default SearchInput;