const newOrderEmailTemplate = (newOrder) => {
  const itemsTable = (newOrder) => {
    return newOrder.items.forEach((item) => {
      return 'hi';
      //   return `<tr>
      //   <th>${item.name}</th>
      //   <th>${item.quantity}</th>
      //   <th>${item.price}</th>
      // </tr>`;
    });
  };

  // agregar link de boostrap y chauchi
  return `
  <!doctype html>
  <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        </script>

      </head>
      <body>
        <img src="cid:logo@nodemailer.com">
        <h2>Tu orden de compra fue recibida.</h2>
        <h4> Nos comunicaremos con vos para continuar con el trámite.</h4>
        <h2>Detalle del pedido:</h2>
        <table id="detailTable">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          <thead>
          <tbody>
            ${itemsTable(newOrder)}
          </tbody>
        </table>
    </html>
    `;
};

module.exports = { newOrderEmailTemplate };
