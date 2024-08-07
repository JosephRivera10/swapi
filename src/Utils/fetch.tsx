import React, { useEffect, useState } from "react";

const useFetch = <T,>(url: string ) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState<T | null>(null);
    const [serverError, setServerError]: any = useState<any>(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const response = await fetch(url, {
                    method: 'GET',
                    headers: myHeaders,
                  });
                const data: T = await response.json();
                setApiData(data);
                setIsLoading(false);
            } catch (error) {
                console.log('error', error);
                setServerError(error);
            }
        }
        fetchData();
    }, [url])

  return {
    isLoading,
    apiData,
    serverError,
  }
};

export default useFetch
