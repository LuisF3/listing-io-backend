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
    if (user) res.send({token: user.token});
    else res.forbidden();
  },
  register: async function (req, res) {
    if (!req.body.username)
      return res.badRequest({invalid: 'Username is required'});
    if (!req.body.password)
      return res.badRequest({invalid: 'Password is required'});

    let user = await User.findOne({username: req.body.username});
    if (!user) {
      user = await User.create({
        username: req.body.username,
        password: passwordHash(req.body.password)
      }).fetch();
      if (user) return res.send(user);
    }
    return res.badRequest({erro: 'Usuário já existente'});
  }
};

