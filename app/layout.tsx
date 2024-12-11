import { Outlet } from "react-router";
import MenuBar from "./components/MenuBar";

export default function MainLayout() {
    return (
        <div className="flex flex-1 flex-col">
            <MenuBar />
            <div className="flex flex-1 container mx-auto">
                <main className="p-4 w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}