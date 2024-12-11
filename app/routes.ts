import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout("layout.tsx", [
        index("routes/home.tsx"),
        ...prefix("pokedex",[
            layout('routes/pokedex/layout.tsx', [
                index("routes/pokedex/index.tsx"),
                route(":id", "routes/pokedex/$id.tsx"),
            ])
        ]),
    ]),
] satisfies RouteConfig;
