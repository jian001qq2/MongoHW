//Require the model
let db = require('../models');
// Scraping tools
let axios = require('axios');
let cheerio = require('cheerio');

module.exports = function(app) {
    //scraping the articles 
    app.get('/api/scrape', function (req, res) {
    console.log('Scraping...')
    axios.get('https://www.npr.org/sections/news/').then(response => {
     let $ = cheerio.load(response.data)
      $('article div.item-info').each((i, element)=> {
        let article = {}
        article.headline = $(element).children('h2.title').text()
        article.url =  $(element).children('h2.title').find('a').attr('href')
        article.summary = $(element).children('p.teaser').text()

        db.Article.create(article).then(article => {
          console.log(`Added ${article}`)
        }).catch(err => {
          console.log(err)
        })
      })
      res.end('Scrape Complete')
    })
  });

  //Api routes for the Article collection
//update the specific article saved staus to true by specifc id 
  app.post('/api/articles/save/:id', (req, res) => {
    db.Article.findByIdAndUpdate({_id:req.params.id}, { $set: { saved: true } }).then(data => {
        res.json(data);
    }).catch(err => {
        res.end("update saved to true error \n")
        console.log(err);
    })
});

//update the specific article saved staus to false by specific id
app.post('/api/articles/unsave/:id', (req, res) => {
    db.Article.findByIdAndUpdate({_id:req.params.id}, { $set: { saved: false } }).then(data => {
        res.json(data);
    }).catch(err => {
        res.end('update saved to false error \n')
        console.log(err);
    })
});

//Api routes for the Note collection
  //Notes posting first got from the input them return it next udata in the article
 app.post('/api/notes/add/:id', (req, res) => {
    db.Note.create({ message: req.body.message }).then((newNote) => {
      console.log(`notes created ${newNote}`)
        res.json(dbNote);
      return db.Article.findByIdAndUpdate({ _id: req.params.id }, { $push: { notes: newNote } })
    }).then(dbArticle => {
      console.log(`noted added ${dbArticle}`)
      res.json(dbArticle);
    }).catch(err => {
      res.end('notes posting error \n')
      console.log(err)
    })
  });
  
  //Notes deleting
  app.post('/api/notes/remove/:id', (req, res) => {
    db.Note.findByIdAndDelete({_id:req.params.id} )
      .then(dbNote => { 
        console.log(dbNote)
        res.end()
  });
});

}
