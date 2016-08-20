// CRUD SQL语句
var note = {
    insert: 'INSERT INTO notes(id, content, time, title, userid) VALUES(0, ?, ?, ?, ?)',
    update: 'update notes set content=?, time=?, title=?, userid=? where id=?',
    delete: 'delete from notes where id=?',
    queryByUserId: 'select * from notes where userid=?',
    queryByNoteId: 'select * from notes where id=?',
    queryAll: 'select * from notes'
};

module.exports = note;