/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/18.
 */

import fs from 'fs';
import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';

const version = process.env.VERSION || require('../package.json').version;
const main = fs
  .readFileSync('src/index.js', 'utf-8')
  .replace(/version: '[\d\.]+'/, "version: '" + version + "'");
fs.writeFileSync('src/index.js', main);

module.exports = {
  entry: 'src/index.js',
  dest: 'airloy.js',
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
