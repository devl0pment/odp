

const nodemailer = require('nodemailer');

const { google } = require('googleapis');

const { OAuth2 } = google.auth();
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_SECTRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(
    MAILING_ID,
    MAILING_SECTRET,
    MAILING_REFRESH,
    oauth_link
);

exports.sendVerificationEmail = async (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });

    const accessToken = authgetAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECTRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        },
    });

    const mailOptions = {
        from: `"${name}" <${EMAIL}>`,
        to: email,
        subject: 'odp email verification',
        html: `<p>Hello ${name},</p>`,

    }

    smtp.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return res;
    });

}