import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api';

const useFetch = (url) => {

    const [ loading, setLoading ] = useState(null);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {

        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url)
        .then((response) => {
            setLoading(null);
            setData(response);
        })
        .catch((error) => {
            setLoading(null);
            setError("Something went wrong!");
        })
    }, [url]);

    return { data, loading, error }
}

export default useFetch