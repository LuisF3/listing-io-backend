module.exports = {
  create: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();
    if (!req.body.title || !req.body.color) return res.badRequest({message: 'Title and color are required'});

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token});

    if(!user) return res.forbidden();

    const list = await List.create({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
      owner: user.id
    }).fetch();

    return res.send(list);
  },
  delete: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token});

    if(!user) return res.forbidden();

    const listId = req.param('listId');
    await List.destroyOne({id: listId});

    return res.ok();
  },
  retrieve: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token});

    if(!user) return res.forbidden();

    const listId = req.param('listId');
    const list = await List.findOne({id: listId}).populate('listItems');

    return res.send(list);
  },
  update: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token});

    if (!user) return res.forbidden();

    console.log(req.body);

    const listId = req.param('listId');
    const updatedRecord = await List.updateOne({id: listId}).set(req.body);

    if (updatedRecord) return res.send(updatedRecord);
    return res.badRequest();
  },
  getAll: async function (req, res) {
    console.log(req.headers);
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);

    const user = await User.findOne({id: token}).populate('lists');

    if (!user) return res.forbidden();

    const lists = await List.find({owner: user.id}).populate('listItems');

    return res.send(lists);
  },

  getListItems: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token}).populate('lists');

    if (!user) return res.forbidden();

    const listId = req.param('listId');
    const list = await List.findOne({id: listId}).populate('listItems');

    if (!list) return res.notFound();

    return res.send(list.listItems);
  },
  createListItem: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();
    if (!req.body.description || req.body.isDone == null || !req.body.type ) return res.badRequest({message: 'Required field value is missing'});

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token}).populate('lists');

    if (!user) return res.forbidden();

    const listId = req.param('listId');
    const list = await List.findOne({id: listId});

    if (!list) return res.notFound();

    const listItem = await ListItem.create({
      description: req.body.description,
      isDone: req.body.isDone,
      type: req.body.type,
      maxQtd: req.body.maxQtd,
      currentQtd: req.body.currentQtd,
      date: req.body.date,
      list: list.id
    }).fetch();

    await List.addToCollection(list.id, 'listItems', listItem.id);

    return res.send(listItem);
  },
  deleteListItem: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token});

    if(!user) return res.forbidden();

    const listItemId = req.param('listItemId');
    await ListItem.destroyOne({id: listItemId});

    return res.ok();
  },
  updateListItem: async function (req, res) {
    if (!req.headers.authorization) return res.forbidden();

    const token = req.headers.authorization.substr(6);
    const user = await User.findOne({id: token});

    if(!user) return res.forbidden();

    const listItemId = req.param('listItemId');
    const updatedRecord = await ListItem.updateOne({id: listItemId}).set(req.body);

    if (updatedRecord) return res.send(updatedRecord);
    return res.badRequest();
  }
};
