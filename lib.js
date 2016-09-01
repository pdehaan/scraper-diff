const fetch = require('node-fetch');
const prettyjson = require('prettyjson');
const sortjson = require('sort-json');

const EMBEDLY_PROXY = 'https://embedly-proxy.services.mozilla.com/v2/extract';
const FATHOM_PROXY = 'https://page-metadata.services.mozilla.com/v1/metadata';

module.exports = {
  EMBEDLY_PROXY,
  FATHOM_PROXY,
  cleanObj,
  diffPages,
  pretty,
  transform
};

function diffPages(url) {
  const scrapePage = (proxy, url) => {
    const opts = {
      method: 'POST',
      body: JSON.stringify({
        urls: (url instanceof Array) ? url : [url]
      }),
      headers: {
        'content-type': 'application/json'
      }
    };

    return fetch(proxy, opts)
      .then((res) => res.json());
  };

  return Promise.all([
    scrapePage(EMBEDLY_PROXY, url),
    scrapePage(FATHOM_PROXY, url)
  ]).then(([embedly, fathom]) => {
    Object.keys(embedly.urls)
      .forEach((site) => {
        embedly.urls[site] = cleanObj(embedly.urls[site]);
      });

    return {
      embedly,
      fathom
    };
  });
};

function cleanObj(obj) {
  delete obj.app_links;
  delete obj.authors;
  delete obj.embeds;
  delete obj.entities;
  delete obj.favicon_colors;
  delete obj.keywords;
  delete obj.media;
  if (obj.images && obj.images.length) {
    obj.images = [obj.images[0]];
    delete obj.images[0].colors;
  }
  return obj;
};

function pretty(obj) {
  const sorted = sortjson(obj);
  return prettyjson.render(sorted);
};

function transform(data, unique=false) {
  let response = {};
  for (let url in data.fathom.urls) {
    const embedly = data.embedly.urls[url];
    const fathom = data.fathom.urls[url];
    response[url] = {}; // init
    for (let key in fathom) {
      if (!unique || embedly[key] !== fathom[key]) {
        response[url][key] = {
          embedly: embedly[key],
          fathom: fathom[key]
        };
      }
    }
  }
  return response;
}
