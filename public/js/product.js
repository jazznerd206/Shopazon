$(document).ready(function(){

    var productViewDetail = sessionStorage.getItem("productViewDetail");
    if (productViewDetail) {
        $.get("/api/product/"+ productViewDetail,function(data){ 
            $("#productViewContainer").append(data);        
            sessionStorage.removeItem("productViewDetail");
        });
    }
   
    



});  //end of document