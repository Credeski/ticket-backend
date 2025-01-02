import type Mail from "nodemailer/lib/mailer";

export const createMailOptions = (toEmail: string): Mail.Options => {
  return {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: "Greetings",
    html: `
      <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 20px; border: 1px solid #ccc;">
            <br>
            <br>
            <p>GOOD MORNING</p>
          </td>
        </tr>
      </table>
    </body>
    `
  };
};
