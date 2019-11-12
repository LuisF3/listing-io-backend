/**
 * List.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    userId: {
      type: 'number',
      required: true
    },

    title: {
      type: 'string'
    },

    description: {
      type: 'string'
    }
  },

};

