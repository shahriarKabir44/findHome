function createInsertQuery(tableName, fields) {

    return `insert into ${tableName} (${fields.toString()}) values(${new Array(fields.length).fill('?').toString()})`
}

module.exports = createInsertQuery