

$(document).ready(function () {

    var stripePublicKey = "pk_test_b4AAxcmoeMP5eZA8wAxIGRio00UfmNadj1";

    loadCart();

    var itemCount = $('div.checkout-summary-item grid-x').length;
    $("#itemCount").text(itemCount);

    function loadCart() {
        //get user 
        $.get("/api/user_data").then(function (data) {

            //get cart items based on user
            if (data.email) {
                //get from db           
                $.get("/api/cart/status/" + "addedToCart", function (data1) {
                    $.ajax({
                        type: 'POST',
                        url: '/api/mycart',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ carts: data1 }),
                        dataType: 'json'
                    }).done(function (res) {
                        $.get("/api/mycart/", function (data) {
                            if (data) {
                                $("#loadCartDiv").append(data);
                            }
                        });

                    });
                })
            }
            else {

                var currentSessionCart = JSON.parse(sessionStorage.getItem("userCartInSession"));

                // now let's check if the stored value is an array
                if (currentSessionCart) {
                    if (!(currentSessionCart instanceof Array)) {
                        currentSessionCart = [currentSessionCart].slice(1, currentSessionCart.length - 1);

                    }

                    $.ajax({
                        type: 'POST',
                        url: '/api/mycart',
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ carts: currentSessionCart }),
                        dataType: 'json'
                    }).done(function (res) {
                        $.get("/api/mycart/", function (data) {
                            if (data) {
                                $("#loadCartDiv").append(data);
                            }
                        });

                    });
                }
                else {
                    $("#loadCartDiv").append("<h1> No Items are added to your cart</h1> <button> <a href=" / " Start Shopping</a></button>");

                }

            }
        })
    }

    $("#loadCartDiv").on("change", ".qtyInput", function () {

        var price = $(this).parent().parent().find(".itemPrice").text();
        var oldCartItemCostString = $(this).parent().parent().parent().find(".cartItemCost").text();
        var oldCartItemCostNumber = parseFloat(oldCartItemCostString.substring(1, oldCartItemCostString.length));
        var newCartItemCostNumber = $(this).val() * parseFloat(price.substring(1, price.length));
        $(this).parent().parent().parent().find(".cartItemCost").text("$" + newCartItemCostNumber);

        var oldsubTotal = parseFloat($("#subTotalValueSpan").text().substring(1, $("#subTotalValueSpan").text().length));
        var newsubTotal = parseFloat((oldsubTotal + (newCartItemCostNumber - oldCartItemCostNumber)).toFixed(2));
        var newshippingValue = parseFloat((newsubTotal * 0.2).toFixed(2));
        var newTaxValue = parseFloat((newsubTotal * 0.1).toFixed(2));
        var finalValue = parseFloat(newsubTotal + newshippingValue + newTaxValue).toFixed(2);
        $("#subTotalValueSpan").text("$" + newsubTotal);
        $("#topTotalValueSpan").text("$" + finalValue);
        $("#totalFinalValueSpan").text("$" + finalValue);
        $("#taxValueSpan").text("$" + newTaxValue);
        $("#shippingValueSpan").text("$" + newshippingValue);

    });



    var stripeHandler = StripeCheckout.configure({
        key: stripePublicKey,
        locale: 'en',
        token: function (token) {

            //update every cart for that user to ordered status

            $(".carts").each(function () {


            })

            $.ajax({
                type: 'POST',
                url: '/api/purchase',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ stripeTokenId: token.id, items: carts }),
                dataType: 'json',
                success: function (res) {
                    alert("Payment Succesful");
                },
                //         return res.json(),
                error: function (error) {
                    console.error(error)
                }
            });

            // $.post("", {
            //     stripeTokenId: token.id,
            //     items: items
            // }, function (req, res) {


        }//end token
    });

    $("#loadCartDiv").on("click", ".payAmt", function () {

        var price = parseFloat(($("#totalFinalValueSpan").text().substring(1, $("#totalFinalValueSpan").text().length)) * 100);
        $.get("/api/user_data").then(function (data) {

            //get cart items based on user
            if (data.email) {
                stripeHandler.open({
                    amount: price
                })
            }
            else {
                alert("Please login or register to checkout");
            }
        });
    });


    $(document).on("click", ".itemRemove", handleRemoveItem);

    function handleRemoveItem() {
        $(this).remove();

        //delete item from db
    }
});