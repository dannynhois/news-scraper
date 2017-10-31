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
  //save article
  // $.delete(`/article/${id}`, function(data) {
  //   console.log(data);
  //   location.reload();
  // });
  fetch(`/article/${id}?_method=DELETE`, { method: "POST" })
    .then(json => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});
