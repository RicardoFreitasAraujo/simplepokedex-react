import {useState} from "react";
import Axios from "axios";

import logo from './logo.svg';
import './App.css';

function App() {

  const [pokemonName, setpokemonName] = useState('');
  const [pokemon, setPokemon] = useState({});
  const [pokemonChosen, setPokemonChosen ] = useState(false);

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
         .then((response) => {
           console.log(response.data);
          setPokemon({name: pokemonName, 
                      species: response.data.species.name,
                      img: response.data.sprites.front_default,
                      hp: response.data.stats[0].base_stat,
                      attack: response.data.stats[1].base_stat,
                      defense: response.data.stats[2].base_stat,
                      type: response.data.types[0].type.name
                    });
          setPokemonChosen(true);
         });
  }

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Status</h1>
        <input type="text" onChange={(event) => setpokemonName(event.target.value)  }/>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen && <div>
          Please choose a pokemon  
        </div>}
        
        {pokemonChosen &&
        
          <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img}/>
            <h3>Species: {pokemon.species}</h3> 
            <h3>Type: {pokemon.type}</h3>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4> 
            <h4>Defense: {pokemon.defense}</h4>  
          </div>
        
        }
      </div>
    </div>
  );
}

export default App;
