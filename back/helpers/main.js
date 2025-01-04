// const uploadFile = require('./uploadImage')
// const queryPromesa = require('./queryPromise')


// module.exports = {
//     ...uploadFile,
//     ...queryPromesa
// }
import * as uploadFile from './uploadImage.js';
import * as queryPromesa from './queryPromise.js';

/**
 * Combina las funciones exportadas de los módulos `uploadImage` y `queryPromise`.
 */
const combinedExports = {
  ...uploadFile,
  ...queryPromesa,
};

export default combinedExports;
