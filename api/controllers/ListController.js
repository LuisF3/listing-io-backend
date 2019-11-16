module.exports = {
  create: async function (req, res) {
    if (!req.headers.authorization) res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({token: token}).populate('lists');

    if(!user) return res.forbidden();

    const list = await List.create({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
      owner: user.id
    }).fetch();

    return res.send(list);
  },
  getAll: async function (req, res) {
    if (!req.headers.authorization) res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({token: token}).populate('lists');

    if (!user) return res.forbidden();
    else return res.send(user.lists);
  }
};
