$(".save-btn").on("click", function(event) {
  event.preventDefault();
  const id = $(this).data("articleid");
  //save article
  $.post(`/article/${id}`, function(data) {
    location.reload();
  });
});

$(".delete-btn").on("click", function(event) {
  event.preventDefault();
  const id = $(this).data("articleid");

  fetch(`/article/${id}?_method=DELETE`, { method: "POST" })
    .then(json => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

$(".note-btn").on("click", function(event) {
  event.preventDefault();
  const id = $(this).data("articleid");
  $(".add-note-btn").data("articleid", id);
  fetch(`/article/${id}/note`)
    .then(response => response.json())
    .then(data=> {
      // const notes = data.note;
      console.log(data);
      notes.forEach(note => {
        console.log(note.body);
      })
    })
    .catch(err => {
      console.log(err);
    });
});

$(".add-note-btn").on("click", function(event) {
  event.preventDefault();
  const id = $(this).data("articleid");
  const noteText = $("#note-text").val();

  $.post(`/article/${id}/note`, { note: noteText }, function(data) {
    location.reload();
  });
});
