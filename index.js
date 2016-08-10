const argv = require('yargs').argv;

const {diffPages, pretty, transform} = require('./lib');

if (argv.url) {
  diffPages([argv.url])
    .then((res) => {
      const data = transform(res, true);
      console.log(pretty(data));
    })
    .catch((err) => console.error(err));
}
