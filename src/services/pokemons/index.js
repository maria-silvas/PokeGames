import { api } from "../../api/pokemon";

const getPokemon = async () => {
    const response = await api.pokeApi.get(`/pokemon`);
    return response.data;
}

const getPokemonById = async (id) => {
    const response = await api.pokeApi.get(`/pokemon/${id}`);
    return response.data;
}

export const pokemonService = {
    getPokemon,
    getPokemonById
}