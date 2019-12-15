$(document).ready(function () {

    getDepartments();

    $("#submitSearch").on("click", function (event) {
        //get serach product input control
        event.preventDefault();
        var searchProductInput = $("#searchProduct").val().trim();
        if (searchProductInput) {
            searchProduct(searchProductInput);
        }
        else {
            alert("please make a valid search");
        }
    });

    function getDepartments() {
        $.get("/api/department", function (data) {
            console.log("Departments" + data);
            addDepartmentsToDropDown(data);
        });
    }

    function searchProduct(searchKeyword) {

        sessionStorage.setItem("productSearchKeyword", searchKeyword);
        window.location.replace("/products");

    }

    function addDepartmentsToDropDown(departments) {
        for (var i = 0; i < departments.length; i++) {
            $("#departmentDropDown").append("<a href='#'><li class='getProducts' data-id=" + departments[i].id + ">" + departments[i].name + "</li></a>");
        }

    }

    $("#departmentDropDown").on('click', 'li', function() {
        var dep_id=$(this).attr("data-id");
        sessionStorage.setItem("departmentId", dep_id);
        window.location.replace("/products");
        // window.location.replace("/products/department/"+dep_id);
    });



});//end of document