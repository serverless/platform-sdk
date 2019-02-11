/*
 * Generate UIDs for entities
 */

import uuidv4 from 'uuid/v4'

export const generateUid = () => {
  return uuidv4()
}
