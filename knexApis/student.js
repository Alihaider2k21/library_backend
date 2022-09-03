import knex from "knex";

knex('student')
  .select({
    id: 'id',
    bookName: 'bookName',
    author: 'author',
    dateOfBorrow: 'dateOfBorrow',
    dateOfReturn: 'dateOfReturn',
    borrowedBy: ''
  })
  .then((student) => {
    return res.json(student);
  })
  .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
  })