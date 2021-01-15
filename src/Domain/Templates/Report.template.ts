import { User } from '../Entities/User.entity';
import { Template } from './Template';

export type ReportType = {
  summary: { defaulters: number; notifieds: number; total: number };
  defaulters: User[];
  notifieds: User[];
};

export class Report extends Template {
  protected user: User;
  constructor(private report: ReportType) {
    super();
    this.user = report.defaulters[0];
  }

  public generate(): string {
    return `
    <html>
     <body style="font-family: Arial; background-color: #f6f6f6;">
      <table width="1000"style="border: 1px solid #dddddd; line-height: 135%;"align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td bgcolor="#fcfcfc" colspan="3" width="100%" height="10">&nbsp;</td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td colspan="3" height="15">&nbsp;</td>
        </tr>
        <tr>
          <td bgcolor="#fcfcfc" colspan="3">
            <table width="600"style=" line-height: 135%;"align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td width="30" class="spacer">&nbsp;</td>
                <td align="center">
                  <h5 style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; color: #404040; margin-top: 0; margin-bottom: 20px; padding: 0; line-height: 135%" class="headline">Clientes con tarifa expirada ❌</h5>
                  ${
                    this.report.defaulters.length > 0
                      ? this.report.defaulters.map(
                          (defaulter) =>
                            `<p>${defaulter.getName()} - ${defaulter.getEmail()}</p>`
                        )
                      : 'Hoy no hay usuarios con la tarifa caducada'
                  }
                  </p>
                </td>
                <td width="30" class="spacer">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="3" height="3">&nbsp;</td>
        </tr>
         
      </table>
      </body>
    </html>
    `;
  }
}

// <html>
//     <head>
//       <style type="text/css">
//         .styled-body {
//           border: 1px solid #dddddd;
//           width: 800px;
//           margin: auto;
//           padding: 10px;
//           display:flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           border-radius: 5px;
//         }

//         .styled-header {
//           font-family: sans-serif;
//           color: #312F33;
//         }
//         .styled-footer {
//           font-family: sans-serif;
//           font-size: 12px;
//           color: #312F33;
//         }

//         .styled-table {
//           border-collapse: collapse;
//           margin: 25px 0;
//           font-size: 0.9em;
//           font-family: sans-serif;
//           min-width: 400px;
//           box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
//         }

//         .styled-table thead tr {
//           background-color: #009879;
//           color: #ffffff;
//           text-align: left;

//         }

//         .styled-table th,
//         .styled-table td {
//           padding: 12px 15px;
//         }

//         .styled-table tbody tr {
//           border-bottom: 1px solid #dddddd;
//         }

//         .styled-table tbody tr:nth-of-type(even) {
//           background-color: #f3f3f3;
//         }

//         .styled-table tbody tr:last-of-type {
//           border-bottom: 2px solid #009879;
//         }
//       </style>
//     </head>

//     <body class="styled-body">
//       <div class="styled-header">
//         <h2>Resumen - 25/12/2020 💻</h2>
//       </div>
//       <div>
//         <table class="styled-table">
//           <thead>
//             <tr>
//               <th>Tarifa expirada ❌</th>
//               <th>Nombre 👦</th>
//               <th>Correo 📬</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${this.report.defaulters.map((defaulter, index) => (
//                 `<tr>
//                     <td>${index + 1}</td>
//                     <td>${defaulter.getName()}</td>
//                     <td>${defaulter.getEmail()}</td>
//                 </tr>`
//             ))}

//           </tbody>
//         </table>
//         <table class="styled-table">
//           <thead>
//             <tr>
//               <th>Apunto de expirar ❗</th>
//               <th>Nombre 👦</th>
//               <th>Correo 📬</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${this.report.notifieds.map((notified, index) => (
//                 `<tr>
//                     <td>${index + 1}</td>
//                     <td>${notified.getName()}</td>
//                     <td>${notified.getEmail()}</td>
//                 </tr>`
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div class="styled-footer">
//         <p>Este es un correo automático de @IvanMFit</p>
//       </div>
//     </body>
//     </html>
