import { apiKey } from "./main.ts";
import { Results } from "./types.ts";

const url = "https://api.search.brave.com/res/v1/web/search";

export async function getResults(params: URLSearchParams) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "X-Subscription-Token": apiKey || "",
        "Accept-Encoding": "gzip",
    });
    const response = await fetch(`${url}?${params}`, {
        method: "GET",
        headers: headers,
    });
    if (!response.ok) {
        console.error("Error:", response.statusText);
        Deno.exit(1);
    }
    const data: Results = await response.json();

    const mapped_results = {
        videos: data.videos.results.map(({ title, url, description, meta_url }) => ({
            title,
            url,
            description,
            img:meta_url?.favicon
        })),
        web: data.web.results.map(({ title, url, description, meta_url}) => ({
            title,
            url,
            description,
            img:meta_url?.favicon
        })),
    };
    return mapped_results;
}