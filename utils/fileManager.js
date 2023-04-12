const multer = require('multer')

const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const { filetype } = req.headers
        let path = 'public/uploads'
        let tempPath = 'uploads'
        if (filetype == 'property') {
            const { propertyid, companyid } = req.headers
            path += `/${companyid}/${propertyid}`
            tempPath += `/${companyid}/${propertyid}`
        }
        else if (filetype == 'profilePicture') {
            path += `/users`
            tempPath += `/users`
        }
        else if (filetype == 'company') {
            path += `/companies`
            tempPath += `/companies`
        }

        if (!fs.existsSync(path)) {

            fs.mkdirSync(path, { recursive: true });
        }
        req.fileDir = tempPath
        return cb(null, path)

    },
    filename: (req, res, cb) => {
        const { filetype } = req.headers
        let filename = ""
        if (filetype == 'profilePicture' || filetype == "company") {
            const { userid } = req.headers
            filename = userid
        }
        else if (filetype == 'property') {
            const { fileindex } = req.headers

            filename = fileindex
        }


        req.filename = `${filename}.jpg`
        cb(null, `${filename}.jpg`)
    }
})

const upload = multer({ storage })

module.exports = { upload };