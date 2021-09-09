import ebookFrontModel from '../../models/ebookfrontModel'

export async function getAllEbookDao() {
    return new Promise((resolve, reject) => ebookFrontModel.find({}, (err, data) => {
        if (err) return reject(err)
        resolve(data)
    }))
}
export async function findEbookByTitleDao(title) {
    return new Promise((resolve, reject) => ebookFrontModel.findOne({ title: title }, (err, data) => {
        if (err) return reject(err)
        resolve(data)
    }))
}

export async function updateEbookSelledDao(title, totalSelled) {
    return new Promise((resolve, reject) => ebookFrontModel.findOneAndUpdate({ title: title }, { selled: totalSelled }, { new: true }, (err, data) => {
        if (err) return reject(err)
        resolve(data)
    }))
}

export async function createEbookFrontDao(title, subTitle, path, content, pages, published, language, author, authorBio, copyReader,
    copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
    isbn, editor, editorBio, price) {
    return new Promise((resolve, reject) => ebookFrontModel.create({
        title: title,
        subTitle: subTitle,
        path: path,
        content: content,
        pages: pages,
        published: published,
        language: language,
        author: author,
        authorBio: authorBio,
        copyReader: copyReader,
        copyReaderBio: copyReaderBio,
        illustrator: illustrator,
        illustratorBio: illustratorBio,
        edition: edition,
        gender: gender,
        description: description,
        btnPayPal: btnPayPal,
        legalDepo: legalDepo,
        isbn: isbn,
        editor: editor,
        editorBio: editorBio,
        price: price
    }, (err, data) => {
        if (err) return reject(err)
        resolve(data)
    }))
}