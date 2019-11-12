module.exports = {
  test: async function (req, res) {
    const user = await User.findOrCreate({username: req.body.username}, {username: req.body.username, password: req.body.password});
    const list = await List.findOrCreate({id: req.body.id}, {userId: user.id, title: req.body.title, description: req.body.listDescription});
    await ListItem.findOrCreate({description: req.body.description}, {listId: list.id, isDone: req.body.isDone, description: req.body.description}).exec(function(err, newOrExistingRecord, wasCreated) {
      console.log('wasCreated: ', wasCreated);
      if (!wasCreated)
        return res.send({already_exists: true});
      else
        return res.send({already_exists: false});
    });
  }
};
