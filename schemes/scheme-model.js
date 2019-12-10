const db = require('../data/dbConfig.js')

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes').where({id}).first()
}

function findSteps(id) {
  return (
    db('steps')
      .innerJoin('schemes', 'steps.scheme_id', 'schemes.id')
      .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
      .where({scheme_id: id})
      .orderBy('steps.step_number', 'asc')
  )
}

function add(scheme) {
  return (
    db('schemes').insert(scheme).then(ids => findById(ids[0]))
  )
}

function update(changes, id) {
  return (
    db('schemes')
      .where({id: id})
      .update(changes)
      .then(changes => findById(id))
  )
}

function remove(id) {
  return (
    findById(id)
      .then(scheme => {
        if (scheme) {
          return db('schemes').where({id}).del().then(num => scheme)
        } else {
          null
        }
      })
  )
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}