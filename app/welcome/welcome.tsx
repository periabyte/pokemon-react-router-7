import { Link } from "react-router";
import mainImage from "./MainImage.png";

export function Welcome() {
  return (
    <div className="flex flex-col md:flex-row-reverse justify-center gap-5">
      <img src={mainImage} alt="logo" className="w-full min-h-10 md:w-80 " />
      
      <div className="flex flex-col gap-5 justify-center">
        <h2 className="text-center md:text-left font-bold text-2xl">Pokeapi using React Router 7</h2>
        <p>
          This is a simple example of how to use React Router 7 with Pokeapi.
        </p>
        <Link to="/pokedex" className="bg-primary hover:opacity-70 active:opacity-80 p-4 self-center rounded font-bold">
          View Pokedex
        </Link>
      </div>
    </div>
  );
}
