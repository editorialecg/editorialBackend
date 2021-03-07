module.exports = {
    async sendAllEbookFront(ebook) {
        return ebook
    },

    async sendOneEbook(name, subTitle, path, pages, published, language, author, authorBio, copyReader, copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo, isbn, editor, editorBio, price) {

        const ebookData = {
            name: name,
            subTitle: subTitle,
            path: path,
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
        }

        return ebookData

    },

    async sendMyEbook(ebookPdfId, path, eFrontAcess){
        const data = {
            ebookPdfId: ebookPdfId,
            pathPdf: path,
            eFrontAcess: eFrontAcess,
        }

        return data
    },

    async sendEbookAcess(ebook){
        return ebook
    }
}