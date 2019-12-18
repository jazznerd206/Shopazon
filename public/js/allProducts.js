$(document).ready(function () {
    var url = window.location.href;
    
    var searchKeyword;
    var departmentId;
    
    if (url.indexOf("?search=") !== -1) {
        searchKeyword = url.split("=")[1];
        
        getProductsFortheSearch(searchKeyword); 
     
    }
   

    
    if (url.indexOf("?department=") !== -1) {
        departmentId = url.split("=")[1];
        
        getProductsForDepartment(departmentId);
     
    }


    function getProductsFortheSearch(searchKeyword) {
        $.get("/api/products/search/" + searchKeyword, function(data) {
           
          if (data) {
            $("#searchResultsContainer").append(data);
          }
        });
      }

    function getProductsForDepartment(departmentId){
        $.get("/api/products/department/" + departmentId, function (data) {
            if (data) {
                $("#searchResultsContainer").append(data);
              }            
        });
    }



});