$(document).ready(function () {
    var searchKeyword = sessionStorage.getItem("productSearchKeyword");
    var departmentId = sessionStorage.getItem("departmentId");

    if (searchKeyword) {
        $.get("/api/products/search/" + searchKeyword, function (data) {
            $("#searchResultsContainer").append(data);
            sessionStorage.removeItem("productSearchKeyword");
        });
    }

    if (departmentId) {
        $.get("/api/products/department/" + departmentId, function (data) {
            $("#searchResultsContainer").append(data);
            sessionStorage.removeItem("departmentId");
        });
    }

    sessionStorage.clear();

});