import { geolocation } from '@vercel/edge';

export const config = {
    runtime: 'edge',
};

export default function handler(request: Request) {
    const { country } = geolocation(request);
    return new Response(
        JSON.stringify({ country: country }),
        {
            headers: { 'content-type': 'application/json' },
        });
}