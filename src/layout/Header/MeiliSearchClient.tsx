import { MeiliSearch } from 'meilisearch';

if (
  !process.env.NEXT_PUBLIC_MEILI_URI ||
  !process.env.NEXT_PUBLIC_MEILI_API_KEY
) {
  throw new Error(
    'Missing MeiliSearch configuration: Please provide valid environment variables.'
  );
}

const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_URI, // Host
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY, // API key
});

export default meiliClient;
