import { connect } from 'mongoose';

// Connect to db
var db = connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.nkdgo.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(
    () => console.log('DataBase Connected'),
    (err) => console.log('DataBase Error ',err)
)

export default db;