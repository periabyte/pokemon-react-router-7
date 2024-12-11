import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Outlet, useMatch } from "react-router";
import { useGetPokemon } from "~/api/pokeapi";

export default function PokedexLayout() {
    const pokemonId = useMatch('/pokedex/:id');
    const { data } = useGetPokemon(pokemonId?.params.id ?? '');

    return (
        <div className="pokedex flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Link to='/pokedex'>
                    <h1 className="text-2xl">Pokedex</h1>
                </Link>
                {data && pokemonId && (
                    <>
                        <ChevronRight size={24} />
                        <h2 className="text-2xl capitalize">{data?.name}</h2>
                    </>
                )}
            </div>
            <Outlet />
        </div>
    );
}