$(document).ready(function () {

    getDepartments();

    $("#submitSearch").on("click", function (event) {
        //get serach product input control
        event
        var searchProductInput = $("#searchProduct").val().trim();
        if (searchProductInput) {
            alert(searchProductInput);
            searchProduct(searchProductInput);
        }
        else {
            alert("please enter correct input");
        }
    });

    function getDepartments()
    {
        $.get("/api/department", function(data) {
            console.log("Departments"+data); 
            addDepartmentsToDropDown(data);         
                  
          });
        }

    function searchProduct(searchKeyword) {

        sessionStorage.setItem("productSearchKeyword",searchKeyword);
        window.location.replace("/products");       
        
    } 

    function addDepartmentsToDropDown(departments){
        for(var i=0;i<departments.length;i++){
            var listItem=$("<li>");
            listItem.data("id",departments[i].id);

            var departmentLink=$("<a>");
            departmentLink.text(departments[i].name);
            departmentLink.attr("href","/products/"+departments[i].id);
            listItem.append(departmentLink);
            

            console.log(listItem);
            $("#departmentDropDown").append(listItem);
        }
        
    }


});//end of document