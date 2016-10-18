/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/18.
 */

import fs from 'fs';
import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';

const version = process.env.VERSION || require('../package.json').version;
const main = fs
  .readFileSync('es6/index.js', 'utf-8')
  .replace(/this\.version = '[\d\.]+'/, "this.version = '" + version + "'");
fs.writeFileSync('es6/index.js', main);

module.exports = {
  entry: 'es6/index.js',
  dest: 'index.js',
  format: 'umd',
  moduleName: 'Airloy',
  plugins: [babel(), async()],
  banner:
    `/**
 * Airloy v${version}
 * (c) ${new Date().getFullYear()} Layman
 * @license MIT
 */`
};
