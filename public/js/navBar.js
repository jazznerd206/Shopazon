$(document).ready(function () {

    $.get("/api/user_data").then(function (data) {
        if (data.id) {
            $("#userName").text("Hello " + data.name);
            //    $("shoppingCartBtn").attr("data-id",data.id);
            //    alert("id===="+data.id);
            //    alert($("shoppingCartBtn").attr("data-id").val());
        }
    })

    $("#submitSearch").on("click", function (event) {

        //get serach product input control
        event.preventDefault();
        var searchProductInput = $("#searchProduct").val().trim();
        if (searchProductInput) {
            window.location.href = "/products/?search=" + searchProductInput;
        }
        else {
            alert("please make a valid search");
        }
    });

    getDepartments();
    updateShoppingCartItemCount();


    function getDepartments() {
        $.get("/api/department", function (data) {
            console.log("Departments" + data);
            addDepartmentsToDropDown(data);
        });
    }


    function updateShoppingCartItemCount() {
        //need to implement

    }

    function addDepartmentsToDropDown(departments) {
        for (var i = 0; i < departments.length; i++) {
            $("#departmentDropDown").append("<a href='#'><li class='getProducts' data-id=" + departments[i].id + ">" + departments[i].name + "</li></a>");
        }

    }

    $("#departmentDropDown").on("click", "li", handleDept_Products_Request);

    function handleDept_Products_Request() {
        var dep_id = $(this).attr("data-id");
        window.location.href = "/products/?department=" + dep_id;
    };


    $(document).on("click", "#shoppingCartBtn", showCart);

    function showCart() {
        window.location.href = "/mycart";
    }

    $(document).on("click",".cell-logo",function(){
        window.location.replace("/");
            })

});//end of document
