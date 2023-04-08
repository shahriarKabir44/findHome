const multer = require('multer')

const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const { filetype } = req.headers
        let path = 'uploads/'
        let tempPath = '/'
        if (filetype == 'property') {
            const { propertyid } = req.headers
            path += `/${propertyid}`
            tempPath += `/${propertyid}`
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
        if (filetype == 'profilePicture') {
            const { userid } = req.headers
            filename = userid
        }
        else if (filetype == 'property') {
            const { fileIndex } = req.headers

            filename = fileIndex
        }


        req.filename = `${filename}.${ext}`
        cb(null, `${filename}.${ext}`)
    }
})

const upload = multer({ storage })

module.exports = { upload };