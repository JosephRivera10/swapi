import React, { useState } from 'react'
import useFetch from 'src/Utils/customFetchHook'
import callFetch from 'src/Utils/callFetch';

interface Film {
  uid: string;
  properties: {
    title: string;
  };
}

interface FilmsResponse {
  result: Film[];
}

const Home = () => {
  const baseURL = 'https://www.swapi.tech/api/';
  const endpoints = {
    film: 'films',
    people: 'peoples',
    planet: 'planets',
    species: 'species',
    starship: 'starships',
    vehicle: 'vehicles',
  };
  const [selectedCrawl, setSelectedCrawl] = useState<any>(null);
  const [crawlLoading, setCrawLoading] = useState(false);
  const [crawlError, setCrawlError] = useState<any>(null);
  const { isLoading: filmsLoading, serverError: filmsError, apiData: filmsData } = useFetch<FilmsResponse>(`${baseURL}${endpoints.film}`);

 const handleSelectedFilm = async (id: string) => {
  setSelectedCrawl(null)
  const result = await callFetch(`${baseURL}${endpoints.film}/${id}`);
  if(result.hasOwnProperty('ERROR')) {
    setCrawlError(result.ERROR)
  } else {
    setSelectedCrawl(result.DATA)
    setCrawLoading(false);
  }
 };

 console.log('render')

  return (
    <main>
      <h1>
        Films
      </h1>
      {filmsLoading && <p>Loading....</p>}
      {filmsError && <p>Error loading films</p>}
      {filmsData && (
        <ul>
          {filmsData.result.map((film) => (
            <li
              key={film.uid}
              onClick={() => {
                setCrawLoading(true);
                handleSelectedFilm(film.uid);
              }}
            >
              {film.properties.title}
            </li>
          ))}
        </ul>
      )}
      <h2>Film Crawl</h2>
      {crawlLoading && <p>Loading....</p>}
      {crawlError && <p>Error loading crawl</p>}
      {selectedCrawl && 
          <p>
            {selectedCrawl.result.properties.opening_crawl}
          </p>
      }
    </main>
  )
}

export default Home
