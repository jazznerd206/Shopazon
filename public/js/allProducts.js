$(document).ready(function(){
    var searchKeyword=sessionStorage.getItem("productSearchKeyword");
    console.log("Keyword searched and loaded from session "+searchKeyword);

    $.get("/api/products/search/" + searchKeyword, function(data) {
        console.log("HTML", data);
        if(data.length===0)   
        {       
        $("#searchResultsContainer").append(data);
        }
        else{
            $("#searchResultsContainer").append("<h1>NO RESULTS</h1>");
        }
              
      });


});