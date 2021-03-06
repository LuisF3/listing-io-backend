/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'post /auth': 'AuthController.auth',
  'post /register': 'AuthController.register',
  'get /list/getAll': 'ListController.getAll',
  'post /list': 'ListController.create',
  'get /list/:listId': 'ListController.retrieve',
  'patch /list/:listId': 'ListController.update',
  'delete /list/:listId': 'ListController.delete',
  'delete /listItem/:listItemId': 'ListController.deleteListItem',
  'get /list/:listId/getAllListItems': 'ListController.getListItems',
  'post /list/createListItem/:listId': 'ListController.createListItem',
  'patch /list/updateListItem/:listItemId': 'ListController.updateListItem'


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
