//copied from the templete demo 
/* global bootbox */
$(document).ready(function() {
    // Getting a reference to the article container div we will be rendering all articles inside of
    var articleContainer = $(".article-container");
    // Adding event listeners for dynamically generated buttons for deleting articles,
    // pulling up article notes, saving article notes, and deleting article notes
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes",  );
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);


       // This function renders some HTML to the page explaining we don't have any articles to view
    function renderEmpty() {

      var emptyAlert = $(
        [
          "<div class='alert alert-warning text-center'>",
          "<h4>Uh Oh. Looks like we don't have any saved articles.</h4>",
          "</div>",
          "<div class='card'>",
          "<div class='card-header text-center'>",
          "<h3>Would You Like to Browse Available Articles?</h3>",
          "</div>",
          "<div class='card-body text-center'>",
          "<h4><a href='/'>Browse Articles</a></h4>",
          "</div>",
          "</div>"
        ].join("")
      );
      // Appending this data to the page
      articleContainer.append(emptyAlert);
    }
  
    function renderNotesList(data) {
      // This function handles rendering note list items to our notes modal
      // Setting up an array of notes to render after finished
      // Also setting up a currentNote variable to temporarily store each note
      var notesToRender = [];
      var currentNote;
      if (!data.notes.length) {
        // If we have no notes, just display a message explaining this
        currentNote = $("<li class='list-group-item'>No notes for this article yet.</li>");
        notesToRender.push(currentNote);
      } else {
        // If we do have notes, go through each one
        for (var i = 0; i < data.notes.length; i++) {
          // Constructs an li element to contain our noteText and a delete button
          currentNote = $("<li class='list-group-item note'>")
            .text(data.notes[i].noteText)
            .append($("<button class='btn btn-danger note-delete'>x</button>"));
          // Store the note id on the delete button for easy access when trying to delete
          currentNote.children("button").data("_id", data.notes[i]._id);
          // Adding our currentNote to the notesToRender array
          notesToRender.push(currentNote);
        }
      }
      // Now append the notesToRender to the note-container inside the note modal
      $(".note-container").append(notesToRender);
    }
  // this just to handle when to switch the save state when clicked
    function handleArticleDelete() {
      // This function handles deleting articles/headlines
      // We grab the id of the article to delete from the card element the delete button sits inside
      var articleToDelete = $(this)
        .parents(".card")
        .data();
  var id = $(this).data('id')
      // Remove card from page
      $(this)
        .parents(".card")
        .remove();
      // Using a delete method here just to be semantic since we are deleting an article/headline
      $.ajax({
        method: "post",
        url: "/api/articles/unsaved" + id
      }).then(function(data) {
      
        console.log(data)
        window.reload();
      });
    }
  
    function handleNoteSave() {
      // This function handles what happens when a user tries to save a new note for an article
      // Setting a variable to hold some formatted data about our note,
      // grabbing the note typed into the input box
      var id = $(this).data("article")._id;
      var newMessage= $(".bootbox-body textarea").val().trim();
      // If we actually have data typed into the note input field, format it
      // and post it to the "/api/notes" route and send the formatted noteData as well
      if (newMessage) {
       
        $.post("/api/notes/add"+id, {message:newMessage}).then(function() {
          // When complete, close the modal
         location.reload();
        });
      }
    }
  
    function handleNoteDelete() {
      // This function handles the deletion of notes
      // First we grab the id of the note we want to delete
      // We stored this data on the delete button when we created it
      var noteToDelete = $(this).data("_id");
      // Perform an DELETE request to "/api/notes/" with the id of the note we're deleting as a parameter
      $.ajax({
        url: "/api/notes/remove/" + noteToDelete,
        method: "post"
      }).then(function() {
      location.reload()
      });
    }
  });