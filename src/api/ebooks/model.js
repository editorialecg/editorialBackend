import { getAllEbook as _getAllEbook, updateEbookSelled as _updateEbookSelled, findEbookByTitle as _findEbookByTitle, createEbookFront as _createEbookFront } from './DAO'


export async function getAllEbook() {
    return await _getAllEbook()
}
export async function findEbookByTitle(title) {
    return await _findEbookByTitle(title)
}

export async function updateEbookSelled(title, totalSelled){
    return await _updateEbookSelled(title, totalSelled)
} 

export async function createEbookFront(title, subTitle, path, content, pages, published, language, author, authorBio, copyReader,
    copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
    isbn, editor, editorBio, price) {
    return await _createEbookFront(title, subTitle, path, content, pages, published, language, author, authorBio, copyReader,
        copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
        isbn, editor, editorBio, price)
}