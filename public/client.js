$(function(){

  $.get('/courses', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var cityData = form.serialize();

    $('.alert').hide();

    $.ajax({
      type: 'POST', url: '/courses', data: cityData
    })
    .error(function() {
      $('.alert').show();
    })
    .success(function(courseName){
      appendToList([courseName]);
      form.trigger('reset');
    });
    
  });

  function appendToList(courses) {
    var list = [];
    var content, course;
    for(var i in courses){
      course = courses[i];
      content = '<a href="/courses/'+course+'">'+course+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-course="'+course+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.course-list').append(list)
  }


  $('.course-list').on('click', 'a[data-course]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }
    event.preventDefault();
    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/course/' + target.data('course')
    }).done(function () {
      target.parents('li').remove();
    });
    
  });

});