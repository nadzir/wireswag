'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const setup = exports.setup = program => {
  program.version('1.0.0').option('-s, --swagger [file]', 'swagger files').option('-g, --server [servername]', 'servername').option('-p --proxy [proxy]', 'proxy').option('-r --record', 'record').option('-l --playback', 'playback').parse(process.argv);
};