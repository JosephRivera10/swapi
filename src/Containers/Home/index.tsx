import React, { useEffect, useState } from 'react'
import useFetch from 'src/Utils/fetch'

interface Film {
  uid: string;
  properties: {
    title: string;
  };
}

interface FilmsResponse {
  result: Film[];
}

interface FilmDetail {
  result: {
    properties: {
      title: string;
      description: string;
      opening_crawl: string;
    };
  };
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
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);
  const [filmOptions, setFilmOptions] = useState<{ id: string, title: string }[]>([]);

  const { isLoading: filmsLoading, serverError: filmsError, apiData: filmsData } = useFetch<FilmsResponse>(`${baseURL}${endpoints.film}`);
  const { isLoading: filmLoading, serverError: filmError, apiData: filmData } = useFetch<FilmDetail>(selectedFilmId ? `${baseURL}${endpoints.film}/${selectedFilmId}` : '');

  console.log('filmsLoading', filmsLoading);
  console.log('filmsError', filmsError);
  console.log('filmsData', filmsData);
  useEffect(() => {
    if (filmsData && filmsData.result) {
      const options = filmsData.result.map((film: Film) => ({
        id: film.uid,
        title: film.properties.title,
      }));
      setFilmOptions(options);
    }
  }, [filmsData]);

  console.log('filmoptions', filmOptions)
 const handleSelectedFilm = (id: string) => {
  setSelectedFilmId(id)
 };

 console.log('filmData', filmData);

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
              onClick={() => handleSelectedFilm(film.uid)}
            >
              {film.properties.title}
            </li>
          ))}
        </ul>
      )}
      <h2>Film Crawl</h2>
      <p>
        {filmData?.result.properties.opening_crawl}
      </p>
    </main>
  )
}

export default Home
