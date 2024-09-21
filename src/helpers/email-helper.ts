import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { transporter } from '../connections/connection.nodemailer.js';
// import EmailResponseModel from '../models/emailResponseModel'

export async function sendOptEmail(mailOptions: MailOptions) {
  const options: MailOptions = {
    ...mailOptions,
    // from: workSpaceEmail,
  };
  console.log({ to: options.to });
  let request;
  try {
    request = await transporter.sendMail(options);
  } catch (error) {
    throw error;
  }

  // const emailResponse = {
  //   ...options,
  //   response: {
  //     accepted: request.accepted,
  //     rejected: request.rejected,
  //   },
  //   dateTime: Date.now(),
  // };
  //   await EmailResponseModel.create(emailResponse);
  return request;
}
