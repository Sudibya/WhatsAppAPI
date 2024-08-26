const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const verifyToken = '143Barsha!';  // Replace with your verify token

// Verification endpoint for webhook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === verifyToken) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    console.log('Webhook verification failed');
    res.sendStatus(403);
  }
});

// Webhook endpoint to handle incoming messages
// This is the endpoint that WhatsApp will send POST requests to
app.post('/webhook', (req, res) => {
  const body = req.body;

  console.log('Webhook POST received:', JSON.stringify(body, null, 2));

  if (body.object === 'whatsapp_business_account') {
    body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        if (change.value.messages) {
          change.value.messages.forEach(message => {
            if (message.type === 'interactive' && message.interactive.type === 'button_reply') {
              const buttonReply = message.interactive.button_reply;
              const from = message.from; // Sender's WhatsApp ID

              console.log(`Button reply from ${from}: ${buttonReply.title} (ID: ${buttonReply.id})`);

              // Add your custom logic here based on the button reply
              if (buttonReply.id === 'accept-deal') {
                console.log('User accepted the deal.');
                // Handle acceptance
              } else if (buttonReply.id === 'decline-deal') {
                console.log('User declined the deal.');
                // Handle decline
              }
            }
          });
        } else {
          console.log('No interactive message received:', JSON.stringify(change, null, 2));
        }
      });
    });

    res.sendStatus(200); // Respond with 200 OK to acknowledge receipt of the webhook
  } else {
    res.sendStatus(404); // If the webhook is not for a WhatsApp Business Account, return 404 Not Found
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
