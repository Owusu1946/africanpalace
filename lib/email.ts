import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOTPEmail(email: string, otp: string, userName: string) {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f7f7; padding: 20px; }
                .container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                .header { background: #000000; padding: 40px 20px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase; }
                .content { padding: 40px; text-align: center; }
                .content h2 { color: #1a1a1a; margin-top: 0; font-size: 22px; }
                .content p { color: #666666; line-height: 1.6; font-size: 16px; }
                .otp-box { background: #f0f0f0; border-radius: 12px; padding: 20px; margin: 30px 0; display: inline-block; }
                .otp-code { font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #000000; margin-left: 12px; }
                .footer { padding: 20px; text-align: center; color: #999999; font-size: 12px; border-top: 1px solid #eeeeee; }
                .highlight { color: #000000; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>The African Palace</h1>
                </div>
                <div class="content">
                    <h2>Verify Your Heritage</h2>
                    <p>Hello <span class="highlight">${userName}</span>,</p>
                    <p>Welcome to the African Palace family. To complete your registration and secure your account, please use the following verification code:</p>
                    <div class="otp-box">
                        <span class="otp-code">${otp}</span>
                    </div>
                    <p>This code will expire in <span class="highlight">10 minutes</span>. If you did not request this, please ignore this email.</p>
                </div>
                <div class="footer">
                    &copy; 2026 The African Palace, Tamale. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;

    await transporter.sendMail({
        from: `"The African Palace" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verify Your Identity - The African Palace",
        html: htmlContent,
    });
}

export async function sendResetEmail(email: string, resetLink: string, userName: string) {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f7f7; padding: 20px; }
                .container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                .header { background: #000000; padding: 40px 20px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase; }
                .content { padding: 40px; text-align: center; }
                .content h2 { color: #1a1a1a; margin-top: 0; font-size: 22px; }
                .content p { color: #666666; line-height: 1.6; font-size: 16px; }
                .btn-box { margin: 35px 0; }
                .btn { background: #000000; color: #ffffff; padding: 18px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; display: inline-block; }
                .footer { padding: 20px; text-align: center; color: #999999; font-size: 12px; border-top: 1px solid #eeeeee; }
                .highlight { color: #000000; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>The African Palace</h1>
                </div>
                <div class="content">
                    <h2>Restore Your Access</h2>
                    <p>Hello <span class="highlight">${userName}</span>,</p>
                    <p>We received a request to reset the password for your African Palace account. Click the button below to choose a new one:</p>
                    <div class="btn-box">
                        <a href="${resetLink}" class="btn">Reset Password</a>
                    </div>
                    <p>This link will expire in <span class="highlight">1 hour</span>. If you did not request this change, you can safely ignore this email.</p>
                </div>
                <div class="footer">
                    &copy; 2026 The African Palace, Tamale. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;

    await transporter.sendMail({
        from: `"The African Palace" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Reset Your Password - The African Palace",
        html: htmlContent,
    });
}

export async function sendBookingConfirmationEmail(email: string, details: {
    userName: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    bookingId: string;
}) {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f7f7; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                .header { background: #000000; padding: 40px 20px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase; }
                .content { padding: 40px; }
                .content h2 { color: #1a1a1a; margin-top: 0; font-size: 24px; text-align: center; }
                .content p { color: #666666; line-height: 1.6; font-size: 16px; }
                .booking-details { background: #f9f9f9; border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #eeeeee; }
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
                .detail-label { color: #999999; text-transform: uppercase; letter-spacing: 0.1em; }
                .detail-value { color: #000000; font-weight: bold; }
                .total-row { border-top: 1px solid #eeeeee; margin-top: 15px; pt: 15px; font-size: 18px; }
                .btn-box { text-align: center; margin: 35px 0; }
                .btn { background: #000000; color: #ffffff; padding: 18px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; display: inline-block; }
                .footer { padding: 20px; text-align: center; color: #999999; font-size: 12px; border-top: 1px solid #eeeeee; }
                .highlight { color: #000000; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>The African Palace</h1>
                </div>
                <div class="content">
                    <h2>Reservation Confirmed</h2>
                    <p>Hello <span class="highlight">${details.userName}</span>,</p>
                    <p>Your luxury stay at The African Palace is officially reserved. We are preparing to welcome you for a truly authentic experience.</p>
                    
                    <div class="booking-details">
                        <div class="detail-row">
                            <span class="detail-label">Room</span>
                            <span class="detail-value">${details.roomName}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Check-In</span>
                            <span class="detail-value">${details.checkIn}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Check-Out</span>
                            <span class="detail-value">${details.checkOut}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Guests</span>
                            <span class="detail-value">${details.guests}</span>
                        </div>
                        <div class="detail-row total-row" style="padding-top: 15px;">
                            <span class="detail-label" style="color: #000000; font-weight: bold;">Total Amount</span>
                            <span class="detail-value" style="font-size: 20px;">GHC ${details.totalPrice}</span>
                        </div>
                    </div>

                    <p style="text-align: center; font-size: 14px; color: #999999;">Booking ID: ${details.bookingId}</p>

                    <div class="btn-box">
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/profile" class="btn">View My Bookings</a>
                    </div>
                </div>
                <div class="footer">
                    &copy; 2026 The African Palace, Tamale. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;

    await transporter.sendMail({
        from: `"The African Palace" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Your Stay is Confirmed - ${details.roomName}`,
        html: htmlContent,
    });
}
