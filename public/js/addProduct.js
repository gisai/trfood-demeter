function myFunction(product, percentage) {
    console.log(product);

    var data = {
                    usePageProduct: product,
                    ID: ID, 
                    percentage: percentage
                }

                $.ajax({
                    url: url,
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType:'json',
                    success: function(data) {
                        console.log('SUCCESS');
                    },
                    error: function(data) {
                        console.log('FAILED');
                    }
                });
    
  }