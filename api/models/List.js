/**
 * List.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    color: {
      type: 'string'
    },

    owner: {
      model: 'user',
      required: true
    }
  },

};

