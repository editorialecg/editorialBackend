import { getAllEbookDao, updateEbookSelledDao, findEbookByTitleDao, createEbookFrontDao } from './DAO'


export async function getAllEbook() {
    return await getAllEbookDao()
}
export async function findEbookByTitle(title) {
    return await findEbookByTitleDao(title)
}

export async function updateEbookSelled(title, totalSelled){
    return await updateEbookSelledDao(title, totalSelled)
} 

export async function createEbookFront(title, subTitle, path, content, pages, published, language, author, authorBio, copyReader,
    copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
    isbn, editor, editorBio, price) {
    return await createEbookFrontDao(title, subTitle, path, content, pages, published, language, author, authorBio, copyReader,
        copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
        isbn, editor, editorBio, price)
}