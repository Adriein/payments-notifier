export class AboutToExpire {
  constructor(private username: string, private daysToExpire: number, private pricing: string) {}

  private buildEmail(): string {
    return `<strong>Hola, ${this.username}</strong>. Este es un correo automático de @IvanMFit para informarte de que en ${this.daysToExpire} días vence tu asesoría ${this.pricing} contratada y es hora de renovar para seguir disfrutando de los servicios.`;
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
                  <h5 style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; color: #404040; margin-top: 0; margin-bottom: 20px; padding: 0; line-height: 135%" class="headline">El servicio está a punto de caducar 🥶</h5>
                  <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 14px; padding: 0 40px;">${this.buildEmail()} ⚡
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