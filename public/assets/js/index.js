$(".save-btn").on("click", function(event) {
  event.preventDefault();
  const id = $(this).data("articleid");
  //save article
  $.post(`/article/${id}`);
});
