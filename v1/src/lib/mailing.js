import nodemailer from "nodemailer";
import ejs from "ejs";
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
  MAILING_SERVICE_USERNAME,
  MAILING_SERVICE_PASSWORD,
  EMAIL_SERVICE_HOST,
  EMAIL_SERVICE,
  EMAIL_SERVICE_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
} = process.env;
const Mailing = {};
const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);
const TEMPLATES = {
  contact: {
    fileName: "contact-mail-template.ejs",
    subject: "[My Portfolio] New contact message.",
    temp: `
<h3>Hi Nat, You have a new contact message from your portfolio</h3>
<hr>
<br />
<br />

<p><strong>NAME:</strong> <%= name %></p>
<p><strong>EMAIL:</strong> <%= email %></p>
<p><strong>MESSAGE:</strong> <%= message %></p>

<br />
<br />
<hr>
<p>From your portfolio website.</p>
    `,
  },
  bigGirlsRiseContact: {
    fileName: "contact-mail-template.ejs",
    subject: "[Big Girls Rise] New contact message.",
    temp: `
<h3>Hi Big Girls Rise NFT, You have a new contact message</h3>
<hr>
<br />
<br />

<p><strong>NAME:</strong> <%= name %></p>
<p><strong>EMAIL:</strong> <%= email %></p>
<p><strong>MESSAGE:</strong> <%= message %></p>

<br />
<br />
<hr>
<p>From your website.</p>
  `,
  },
  bigGirlsRiseWhitelist: {
    fileName: "contact-mail-template.ejs",
    subject: "[Big Girls Rise] New whitelist message.",
    temp: `
<h3>Hi Big Girls Rise NFT, You have a new whitelist message</h3>
<hr>
<br />
<br />

<p><strong>TWITTER:</strong> <%= name %></p>
<p><strong>EMAIL:</strong> <%= email %></p>
<p><strong>ETH ADDRESS:</strong> <%= message %></p>

<br />
<br />
<hr>
<p>From your website.</p>
  `,
  },
  bigGirlsRiseBigGirlsClub: {
    fileName: "contact-mail-template.ejs",
    subject: "[Big Girls Rise] New Club Signup.",
    temp: `
<h3>Hi Big Girls Rise NFT, You have a new big girls club sign up</h3>
<hr>
<br />
<br />

<h4>New Club Member Details</h4>
<p><strong>TWITTER:</strong> <%= name %></p>
<p><strong>EMAIL:</strong> <%= email %></p>
<p><strong>Age:</strong> <%= age %></p>
<p><strong>Occupation:</strong> <%= occupation %></p>
<p><strong>Location:</strong> <%= location %></p>

<br />
<br />
<hr>
<p>From your website.</p>
  `,
  },
};
/**
 * Send Email
 */
Mailing.sendEmail = async (data) => {
  // oauth2Client.setCredentials({
  //   scope: "https://www.googleapis.com/auth/gmail.send",
  //   refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  // });
  // const accessToken = await oauth2Client.getAccessToken();
  // console.log(accessToken);

  const smtpTransport = nodemailer.createTransport({
    service: EMAIL_SERVICE, // gmail
    host: EMAIL_SERVICE_HOST, //smtp.gmail.com
    port: EMAIL_SERVICE_PORT, // TLS (google requires this port for TLS)
    secure: false, // Not SSL
    // requireTLS: true, // Uses STARTTLS command (nodemailer-ism)
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
      // type: "OAuth2",
      // scope: "https://www.googleapis.com/auth/gmail.send",
      // user: SENDER_EMAIL_ADDRESS,
      // clientId: MAILING_SERVICE_CLIENT_ID,
      // clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      // refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      // accessToken: accessToken.token,
    },
  });

  /* const filePath = join(
    appDir,
    "src",
    "lib",
    "templates",
    TEMPLATES[data.template].fileName
  ); */
  const currentTemplate = TEMPLATES[data.template].temp;

  const htmlContent = ejs.render(currentTemplate, data, {});
  // console.log(htmlContent);

  const mailOptions = {
    from: `${data.template == 'contact' ? 'My Portfolio' : 'Big Girls Rise NFT'} <${SENDER_EMAIL_ADDRESS}>`,
    to: data.recipient,
    subject: TEMPLATES[data.template].subject,
    html: htmlContent,
  };

  await new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
        // return;
      }

      // return info;
      resolve("mail sent");
    });
  });
};

export default Mailing;
