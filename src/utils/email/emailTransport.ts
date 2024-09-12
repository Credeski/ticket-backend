import nodemailer from "nodemailer";

type Options = {
    email: string;
    subject: string;
    html: string;
};

export const sendTheEmail = async (options: Options): Promise<void> => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.html
    };
    await transport.sendMail(mailOptions);
};
