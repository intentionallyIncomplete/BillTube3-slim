# vidprox — CORS video proxy

Fallback proxy for BillTube audio boost/normalization when direct media URLs lack CORS headers.

## Deploy

```bash
cd src/workers/vidprox
npm install
npm run deploy
```

Default client URL: `https://vidprox.movies-storage-a.workers.dev/?url=`

Override in channel config: `BTFW_CONFIG.corsVideoProxy`

## Same-zone upstreams

When the media host is another Worker on the same `*.workers.dev` account
(e.g. `sweet-pine-*.movies-storage-a.workers.dev`), Cloudflare blocks the
subrequest with **error 1042** unless `global_fetch_strictly_public` is enabled
in `wrangler.jsonc`. That flag is required for this deployment.

## API

```
GET /?url=<encodeURIComponent(videoUrl)>
```

Supports `Range` / `206` for seeking. Response includes `Access-Control-Allow-Origin: *`.
