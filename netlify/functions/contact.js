const sgMail = require('@sendgrid/mail');

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  throw new Error('❌ Missing Send Grid API key!');
}

const headers = {
  'Access-Control-Allow-Origin': '*',
}

sgMail.setApiKey(apiKey);

exports.handler = async event => {
  try {
    const { email, subject, message } = JSON.parse(event.body)

    await sendEmail({
      replyTo: email,
      subject,
      text: message,
    });

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent' })
    };
  } catch (e) {
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ message: e.message })
    };
  }
};

async function sendEmail({ replyTo, subject, text }) {
  return sgMail.send({
    to: 'msitkowski94@gmail.com',
    from: 'hello@macieksitkowski.com',
    replyTo,
    subject,
    text
  });
}
