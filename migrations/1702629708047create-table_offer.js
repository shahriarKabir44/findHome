const {Table} = require('migratify/templates/Migration.class')
let newTable = new Table("offer");
newTable.addColumn('offeredBy','INT')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('propertyId','INT')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('offer','DOUBLE')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('time','DOUBLE')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.setID('id');
newTable.addForeignKey('propertyId','property','id');
newTable.addForeignKey('offeredBy','user','id');
module.exports = async () => {
	return newTable.create()
}