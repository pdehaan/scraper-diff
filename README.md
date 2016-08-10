# scraper-diff

Embedly vs Fathom

## Requires:
- Node 6 (w/ npm 3)

## Usage:

This module isn't currently published on npm (because who cares), so usage is a bit janky because you'll need to `git clone`, `npm install`, and then run `node index --url {xyz}` directly.

```js
node index --url https://www.npmjs.com/package/express

https://www.npmjs.com/package/express:
  favicon_url:
    embedly: https://www.npmjs.com/static/images/touch-icons/favicon.ico
    fathom:  https://www.npmjs.com/favicon.ico
  icon_url:
    fathom: /static/images/touch-icons/apple-touch-icon-57x57.png
  image_url:
    fathom: https://www.npmjs.com/static/images/touch-icons/open-graph.png
  images:
    embedly:
      -
        caption: null
        entropy: 0.440548642697
        height:  630
        size:    1759
        url:     https://www.npmjs.com/static/images/touch-icons/open-graph.png
        width:   1200
    fathom:
      -
        entropy: 1
        height:  500
        url:     https://www.npmjs.com/static/images/touch-icons/open-graph.png
        width:   500
  provider_url:
    embedly: https://www.npmjs.com
    fathom:  https://www.npmjs.com/package/express
```