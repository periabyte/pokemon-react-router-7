import PokemonCard from "~/components/PokemonCard";
import type { Route } from "./+types/$id";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchPokemon, useGetPokemon } from "~/api/pokeapi";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Pagination from "~/components/Pagination";


export async function loader({ params } : Route.LoaderArgs) {
    const qc = new QueryClient()

    await qc.prefetchQuery({
        queryKey: ["pokemons", params.id],
        queryFn: fetchPokemon
    });

    return dehydrate(qc);
}

export default function Pokemon({ params }: Route.ComponentProps) {
    const navigate = useNavigate();
    const { data } = useGetPokemon(params.id);

    return (
        <div className="flex flex-col gap-4">
            <PokemonCard name={params.id} />
            <Pagination
                disablePrev={data?.id === 1}
                onPrev={() => {
                    if (!data || data.id === 1) return;

                    navigate(`/pokedex/${data?.id - 1}`)
                }}
                onNext={() => {
                    if (!data) return;

                    navigate(`/pokedex/${data?.id + 1}`)
                }}
            />
        </div>
    );
}