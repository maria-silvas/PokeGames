import { useQuery } from "react-query";
import { fetchErrorDecorator } from "../../../utils/errors/fetchErrorDecorator/index";
import { pokemonService } from '../../../services/pokemons/index';

const usePokemons = (id, params, config ={}) => {
    return useQuery(
        ['pokemon', id],
        fetchErrorDecorator(async () => {
            if(id) {
                return await pokemonService.getPokemonById(id);
            }

            return pokemonService.getPokemon(params);
        }),
        {
            ...config,
            refetchOnWindowFocus: true,
        }
    );
};

export default usePokemons;