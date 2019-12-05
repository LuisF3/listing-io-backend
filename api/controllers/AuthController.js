/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passwordHash = function (password) {
  return password + 'hashSecreto';
};

module.exports = {
  auth: async function (req, res) {
    if (!req.body.username)
      return res.badRequest({invalid: 'Username is required'});
    if (!req.body.password)
      return res.badRequest({invalid: 'Password is required'});

    const user = await User.findOne({username: req.body.username, password: passwordHash(req.body.password)});
    if (user) res.send({token: user.id});
    else res.forbidden();
  },

  register: async function (req, res) {
    if (!req.body.username)
      return res.badRequest({invalid: 'Username is required'});
    if(!req.body.name)
      return res.badRequest({invalid: 'Name is required'});
    if(!req.body.email)
      return res.badRequest({invalid: 'E-mail is required'});
    if (!req.body.password)
      return res.badRequest({invalid: 'Password is required'});

    let users = await User.find({username: req.body.username, email: req.body.email});
    if (users.length === 0) {
      const user = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: passwordHash(req.body.password)
      }).fetch();
      return res.send(user);
    }
    return res.badRequest({erro: 'Usuário já existente'});
  }
};

