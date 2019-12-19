function closeForm() {
    $(".form-popup").css("display", "none");
    //$(".modal-container").css("display", "none");
    
};

$(document).ready(function () {
    // Getting references to our form and inputs
    var loginForm = $("#loginForm");
    var registerForm = $("#registerForm");

    $("#loginBtn").on("click",
        function () {
            loginForm.css("display", "block");
        });

    $("#registerBtn").on("click",
        function () {
            registerForm.css("display", "block");
            $("#registerMsg").text("");
        });

    // LOGIN LOGIC
    var loginEmailInput = $("#loginInputEmail");
    var loginPasswordInput = $("#loginInputPassword");

    // When the form is submitted, we validate there's an email and password entered
    $(".login").on("submit", function (event) {
        event.preventDefault();
        var userData = {
            email: loginEmailInput.val().trim(),
            password: loginPasswordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // console.log(userData);

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);

        loginEmailInput.val("");
        loginPasswordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (res) {
            $.get("/api/user_data").then(function (data) {
                closeForm();
                // $("#loginBtn").css("display", "none");
                if (data.email) {
                    $("#userName").text("Hello " + data.name);
                }
                window.location.replace(res);
            });
            // If there's an error, log the error
        }).catch(handleLoginErr);
    }



    //signup logic
    

    $(".register-form").on("submit", function (event) {
        event.preventDefault();
        
        var userData = {
            name: $("#RegisterInputName").val().trim(),
            email: $("#RegisterInputEmail").val().trim(),
            password: $("#RegisterInputPassword").val().trim()
        };

        if (!userData.name || !userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.name, userData.email, userData.password);
        $("#RegisterInputName").val("");
        $("#RegisterInputEmail").val("");
        $("#RegisterInputPassword").val("");
    });

    $("#registerMsg").on("click", function () {
        //close the form
        closeForm();
        //click login button
        $("#loginBtn").click();

    })

    $("#loginMsg").on("click", function () {
        //close the form
        closeForm();
        //click login button
        $("#registerBtn").click();

    })

    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(name, email, password) {
        $.post("/api/signup", {
            name: name,
            email: email,
            password: password
        }).then(function (res) {
            $.get("/api/user_data").then(function (data) {
                $("#registerMsg").text("Succesfully Registered. Please Login");
                //window.location.replace();               
            });

            // If there's an error, handle it by throwing up a boostrap alert
        }).catch(handleLoginErr);
    }

    $("#logOutBtn").on("click",function(){
        $.get("/api/logout").then(function (data) {       
            window.location.replace();       
        })
    })

    function handleLoginErr(err) {
       
        if(err.responseText==="Unauthorized")
        {
            
            $("#alert .msg").text("please enter valid credentials");
        }
        else{
            $("#alert .msg").text(err.responseJSON);
        }     
        
        $("#alert").fadeIn(50);
    }

});

