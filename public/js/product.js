$(document).ready(function () {

    var url = window.location.href;
    var prodId;
    $("#viewCartLink").text("");
    $("#cartPostMsg").text("");

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
        var prodQty = parseFloat($(".productQuantity").val().trim());
        


        //prepare the cart object
        var newCartItem = {
            ProductId: prodId,
            quantity: prodQty,
            status:"addedToCart",
        }

        //check if user is in
        $.get("/api/user_data").then(function (data) {

            if (data.email) {

                sessionStorage.clear();
                newCartItem.UserId = data.id;

                $.post("/api/cart", newCartItem, function () {
                  console.log("cart item added to db "+newCartItem);
                  $("#cartPostMsg").text("Your item added to cart succesfully!  ");
                  $("#viewCartLink").text("ViewCart");
                  $("#cartPostMsg").fadeIn(50);
                  $("#viewCartLink").fadeIn(50);
                })
                
            }
            else {
                
                $.get("/api/product/detail/"+prodId,function(data){                    
                   
                    newCartItem.Product=data;
                    
                    var currentSessionCart = JSON.parse(sessionStorage.getItem("userCartInSession"));
                    // now let's check if the stored value is an array
                    if (!(currentSessionCart instanceof Array)) {
                        currentSessionCart = [currentSessionCart];
                    }
    
                    var notFoundInCart = true;
    
                    if (currentSessionCart.length > 2) {
                        //check if new cart already exists        
                        for (var i = 1; i < currentSessionCart.length; i++) {
                            if (currentSessionCart[i].ProductId === newCartItem.ProductId) {
                                notFoundInCart = false;
                                currentSessionCart[i].quantity = parseFloat(currentSessionCart[i].quantity) + newCartItem.quantity;
                                break;
                            }
                        }
    
                    }
    
                    if (notFoundInCart) {
                        // if not, create one
                        currentSessionCart.push(newCartItem);
                    }
    
                    // push a new cartItem inside of it
                    sessionStorage.setItem("userCartInSession", JSON.stringify(currentSessionCart));
                    $("#cartPostMsg").text("Your item added to cart succesfully!  ");
                    $("#viewCartLink").text("ViewCart");
                    $("#cartPostMsg").fadeIn(50);
                    $("#viewCartLink").fadeIn(50);
    
                })
                
                
               
            }
        })

    });

});  //end of document