export const emailTemplates = {
  resetPasswordEmailText: (OTP: number) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Quthm</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333333;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        font-size: 24px;
        font-weight: 600;
        color: #1a73e8;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
        color: #555555;
        margin: 0 0 10px;
      }
      .otp {
        font-size: 22px;
        font-weight: bold;
        color: #1a73e8;
        margin: 10px 0;
      }
      .footer {
        font-size: 14px;
        color: #888888;
        margin-top: 30px;
      }
      .footer a {
        color: #1a73e8;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Your Password</h1>
      <p>Hi there,</p>
      <p>We received a request to reset your password. To proceed, please use the One-Time Password (OTP) below:</p>
      <p class="otp">${OTP}</p>
      <p>This OTP is valid for the next 5 minutes. If you did not request a password reset, you can ignore this email.</p>
      <p>Thank you for your attention.</p>
      <div class="footer">
        <p>Best regards,<br>
          Quthm Pvt Ltd<br>
          <a href="mailto:contact@Quthm.com">contact@Quthm.com</a><br>
          <a href="https://Quthm.com">www.Quthm.com</a>
        </p>
      </div>
    </div>
  </body>
  </html>`;
  },

  verifyEmailText: (OTP: number) => {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            color: #1a73e8;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
          }
          .otp {
            font-size: 22px;
            font-weight: bold;
            color: #1a73e8;
            justify-content: center;
          }
          .footer {
            font-size: 14px;
            color: #888888;
            margin-top: 30px;
          }
          .footer a {
            color: #1a73e8;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verify your email address</h1>
          <p>Hi there,</p>
          <p>Thank you for signing up with Quthm. To complete your registration, please enter the following One-Time Password (OTP) in the app:</p>
          <p class="otp">${OTP}</p>
          <p>This OTP is valid for the next 5 minutes. If you didn't request this, you can safely ignore this email.</p>
          <p>Thanks for choosing Quthm!</p>
          <div class="footer">
            <p>Best regards,</p>
            <p>Quthm Pvt Ltd<br>
              <a href="mailto:contact@Quthm.com">contact@Quthm.com</a><br>
              <a href="https://Quthm.com">www.Quthm.com</a>
            </p>
          </div>
        </div>
      </body>
      </html>`;
  },
};
