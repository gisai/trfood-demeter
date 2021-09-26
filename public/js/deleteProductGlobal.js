function myFunction(product) {

    var data = {
                    deletePageProduct: product
                }

                $.ajax({
                    url: '/products/productDeleteGlobal',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType:'json',
                    success: function(data) {
                        console.log('SUCCESS');
                        window.location.replace('/products/globalProductEdit');
                    },
                    error: function(data) {
                        console.log('FAILED');
                        window.location.replace('/products/globalProductEdit');
                    }
                });
    
  }