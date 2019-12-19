

$(document).ready(function () {

    var stripePublicKey = "pk_test_b4AAxcmoeMP5eZA8wAxIGRio00UfmNadj1";

    alert("point2");
    loadCart();

    function loadCart() {
        //get user 
        alert("point3");
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
                    alert("no data in session");
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
            // var cartitemsOrdered = [];
            //
            // var cartItemContainer = $(".carts");
            // var cartRows = cartItemContainer.getElementsByClassName('cart-row');
            // for (var i = 0; i < cartRows.length; i++) {
            //     var cartRow = cartRows[i]
            //     var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            //     var quantity = quantityElement.value
            //     var id = cartRow.dataset.itemId
            //     items.push({
            //         id: id,
            //         quantity: quantity
            //     })    
            alert("token code");
            $(".carts").each(function () {
                alert($this);

            })
            var carts = [
                {
                    name: "Mustela",
                    description: "Stress-Free Skin Care Simplify your baby's skin care routine while protecting against dry skin on baby's face, nose, cheeks, and lips. Use Mustela",
                    price: 5.00,
                    image: "https://picsum.photos/id/100/2500/1656",
                    quantity: 2
                },
                {
                    name: "Aveeno Shampoo",
                    description: "Rich lathering wash & shampoo formula rinses clean & leaves a light, fresh fragrance Gentle and tear-free formula cleanses without drying",
                    price: 7.00,
                    image: "https://picsum.photos/id/100/2500/1656",
                    quantity: 4
                }

            ]
            alert("CARTS" + carts);

            $.ajax({
                type: 'POST',
                url: '/api/purchase',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ stripeTokenId: token.id, items: carts }),
                dataType: 'json',
                success: function (res) {
                    alert("succedded");
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
    })

    $("#loadCartDiv").on("click", ".payAmt", function () {
        var price = parseFloat(($("#totalFinalValueSpan").text().substring(1, $("#totalFinalValueSpan").text().length)) * 100);

        stripeHandler.open({
            amount: price
        })

    })


    $(document).on("click", ".itemRemove", handleRemoveItem);

    function handleRemoveItem() {
        alert($(this));
    }


})