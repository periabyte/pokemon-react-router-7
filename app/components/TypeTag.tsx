import { useGetType } from "~/api/pokeapi";


export default function TypeTag({ name }: { name: string }) {
    const { data } = useGetType(name);

    return (
        <img src={data.sprites['generation-viii']['legends-arceus'].name_icon} className="max-w-20" />
    );
}   