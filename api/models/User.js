/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    //Abandonamos a inclusão do token por causa de falha na função Math.random()
    // token: {
    //   type: 'string',
    //   unique: true
    // },

    lists: {
      collection: 'list',
      via: 'owner'
    }
  },

};


