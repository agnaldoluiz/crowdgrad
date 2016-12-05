$(document).ready(function() {
  $("iframe").hide();

  $(function() {
    $('form').submit(function() {
        alert('Cássio!!');
        var link = $(this).serialize();
        link = link.split('%3D')[1];
        $("iframe").toggle();
        $("iframe").attr("src",'//www.youtube.com/embed/' + link);
        return false;
    });
  });
});

function move() {
    var elem = document.getElementById("myBar"); 
    var width = 10;
    
    if (width > 100) {
        clearInterval(id);
    } else {
        width = width + 10; 
        elem.style.width = width + '%'; 
        document.getElementById("contador").innerHTML = 'R$' + width * 1;
    }
    
}

