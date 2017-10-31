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
    .then(data => {
      // const notes = data.note;
      console.log(data);
      console.log(data.note[0].body);
      let html = `<div>${data.note[0].body} <button data-noteid="${data.note[0]._id}" class="delete-note-btn btn btn-danger">X</button></div>`;
      $(".modal-body-notes").html(html)
    })
    .catch(err => {
      console.log(err);
      let html = ``;
      $(".modal-body-notes").html(html);
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

$(".modal-body-notes").on("click", ".delete-note-btn", function(event) {
  event.preventDefault();
  const articleid = '111'
  const noteid = $(this).data("noteid");
  fetch(`/article/${articleid}/note/${noteid}?_method=DELETE`, { method: "POST" })
    .then(json => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
})