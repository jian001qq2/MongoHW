/* global bootbox */
$(document).ready(function() {
    // Setting a reference to the article-container div where all the dynamic content will go
    // Adding event listeners to any dynamically generated "save article"
    // and "scrape new article" buttons
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

  
 
    function renderEmpty() {
      // This function renders some HTML to the page explaining we don't have any articles to view
      // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
      var emptyAlert = $(
        [
          "<div class='alert alert-warning text-center'>",
          "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
          "</div>",
          "<div class='card'>",
          "<div class='card-header text-center'>",
          "<h3>What Would You Like To Do?</h3>",
          "</div>",
          "<div class='card-body text-center'>",
          "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
          "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
          "</div>",
          "</div>"
        ].join("")
      );
      // Appending this data to the page
      articleContainer.append(emptyAlert);
    }
  
    function handleArticleSave() {
      var articleToSave = $(this).parents(".card").data();
  console.log(articleToSave)
      // Remove card from page
      $(this)
        .parents(".card")
        .remove();
  
      let id = $(this).data('id')
      // Using a patch method to be semantic since this is an update to an existing record in our collection
      $.ajax({
        method: "post",
        url: "/api/article/save/" +id,
        data: articleToSave
      }).then(function(data) {
  location.reload();
      });
    }
  
    function handleArticleScrape() {
      // This function handles the user clicking any "scrape new article" buttons
      $.get("/api/scrape").then((data)=> {
    console.log("Wait a monment, it's scraping...");
    location.reload();
      });
    }
  
    // function handleArticleClear() {
    //   $.get("api/clear").then(function() {
    //     articleContainer.empty();
    //     initPage();
    //   });
    // }
  });