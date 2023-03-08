import { useEffect, useState } from 'react';
import classes from '../styles/Content.module.css'
import Card from './Card';

function Content() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setPokemonList([]);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonPromises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );
        Promise.all(pokemonPromises).then((pokemonData) => {
          pokemonData.forEach((pokemon) => {
            pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
          });
          setPokemonList((prevState) => [...prevState, ...pokemonData]);
          setIsLoading(false);
        });
      });
  }, [offset]);

  const handlePrevClick = () => {
    if (offset - 24 >= 0) {
      setOffset(offset - 24);
    }
  };

  const handleNextClick = () => {
    setOffset(offset + 24);
  };

  return (
    <div className={classes.main}>
        <div className={classes.content}>
        {isLoading ? (
            <p className={classes.loading}>Loading...</p>
        ) : (
            pokemonList.map((pokemon, index) => (
            <Card
                key={index}
                id={pokemon.id}
                name={pokemon.name}
                photo={pokemon.sprites.front_default}
                types={pokemon.types}
            />
            ))
        )}
        </div>
        <div className={classes.buttons}>
            <button
                className={classes.button}
                onClick={handlePrevClick}
                disabled={offset === 0}
            >
                Prev
            </button>
            <button className={classes.button} onClick={handleNextClick}>
                Next
            </button>
        </div>
    </div>
  );
}

export default Content;
