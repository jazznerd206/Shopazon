$(document).ready(function () {

    var url = window.location.href;
    var prodId;

    var splits = url.split('/');
    prodId = splits[splits.length - 1];
    if (prodId) {
        $.get("/api/product/" + prodId, function (data) {
            $("#productViewContainer").append(data);
        });
    }


    //var userCartInSession;



    $("#productViewContainer").on("click", ".addToCartBtn", function (event) {
        event.preventDefault();
        var prodQty = $(".productQuantity").val().trim();
        alert(prodQty);

        //prepare the cart object
        var newCartItem = {
            product_id: prodId,
            product_quantity: prodQty
        }
        var currentSessionCart = JSON.parse(sessionStorage.getItem("userCartInSession"));
        // now let's check if the stored value is an array
        if (!(currentSessionCart instanceof Array)) {
            currentSessionCart = [currentSessionCart];
        }

        var notFoundInCart = true;
        alert(currentSessionCart.length);

        if (currentSessionCart.length > 1) {
            //check if new cart already exists        
            for (var i = 0; i < currentSessionCart.length; i++) {
                if (currentSessionCart[i].product_id === newCartItem.product_id) {
                    notFoundInCart = false;
                    currentSessionCart[i].product_quantity = currentSessionCart[i].product_quantity + newCartItem.product_quantity;
                    break;
                }
            }

        }

        if (notFoundInCart) {
            // if not, create one
            currentSessionCart.push(newCartItem);
        }

        // push a new student inside of it
        sessionStorage.setItem("userCartInSession", JSON.stringify(currentSessionCart));

    });





});  //end of document