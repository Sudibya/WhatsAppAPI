const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const verifyToken = '143Barsha!';  // Replace with your verify token
const phoneNumberId = '328494203690320'; // Replace with your phone number ID
const accessToken = 'EAANCYxBbdsYBOZCk9zSdWtQxsP4xTDbRvFg4crzNojXVxHXziLOEf4Vdur0DErhVqp532YlbXnBmcZBzYpXYRKkGExpYgZCtbpJkqjWXQOYp0yvU2nuZBQGFIyQzmR0Aszf51cmZCWZBXZBOcHqim1TT2YWfa74JzapPqCtGn7jygVbTuwMfYWqZA3kgPYXxqe4lcJMZA0ZCO9nJhXadhvjWkZD'; // Replace with your access token

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
app.post('/webhook', async (req, res) => {
  const body = req.body;

  console.log('Webhook POST received:', JSON.stringify(body, null, 2));

  if (body.object === 'whatsapp_business_account') {
    body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        if (change.value.messages) {
          change.value.messages.forEach(async message => {
            const from = message.from; // Sender's WhatsApp ID

            console.log(`Received message from ${from}.`);

            // Send your custom "hello_world" template message
            await axios({
              method: 'POST',
              url: `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              data: {
                messaging_product: 'whatsapp',
                to: from,
                type: 'template',
                template: {
                  name: 'hello_world',
                  language: {
                    code: 'en_US'
                  },
                  components: [
                    {
                      type: 'header',
                      parameters: [
                        {
                          type: 'text',
                          text: 'Hello World'
                        }
                      ]
                    },
                    {
                      type: 'body',
                      parameters: []
                    },
                    {
                      type: 'footer',
                      parameters: []
                    }
                  ]
                }
              }
            });

            console.log(`"hello_world" template message sent to ${from}.`);
          });
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
