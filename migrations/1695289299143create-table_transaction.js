const {Table} = require('migratify/templates/Migration.class')
let newTable = new Table("transaction");
newTable.setID('id');
newTable.addColumn('time','DOUBLE')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('purchasedBy','INT')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('purchasedFrom','INT')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('propertyid','INT')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addColumn('amount','INT')
	.setNullable(true)
	 .setDefaultValue('')
	 .setUnique(false)
newTable.addForeignKey('purchasedBy','user','id');
newTable.addForeignKey('purchasedFrom','company','id');
newTable.addForeignKey('propertyid','property','id');
module.exports = async () => {
	newTable.create()
}