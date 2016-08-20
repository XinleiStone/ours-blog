// CRUD SQL语句
var user = {
  insert:'INSERT INTO User(id, isAdmin, password, username, email, imgname) VALUES(0, ?, ?, ?, ?, ?)',
  update:'update User set username=?, isAdmin=?, password=?, imgname=?, email=? where id=?',
  delete: 'delete from User where id=?',
  queryById: 'select * from User where id=?',
  queryAll: 'select * from User'
};

module.exports = user;