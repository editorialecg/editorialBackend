import { buildSchema } from 'graphql'

export default buildSchema(`

    type Query{
        oneUser(username: String!): User!
        oneEbook(title: String!): Ebook!
        oneEbookPages(username: String! title: String!): Ebook!
        allEbook: [Ebook!]!
        myEbooks(username: String!): User!
    }

    type Mutation{
        login(username: String! password: String!): User!
        createUser(name: String! lastname: String! email: String! username: String! password: String! country: String! birthDay: String! birthMonth: String! birthYear: String!): User!
        
        confirmCode(username: String! code: String!): User!
        confirmPassword(username: String! password: String!): User!
        confirmUser(username: String!): User!

        changePassword(username: String! password: String!): User!
        updateUser(
            oldUsername: String! newUsername: String name: String lastname: String email: String
        ): User


        createEbook(
            title: String! subTitle: String path: String! content: [String!] pages: String! published: String!
            language: String! author: String! authorBio: String copyReader: String!
            copyReaderBio: String illustrator: String! 
            illustratorBio: String edition: String! gender: String!
            description: String! btnPayPal: String! legalDepo: String!
            isbn: String! editor: String! editorBio: String price: String!
        ): Ebook!


        ebookPayed(username: String! title: String!): User!
        updateEbookSelled(title: String!): Ebook!
    }

    type Ebook{
        title: String!
        subTitle: String
        path: String!
        pages: String!
        content: [String]
        published: String!
        language: String!
        author: String!
        authorBio: String!
        copyReader: String!
        copyReaderBio: String!
        illustrator: String!
        illustratorBio: String!
        editor: String!
        editorBio: String!
        edition: String!
        gender: String!
        description: String!
        btnPayPal: String!
        legalDepo: String!
        isbn: String!
        price: String!
        selled: String
    }

    type User{
        name: String!
        lastname: String!
        email: String!
        verifyEmail: Boolean!
        codeVerify: String!
        username: String!
        country: String!
        birthDay: String!
        birthMonth: String!
        birthYear: String!
        ebookAccess: [String]
        
    }

    

`)