const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

// ES6 promise async await
// add async to the function you want to add a promise to
// await the method you want resolved
// in index.js in the routes, the createStore method is wrapped in the try catch via the errorHandlers.js file
exports.createStore = async (req, res) => {
  const store = await (new Store(req.body).save());
  await store.save();
  req.flash('success', `Successfully Created ${store.name}.  Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // 1. Query the db for a list of all stores
  const stores = await Store.find();
  console.log(stores);

  res.render('stores', { title: 'Stores', stores });
}
