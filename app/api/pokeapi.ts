import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import client from "./client";

export type Pokemon = {
    id: number;
    name: string;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            }
        }
    };
    types: Type[];
};

export type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    }
};

export type TypeRecord = {
    name: string;
    url: string;
    id: number;
    pokemon: {
        pokemon: {
            name: string;
            url: string;
        }
    }[]
}

type Filter = { page: number; term?: string; type?: string };

export const fetchPokemons = async ({ queryKey }: UseQueryOptions<Pokemon[]>) => {
    const [, param] = queryKey as [string, Filter];

    if (param.type) {
        // NOTE: since there is no filter by type in the API, we need to fetch the type data first
        let typeData = await getType(param.type);
        console.log('typeData', typeData);
        if (param.term) {
            typeData = typeData.pokemon.find((pokemon: { pokemon: { name: string; url: string; } }) => pokemon.pokemon.name === param.term);
            console.log('typeData term', typeData);
            
            if (!typeData) return [];

            return [typeData.pokemon];
        }

        if (typeData?.pokemon && Array.isArray(typeData.pokemon)) {
            const start = param.page ? (param.page - 1) * 12 : 0;
            const end = start + 12;
            const pokemons = typeData.pokemon.slice(start, end).map((pokemon: { pokemon: { name: string; url: string; } }) => {
                return {
                    name: pokemon.pokemon.name,
                    url: pokemon.pokemon.url
                }
            });
            console.log('pokemons', pokemons);
            return pokemons;
        }
    }

    if (param.term) {
        const result = await getPokemon(param.term);

        return [result];
    }

    return getPokemons(Number(param.page))
}

export const fetchPokemon = async ({ queryKey }: UseQueryOptions<Pokemon[]>) => {
    const [, param] = queryKey as  string[]

    return getPokemon(param);
}

export async function getPokemons(offset: number = 0): Promise<Pokemon[]> {
    const { data } = await client.get('/pokemon', {
        params: {
            limit: 12,
            offset: (offset - 1) * 12,
        }
    });

    return data.results;
}

export async function getPokemon(name: string): Promise<Pokemon> {
    const { data } = await client.get(`/pokemon/${name}`);

    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        types: data.types,
    };
}

export async function getTypes() {
    const { data } = await client.get('/type');

    return data.results;
}

export async function getType(name: string) {
    const { data } = await client.get(`/type/${name}`);

    return data;
}

export async function fetchTypes({ queryKey }: UseQueryOptions<Type[]>) {
    const [, param] = queryKey as [string, Filter];

    if (param.term) {
        const result = await getType(param.term);

        return [result];
    }

    return getTypes();
}

export async function fetchType({ queryKey }: UseQueryOptions<Type[]>) {
    const [, param] = queryKey as  string[]
 
    return getType(param);
}

export const useGetTypes = (filter: Omit<Filter, 'page'> = {}) => {
    return useQuery({
        queryKey: ["types", filter],
        queryFn: fetchTypes
    });
}

export const useGetType = (name: string) => {
    return useQuery({
        queryKey: ["types", name],
        queryFn: fetchType
    });
}

export const useGetPokemon = (nameOrId: string) => {
    return useQuery({
        queryKey: ["pokemons", nameOrId],
        queryFn: fetchPokemon
    });
}