/*
 * Generate UIDs for entities
 */

const uuidv4 = require('uuid/v4')

module.exports.generateUid = () => {
  return uuidv4()
}
