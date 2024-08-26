const axios = require('axios');

const accessToken = 'EAAj7acfmCbQBOZCn8HfNJG1F86tDsGtIco8pgO2TEBIQTxPuLnoG2eSvmyhRd11C40jIemTLMhIExT8gWB9TZBmbcbRCQTPGcwQIEwCRVjEKZAQYFos3U2jfjlz5bFZB1uVPUZCIpg7ZCZB2xGoEjj3LFteIAtg7ewD8iPlnRqElDuw26usiZC7mOEOpW9nWH6cZB10piskCMdZAXchrvDkqMz6gwBZARsz';
const fromPhoneNumberId = '431360290049966';
const toPhoneNumber = '916370272245';

const sendMessage = async () => {
  try {
    console.log("Starting the message sending process...");

    const response = await axios.post(
      `https://graph.facebook.com/v20.0/${fromPhoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: toPhoneNumber,
        type: 'interactive',
        interactive: {
          type: 'button',
          header: {
            type: 'text',
            text: 'New Deal'
          },
          body: {
            text: 'Hi, we have a new deal from the client John Doe with phone number 111111111111. Do you want to accept the deal?'
          },
          footer: {
            text: 'Press a button to respond'
          },
          action: {
            buttons: [
              {
                type: 'reply',
                reply: {
                  id: 'accept-deal',
                  title: 'Accept'
                }
              },
              {
                type: 'reply',
                reply: {
                  id: 'decline-deal',
                  title: 'Decline'
                }
              }
            ]
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('An error occurred:');
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    console.error('Error config:', error.config);
  }
};

sendMessage();
