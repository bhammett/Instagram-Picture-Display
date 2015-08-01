$(function (){

var toggle = 0;
var global_tid = 0;

function set_global_tid(){
  global_tid = global_tid == 1 ? 0 : 1;
  toggle = toggle == 1 ? 0 : 1;
}



  var swap_picture = function(query, picID, num_pictures, tid) {
  
    if (num_pictures === undefined || num_pictures === null) {
      num_pictures = query.data.length;
    }

    picID = picID < num_pictures - 1 ? picID += 1 : picID = 0
    console.log(picID)

    $("#picture").fadeOut(1000, function(){
      $("#picture img").remove();
      
      $("#picture").append("<img src='"+query.data[picID].images.standard_resolution.url+"'>");
        
        $("#picture").fadeIn(1000);
        setTimeout( function(){

          console.log("tid = "+tid+" | global_tid = "+global_tid)

          if(global_tid!=tid){
            return;
          } else {
            swap_picture(query, picID, num_pictures, tid)
          }

        }, 2000); 
  
    });
  };



  $("form").on("submit", function(evt) {
    
    evt.preventDefault();

    var search = $('input[name="search"]').val();
    search = search.replace(/\s+/g, '_').toLowerCase();

    var url = "https://api.instagram.com/v1/tags/"+search+"/media/recent?client_id=0c4ad7214a4744ee97512b5c072c910d";
    var picID = 0
    var num_pictures

    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function(query) {

        if(typeof query.data !== 'undefined' && query.data.length > 0){
          set_global_tid()
          swap_picture(query, picID, num_pictures, toggle)
        }else{
          alert("no pictures found for that query!")
        }

      }
    });

       

  });

});






