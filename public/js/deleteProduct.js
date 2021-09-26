function myFunction(product) {
    console.log(product);

    var data = {
                    deletePageProduct: product
                }

                $.ajax({
                    url: '/products/productDelete',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType:'json',
                    success: function(data) {
                        console.log('SUCCESS');
                        window.location.replace('/users/profile');
                    },
                    error: function(data) {
                        console.log('FAILED');
                        window.location.replace('/users/profile');
                    }
                });
    
  }