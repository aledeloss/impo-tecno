const { handlebars } = require('hbs');

const newOrderEmailTemplate = (newOrder) => {
  const tableBodyStructure = '{{#each items}}<tr style="padding: 3px; background-color: #fff"><td style="padding: 3px;">{{trademark}}</td><td style="padding: 3px;">{{name}}</td><td style="padding: 3px;">{{quantity}}</td><td style="padding: 3px;">$ {{price}}</td><tr>{{/each}}';
  const TbodyTemplate = handlebars.compile(tableBodyStructure);
  const TBodyRender = TbodyTemplate(newOrder);

  const headingData = '<p>Tu orden de compra Nº {{code}} fue recibida. Nos pondremos en contacto para continuar con el trámite.</p>';
  const headingTemplate = handlebars.compile(headingData);
  const headingRender = headingTemplate(newOrder);

  const totalData = '<tr style="color: #002e8f; margin-top: 25px;"><td style="padding: 3px;" colspan="2">Estado: pago pendiente</td><td style="padding: 3px;">Total</td><td style="padding: 3px;">$ {{total}}</td></tr>';
  const totalTemplate = handlebars.compile(totalData);
  const totalRender = totalTemplate(newOrder);

  return `
  <!doctype html>
  <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      </head>
      <body style="background-color: #CCEAFF; padding: 3px; margin-left: 10px;">
        <img src="cid:logo@nodemailer.com" width="200px">
          <div style="margin-left: 10px;">
            ${headingRender}
            <h2>Detalle del pedido:</h2>
            <table style="margin-left: 10px; border: none; margin-right: 10px;">
              <thead>
                <tr style="padding: 3px; background-color: #CCEAFF;">
                  <th style="padding: 3px;" width="200px" align="left">Marca</th>
                  <th style="padding: 3px;" width="300px" align="left">Modelo</th>
                  <th style="padding: 3px;" width="100px" align="left">Precio</th>
                  <th style="padding: 3px;" width="100px" align="left">Cantidad</th>
                </tr>
              <thead>
                <tbody style="border-radius: 5px">
                  ${TBodyRender}
                  ${totalRender}
                </tbody>
            </table>
 
          </div>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </body>
    </html>
    `;
};

module.exports = { newOrderEmailTemplate };
