const callFetch = async (url: string) => {
    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(url, {
            method: 'GET',
            headers: myHeaders,
          });
        const data = await response.json();
        return {DATA: data}
    } catch(error) {
        return {ERROR: error}
    }
}

export default callFetch;