/**
 * List.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string'
    },

    color: {
      type: 'string',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    },

    listItems: {
      collection: 'listitem',
      via: 'list'
    }
  },

};

