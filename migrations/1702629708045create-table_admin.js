const {Table} = require('migratify/templates/Migration.class')
let newTable = new Table("admin");
newTable.setID('id');
newTable.addColumn('name','VARCHAR(100)')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('email','VARCHAR(100)')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('password','VARCHAR(100)')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
module.exports = async () => {
	return newTable.create()
}