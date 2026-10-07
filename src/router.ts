import { initPageFeatures } from "./main.js";

type Route = {
    path: string;
    view: string;
};

const routes: Route[] = [
    { path: "/", view: "home.html" },
    { path: "/inscripcion", view: "inscripcion.html" },
    { path: "/mapa", view: "mapa.html" },
    { path: "/faq", view: "faq.html" },
];

export async function navigateTo(url: string) {
    history.pushState(null, "", url);
    await router();
}

async function router() {
    const potentialMatch = routes.find(r => r.path === location.pathname) || routes[0];
    const html = await fetch(`/partials/${potentialMatch.view}`).then(res => res.text());

    const app = document.getElementById("app");
    if (app) {
        app.innerHTML = html;
        initPageFeatures();
    }
}


export function initRouter() {
    window.addEventListener("popstate", router);

    document.addEventListener("click", e => {
        const target = e.target as HTMLElement;
        if (target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo((target as HTMLAnchorElement).href);
        }
    });

    router();
}
