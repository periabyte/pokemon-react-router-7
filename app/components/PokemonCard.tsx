import { useGetPokemon } from "~/api/pokeapi";
import { Skeleton } from "./ui/skeleton";
import TypeTag from "./TypeTag";

export default function PokemonCard({ name }: { name: string }) {
    const { data, isPending } = useGetPokemon(name);

    if (!data || isPending) {
        return (
            <div className="border border-gray-300 p-4 rounded-lg flex flex-col gap-4">
                <Skeleton className="min-w-[475px] min-h-[475px]  sm:min-w-[200px] sm:min-h-[200px] xl:min-w-[266px] xl:min-h-[266px] 2xl:min-w-[330px] 2xl:min-h-[330px] mx-auto" />
                <Skeleton className="w-full h-6 mt-2" />
                <Skeleton className="w-full h-5 mt-2" />
            </div>
        );
    }

    return (
        <div key={data.id} className="flex flex-col border border-gray-300 p-4 rounded-lg gap-4">
            <div className={`mx-auto bg-${data.types[0].type.name} w-fit min-w-[475px] min-h-[475px]  sm:min-w-[200px] sm:min-h-[200px]  xl:min-w-[266px] xl:min-h-[266px] 2xl:min-w-[330px] 2xl:min-h-[330px]`}>
                <img src={data.sprites.other['official-artwork'].front_default} alt={data.name}  />
            </div>
            <h2 className="text-center capitalize font-bold text-xl">{data.name}</h2>
            <div className="flex justify-center gap-2 min-h-5">
                {data.types.sort((a, b) => {
                    return a.slot - b.slot;
                }).map((type) => (
                    <TypeTag key={`pokemon-type-${type.type.name}`} name={type.type.name} />
                ))}
            </div>
        </div>
    );
}