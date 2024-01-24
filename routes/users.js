var express = require('express');
var router = express.Router();
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let users = db.collection('users')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let list = await users.list();
  res.send(list);
});

router.post('/', async function(req, res, next) {
  const {firstName, lastName} = req.body;
  await users.set(firstName, {
    firstName: firstName,
    lastName: lastName
  })
  res.end();
});

router.get('/:key', async function(req, res, next) {
  let item = await users.get(req.params.key);
  res.send(item);
});

module.exports = router;
