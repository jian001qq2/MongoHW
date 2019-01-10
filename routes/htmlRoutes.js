
let db = require('../models');

module.exports = function(app) {
    //for the home page
    app.get('/', (req, res) => {
        db.Article.find({saved:false}).sort({createdDate: -1}).populate('notes').then(data => {
            res.render('index',
             { article: data ,
            javascriptPage:"index.js"});
        }).catch(err => {
            res.render('index');
            console.log(err);
        })
    })  
  // for the saved article(s) page 
    app.get('/saved', (req, res) => {
        db.Article.find({ saved: false }).sort({createdDate: -1}).populate('notes').then(data => {
        res.render('save', 
        { article: data,
        javascriptPage:"saved.js"});
        })
    })
}