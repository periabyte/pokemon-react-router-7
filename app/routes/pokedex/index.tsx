import { Link, useSearchParams, type LoaderFunctionArgs } from "react-router";
import { fetchPokemon, fetchPokemons, fetchType, fetchTypes, getPokemon, getPokemons, useGetTypes, type Pokemon, type Type, type TypeRecord } from "~/api/pokeapi";
import type { Route } from "./+types";
import { dehydrate, QueryClient, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import PokemonCard from "~/components/PokemonCard";
import Pagination from "~/components/Pagination";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import TypeTag from "~/components/TypeTag";



export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const pageParam = Number(url.searchParams.get("page")) || 1;
    const type = url.searchParams.get("type") || undefined;
    const term = url.searchParams.get("term") || undefined;
    const qc = new QueryClient()

    const pokemonParams = {
        page: pageParam,
        term,
        type,
    }

    await qc.prefetchQuery({
        queryKey: ["types", {}],
        queryFn: fetchTypes
    });

    const types = qc.getQueryData(["types", {}]);

    if (types && Array.isArray(types)) {
        const promises = types.map(async (type: { name: string }) => {
            return qc.prefetchQuery({
                queryKey: ["types", type.name],
                queryFn: fetchType
            })
        });

        await Promise.all(promises);
    }

    await qc.prefetchQuery({
        queryKey: ["pokemons", pokemonParams],
        queryFn: fetchPokemons
    })

    const pokemons = qc.getQueryData(["pokemons", pokemonParams])

    if (pokemons && Array.isArray(pokemons)) {
        const promises = pokemons.map(async (pokemon: Pokemon) => {
            return qc.prefetchQuery({
                queryKey: ["pokemons", pokemon.name],
                queryFn: fetchPokemon
            })
        });

        await Promise.all(promises);
    }
    

    return dehydrate(qc)
}

export function shouldRevalidate() {
    return false;
}

export default function Pokedex() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [term, setTerm] = useState(searchParams.get("term") ?? "");
    const debouncedTerm = useDebounce(term, 500);

    const updateSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams);
        if (!searchTerm.length) {
            params.delete("term");
            params.delete("page");
            setSearchParams(params);
            return;
        }

        params.set("page", "1");
        params.set("term", searchTerm.toLowerCase());
        setSearchParams(params);
    }

    const queryParams = useMemo(() => ({
        page: Number(searchParams.get("page") ?? 1),
        type: searchParams.get("type") ?? undefined,
        term: searchParams.get("term") ?? undefined
    }), [searchParams]);

    console.log(searchParams, JSON.stringify(queryParams));

    useEffect(() => {
        updateSearch(debouncedTerm)
    }, [debouncedTerm]);

    const onSelectType = (type: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("type", type);
        setSearchParams(params);
    }

    const { data } = useQuery<Pokemon[]>({
        queryKey: ["pokemons", queryParams],
        queryFn: fetchPokemons
    });

    const { data: types } = useGetTypes();

    return (
        <>
            <div className="flex flex-row gap-4">
                <input
                    type="text" 
                    placeholder="Search" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg w-full"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 border border-gray-300 rounded-lg">
                        Types
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="px-4 py-2">Types</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="grid grid-cols-3 gap-4">
                            {types?.map((type: { name: string }) => (
                                <DropdownMenuItem
                                    key={type.name}
                                    className={`${searchParams.has('type', type.name) ? `bg-primary` : ''}`}
                                    onClick={() => onSelectType(type.name)}
                                >
                                    <TypeTag name={type.name} />
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {data?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((pokemon) => (
                        <Link key={`poke-${pokemon.name}`} to={`/pokedex/${pokemon.name}`}>
                            <PokemonCard name={pokemon.name} />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-2xl">No results found</p>
                    <p>Try searching for a full name or pokemon number</p>
                    <p className="text-destructive">PokeApi currently doesn't support partial names.</p>
                </div>
            )}

            <Pagination
                onNext={
                    () => {
                        const params = new URLSearchParams(searchParams);
                        const currentPage = Number(searchParams.get("page")) || 1;
                        params.set("page", (currentPage + 1).toString());
                        setSearchParams(params);
                    }
                }
                disableNext={(data?.length ?? 0) < 12}
                onPrev={
                    () => {
                        const params = new URLSearchParams(searchParams);
                        const currentPage = Number(searchParams.get("page")) || 1;
                        params.set("page", (currentPage - 1).toString());
                        setSearchParams(params);
                    }
                }
                disablePrev={Number(searchParams.get("page")) <= 1}
            />
        </>
    );
}