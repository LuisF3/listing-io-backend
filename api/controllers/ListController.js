module.exports = {
  create: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();
    if (!req.body.title || !req.body.color) return res.badRequest({message: 'Title and color are required'});

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
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({token: token}).populate('lists');

    if (!user) return res.forbidden();

    const lists = await List.find({owner: user.id}).populate('listItems');

    return res.send(lists);
  },

  getListItems: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({token: token}).populate('lists');

    if (!user) return res.forbidden();

    const listId = req.param('listId');
    const list = await List.findOne({id: listId}).populate('listItems');

    if (!list) return res.notFound();

    return res.send(list.listItems);
  },
  createListItem: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();
    if (!req.body.description || !req.body.isDone) return res.badRequest({message: 'Description and isDone are required'});

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({token: token}).populate('lists');

    if (!user) return res.forbidden();

    const listId = req.param('listId');
    const list = await List.findOne({id: listId});

    if (!list) return res.notFound();

    const listItem = await ListItem.create({
      description: req.body.description,
      isDone: req.body.isDone,
      list: list.id
    }).fetch();

    await List.addToCollection(list.id, 'listItems', listItem.id);

    return res.send(listItem);
  }
};
