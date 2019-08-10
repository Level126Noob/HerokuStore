$( () => {
    $(".deletebutton").on("click", function (event) {
        let id = $(this).data("id");

        $.ajax("/api/products/" + id, {
            type: "DELETE"
        }).then(
            () => {
                console.log("deleted id", id);
                location.reload();
            }
        );
    });




    $(".addproduct").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newProduct = {
            product_name: $("#product_name").val().trim(),
            stock_quantity: $("#stock_quantity").val().trim(),
            price: $("#price").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/products", {
            type: "POST",
            data: newProduct
        }).then(
            function () {
                console.log(newProduct);
                location.reload();
            }
        );
    });

    $(".update-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

      var updatedProduct = {
            product_name: $("#productName").val().trim(),
            stock_quantity: $("#stockQuantity").val().trim(),
            price: $("#pricez").val().trim()
        };

        console.log(updatedProduct);
        var id = $(this).data("id");
        console.log(id);

        // Send the POST request.
        $.ajax("/api/products/" + id, {
            type: "PUT",
            data: updatedProduct
        }).then(
            function () {
                console.log("updated product");
                // Reload the page to get the updated list
                location.assign("/");
            }
        );
    });
});