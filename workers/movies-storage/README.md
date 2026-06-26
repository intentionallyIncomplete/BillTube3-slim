# movies-storage worker

Cloudflare Worker for BillTube movie requests.

## Deploy

```bash
cd workers/movies-storage
npm install
npx wrangler kv namespace create MOVIE_SUGGESTIONS   # first time only
npx wrangler secret put TMDB_API_KEY
npx wrangler secret put GIPHY_API_KEY
npm run deploy
```

## API

### Legacy (replaces movie-suggestions-worker.billtube.workers.dev)

| Method | Path | Response |
|--------|------|----------|
| GET | `/` | `[{ key, movieId, movieTitle, username, posterPath, up, down, ts }]` |
| POST | `/` | same fields in body → saved record |

### New (BillTube3-slim client)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/search` | TMDB search/discover with pagination |
| GET | `/api/history` | Paginated suggestion history |
| GET | `/api/tmdb/*` | Generic TMDB proxy (key stays on worker) |
| GET | `/api/giphy/search` | Giphy search (`q`, `limit`, `rating`) |
| GET | `/api/giphy/trending` | Giphy trending (`limit`, `rating`) |
| POST | `/api/suggestions` | Save a suggestion |

## Verify

```bash
curl https://empty-bar-d620.movies-storage-a.workers.dev/
curl "https://empty-bar-d620.movies-storage-a.workers.dev/api/tmdb/search/movie?query=Fight%20Club"
curl "https://empty-bar-d620.movies-storage-a.workers.dev/api/giphy/trending?limit=5"
```
