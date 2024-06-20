import { api } from "../../api/pokemon";

const getTypePokemon = async (type) => {
    const response = await api.pokeApi.get(`/type/${type}`);
    return response.data;
}

export const typePokemonService = {
    getTypePokemon
}