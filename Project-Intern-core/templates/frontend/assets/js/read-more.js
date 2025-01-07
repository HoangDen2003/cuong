$(document).ready(function(){
    $('.read-more-btn').click(function(event){
      event.preventDefault();
      var cardText = $(this).siblings('.card-text');
      cardText.toggleClass('read-more');
      $(this).text(cardText.hasClass('read-more') ? 'Read Less' : 'Read More');
    });
  });