const ebookModel = require('./model')
const ebookDto = require('./DTO')

module.exports = {

    async uploadEbookFront(req, res) {

        const {
            name, subTitle, path, pages, published,
            language, author, authorBio, copyReader,
            copyReaderBio, illustrator, illustratorBio, edition, gender,
            description, btnPayPal, legalDepo,
            isbn, editor, editorBio, price
        } = req.body;

        await ebookModel.createEbookFront(
            name, subTitle, path, pages, published,
            language, author, authorBio, copyReader,
            copyReaderBio, illustrator, illustratorBio, edition, gender,
            description, btnPayPal, legalDepo,
            isbn, editor, editorBio, price
        )

        return res.status(200).send()

    },

    async uploadPdf(req, res) {

        const name = req.body.name
        const path = req.body.path

        if (!name || !path) return res.status(400).send()

        const ebookpdf = await ebookModel.findEbookPdfByName(name)


        if (!ebookpdf) {

            await ebookModel.createEbookPdf(name, path)

            return res.status(200).send()
        } else {
            const find = {
                name: name
            }

            const pathPdf = {
                $push: {
                    path: path
                }
            }

            await ebookModel.updateEbookPdf(find, pathPdf)

            return res.status(201).send()
        }



    },

    async getPdf(req, res) {

        const { id, username } = req.params

        const user = await ebookModel.findOneUser(username)

        if (!user) return res.status(404).send()

        const eAcess = user.ebookAcess

        for (let i = 0; i <= eAcess.length; i++) {
            const acess = eAcess[i];

            if (id == acess) {


                const ebookPdf = await ebookModel.findEbookPdfById(eAcess)

                if (!ebookPdf) return res.status(404).send()

                return res.status(200).send(ebookPdf)

            } else {
                return res.status(401).send()
            }

        }

    },

    async getMyEbook(req, res) {

        const { username } = req.params

        const user = await ebookModel.findOneUser(username)

        const ebookId = user.ebookAcess
        const eFrontAcess = user.ebookFrontAcess

        const ebook = await ebookModel.findEbookPdfById(ebookId)

        if (!ebook || !user) return res.status(404).send()
        const send = await ebookDto.sendMyEbook(ebook.id, ebook.path, eFrontAcess)
        return res.status(200).json({ dataPdf: send });
    },

    async getAllEbook(req, res) {

        const ebook = await ebookModel.getAllEbook()

        if (!ebook) return res.status(404).send()

        return res.status(200).send(await ebookDto.sendAllEbookFront(ebook))
    },

    async getOneEbook(req, res) {

        const id = req.params.id

        if (!id) return res.status(400).send()

        const ebook = await ebookModel.findEbookFrontById(id)

        if (!ebook) return res.status(404).send()

        const send = await ebookDto.sendOneEbook(ebook.name, ebook.subTitle, ebook.path, ebook.pages, ebook.published, ebook.language, ebook.author, ebook.authorBio, ebook.copyReader, ebook.copyReaderBio, ebook.illustrator, ebook.illustratorBio, ebook.edition, ebook.gender, ebook.description, ebook.btnPayPal, ebook.legalDepo, ebook.isbn, ebook.editor, ebook.editorBio, ebook.price)

        return res.status(200).json({ ebookData: send });
    },

    async ebookPay(req, res) {

        const { username, front, idpdf } = req.params

        const ebookFront = await ebookModel.findEbookFrontById(front)

        const ebookPdf = await ebookModel.findEbookPdfById(idpdf)

        const user = await ebookModel.findOneUser(username)

        if (!user || !ebookFront || !ebookPdf) return res.status(404).send()

        const idFront = {
            $push: {
                ebookAcess: [ebookPdf._id],
                ebookFrontAcess: [ebookFront.path]
            }
        }

        const userU = await ebookModel.updateEbookFront(user.userName, idFront)

        return res.status(200).send()
    }
}