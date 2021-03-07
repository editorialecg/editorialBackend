const app = require('../app')

app.set('port', process.env.PORT); // Set Port

app.listen(app.get('port'), () => {
    console.log(`Server run on port`, app.get('port'));
});