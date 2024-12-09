import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { OrderModel } from '../models/order.model';
import { Formatter } from '../../helpers/formatter';
import { FormatterDate } from '../../helpers/formatterDate';
import { SlaceId } from '../../helpers/sliceId';

const logo: Content = {
  image: 'src/assets/logo.png',
  width: 120,
};

const styles: StyleDictionary = {
  h1: {
    fontSize: 20,
    bold: true,
    margin: [0, 4],
  },
  h2: {
    fontSize: 16,
    bold: true,
    margin: [0, 4],
  },
  h3: {
    fontSize: 14,
    bold: true,
    margin: [0, 4],
  },
};

export const billReport = ({
  _id,
  detail,
  purchaser,
  createAt,
}: OrderModel): TDocumentDefinitions => {
  return {
    header: {
      text: 'Bill Report',
      alignment: 'right',
      margin: [10, 10],
    },
    footer: {
      text: 'Generado por Purple.dev',
      alignment: 'right',
      margin: [10, 10],
    },
    content: [
      logo,
      {
        text: 'Purple.dev',
        style: 'h1',
      },
      {
        columns: [
          {
            text: [
              {
                text: 'Av. 9 de Julio de 1816 - N° 16652\n',
                style: 'h3',
              },
              'Villa Victoria, CP 78454\nTel: (65548) 21214787\n',
              {
                link: 'https://walter-carrizo.netlify.app',
                text: 'walter-carrizo.com',
              },
            ],
          },
          {
            text: [
              {
                text: `Id de la factura: #${SlaceId.value(_id)}\n`,
                style: 'h3',
              },
              `Fecha: ${FormatterDate.formatDate(createAt)}\nHora: ${FormatterDate.formatTime(createAt)}`,
            ],
            alignment: 'right',
          },
        ],
      },

      // Código QR de la dirección
      {
        qr: 'https://walter-carrizo.netlify.app',
        fit: 100,
        alignment: 'right',
      },

      //Datos del cliente
      {
        text: [
          { text: 'Cobrar a:\n', style: 'h2' },
          `${purchaser.name} ${purchaser.lastname}\n${purchaser.email}\n${purchaser.addresses[0].street} ${purchaser.addresses[0].number}, ${purchaser.addresses[0].city}`,
        ],
      },

      //Tabla de datos del pedido
      {
        margin: [0, 20],
        layout: 'lightHorizontalLines',
        table: {
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Producto', 'Precio', 'Cantidad', 'Total'],
            ...detail.items.map((item) => [
              { text: SlaceId.value(item.product._id) },
              item.product.name,
              Formatter.currency(item.product.price),
              item.quantity,
              {
                text: Formatter.currency(item.subtotal),
                bold: true,
                alignment: 'right',
              },
            ]),

            // Totales de la tabla
            [{}, {}, {}, {}, {}],
            [
              { text: 'Subtotal', colSpan: 4, alignment: 'right' },
              {},
              {},
              {},
              {
                text: Formatter.currency(detail.total),
                bold: true,
                alignment: 'right',
              },
            ],
            [
              { text: 'Iva 16%', colSpan: 4, alignment: 'right' },
              {},
              {},
              {},
              {
                text: Formatter.currency(detail.total * 0.16),
                bold: true,
                alignment: 'right',
              },
            ],
            [
              {},
              {},
              {
                text: 'Total',
                colSpan: 2,
                alignment: 'right',
                bold: true,
                margin: [5, 5],
                fillColor: 'black',
                color: 'white',
                fontSize: 14,
              },
              {},
              {
                text: Formatter.currency(detail.total * 0.16 + detail.total),
                bold: true,
                margin: [5, 5],
                alignment: 'right',
                fillColor: 'black',
                color: 'white',
                fontSize: 14,
              },
            ],
          ],
        },
      },
    ],
    styles: styles,
  };
};
