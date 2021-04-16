const fs = require('fs');
const express = require('express');
const router = express.Router();

const db = require('../db');


/* GET movies listing. */
router.get('/', async (req, res) => {
  let query = db('movies').select('*');

  if (req.query.title) {
    query = query.where('title', '=', req.query.title);
  }

  const result = await query;

  res.send(result);
});

/* GET movies listing. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const results = await db('movies').first().where({ id });

  res.send(results);
});

/* GET movies listing. */
router.post('/', async (req, res) => {
  const [result] = await db('movies')
    .insert(req.body)
    .returning('*');

  res.send(result)
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedRows = await db('movies')
    .where({ id }) // where clause
    .del()
    .returning('*');

  if (deletedRows.length === 0) {
    return res.send('Nothing was deleted');
  }

  res.send({
    message: 'deleted',
    deletedID: deletedRows[0].id,
    deletedRow: deletedRows[0],
  })
});

module.exports = router;
