const promisify=require('../utils/promisify')
const  jwt=require('jsonwebtoken')
module.exports=class  AdminRepository{
    static  async authenticate({email,password}){
        let [admin]=await  promisify({
            sql:`select * from admin where email=? and password=?;`,
            values:[email,password]
        })
        if(!admin)return {
            admin:null,
            token:null
        }
        let token=jwt.sign(admin,process.env.jwtSecret)
        return {admin,token}
    }
}