$(document).ready(function () {

    var stripePublicKey="pk_test_b4AAxcmoeMP5eZA8wAxIGRio00UfmNadj1";
    $.get("/api/mycart", function (data) {                
        $("#loadCartDiv").append(data); 
             
    });    
    

    $("#loadCartDiv").on("change", ".qtyInput", function () {

        var price = $(this).parent().parent().find(".itemPrice").text();
        var oldCartItemCostString = $(this).parent().parent().parent().find(".cartItemCost").text();
        var oldCartItemCostNumber = parseFloat(oldCartItemCostString.substring(1, oldCartItemCostString.length));
        var newCartItemCostNumber = $(this).val() * parseFloat(price.substring(1, price.length));
        $(this).parent().parent().parent().find(".cartItemCost").text("$" + newCartItemCostNumber);

        var oldsubTotal = parseFloat($("#subTotalValueSpan").text().substring(1, $("#subTotalValueSpan").text().length));
        var newsubTotal = parseFloat((oldsubTotal + (newCartItemCostNumber - oldCartItemCostNumber)).toFixed(2));
        var newshippingValue=parseFloat((newsubTotal*0.2).toFixed(2));
        var newTaxValue=parseFloat((newsubTotal*0.1).toFixed(2));
        var finalValue=parseFloat(newsubTotal+newshippingValue+newTaxValue).toFixed(2);
        $("#subTotalValueSpan").text("$" + newsubTotal);
        $("#topTotalValueSpan").text("$" + finalValue);
        $("#totalFinalValueSpan").text("$" + finalValue);
        $("#taxValueSpan").text("$" + newTaxValue);
        $("#shippingValueSpan").text("$" + newshippingValue);

    });



    var stripeHandler = StripeCheckout.configure({
        key: stripePublicKey,
        locale: 'en',
        token: function(token) {
            // var items = []
            // var cartItemContainer = document.getElementsByClassName('cart-items')[0]
            // var cartRows = cartItemContainer.getElementsByClassName('cart-row')
            // for (var i = 0; i < cartRows.length; i++) {
            //     var cartRow = cartRows[i]
            //     var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            //     var quantity = quantityElement.value
            //     var id = cartRow.dataset.itemId
            //     items.push({
            //         id: id,
            //         quantity: quantity
            //     })
            }
    
        //     fetch('/purchase', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             stripeTokenId: token.id,
        //             items: items
        //         })
        //     }).then(function(res) {
        //         return res.json()
        //     }).then(function(data) {
        //         alert(data.message)
        //         var cartItems = document.getElementsByClassName('cart-items')[0]
        //         while (cartItems.hasChildNodes()) {
        //             cartItems.removeChild(cartItems.firstChild)
        //         }
        //         updateCartTotal()
        //     }).catch(function(error) {
        //         console.error(error)
        //     })
        // }
    })

    $("#loadCartDiv").on("click",".payAmt",function(){
        var price = parseFloat(($("#totalFinalValueSpan").text().substring(1, $("#totalFinalValueSpan").text().length))*100);  
        
        stripeHandler.open({
            amount: price
        })

    })   


    // var cartItems=[];

    // //check for user
    // $.get("/api/user_data").then(function (data) {
    //     console.log(data.email);
    //     if(data.id){

    //          //load from db
    //          //get data from db
    //         $.get("/api/carts").then(function(data){
    //             //get cart items from carts table whose user id ==data.id

    //         });

    //         //load to the container           



    //     }
    //     else{

    //         //load from sessionStorage

    //     }
    // })




});