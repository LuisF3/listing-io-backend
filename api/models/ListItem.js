/**
 * ListItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    listId: {
      type: 'number',
      required: true
    },

    description: {
      type: 'string'
    },

    isDone: {
      type: 'boolean',
      required: true
    }
  },

};

