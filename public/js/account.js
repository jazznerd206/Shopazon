$(document).on("click", ".editButton", function () {
    var customerID = $(this).data("id");
    var spanId = $(this).prev().attr("id");

    $("#" + spanId).replaceWith(function () {
        // if the spanId is accountPassword then replace span with password input fields
        if (spanId === "accountPassword") {
            // holds html for editing password fields
            var passwordFields = $("<div>")
                .attr({ id: spanId })
                .append("<div>New Password: ")
                .append('<input id=password1 type=password>')
                .append("<div> Confirm Password: ")
                .append('<input id=password2 type=password>');

            return passwordFields;
        }

        // if spanId is not accountPassword then replace span with text input fields
        return $('<input type=text>').attr({
            id: spanId,
            value: $(this).text()
        });
    });
    // replaces edit button with done button
    $(this).text("Done").removeClass("editButton").addClass("doneButton");
});

$(document).on("click", ".doneButton", function () {
    var inputId = $(this).prev().attr("id");
    var text = $("#" + inputId).val();
    if (inputId === "accountPassword") {
        // holds password values
        var password1 = $("#password1").val();
        var password2 = $("#password2").val();
        // checks to see password is not blank
        if (password1 === "") {
            alert("Password cannot be blank");
        } else {
            // checks to see if passwords match
            if (password1 !== password2) {
                alert("Passwords must match");
            } else {
                $("#" + inputId).replaceWith(function () {
                    alert("Password changed successfully");
                    return $('<span>').attr("id", inputId);
                });
            }
        }
    }
    $("#" + inputId).replaceWith(function () {
        return $('<span>').attr("id", inputId).text(text);
    });

    // replaces done button with edit button
    $(this).text("Edit").removeClass("doneButton").addClass("editButton");
});