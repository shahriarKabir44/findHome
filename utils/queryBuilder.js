function createInsertQuery(tableName, fields) {

    return `insert into ${tableName} (${fields.toString()}) values(${new Array(fields.length).fill('?').toString()})`
}
/**
 * 
 * @param {String} tableName 
 * @param {[String]} fields 
 * @returns 
 */
function createUpdateQuery(tableName, fields) {
    fields = fields.map(el => el + '=?')
    let updateList = fields.toString()

    return `update ${tableName} set ${updateList}`
}
module.exports = { createInsertQuery, createUpdateQuery }