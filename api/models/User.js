/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const generateToken = function() {
  /**
   * @return {string}
   */
  const S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
};

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    token: {
      type: 'string',
      defaultsTo: generateToken(),
      unique: true
    },

    lists: {
      collection: 'list',
      via: 'owner'
    }
  },

};


