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
        to: toPhoneNumber,
        type: 'template',
        template: {
          name: 'vendor_management', // The name of the template
          language: {
            code: 'en', // Language code
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: 'OR21333331' // Replace with actual Order No.
                },
                {
                  type: 'text',
                  text: 'Puri, Odisha' // Replace with the actual origin location
                },
                {
                  type: 'text',
                  text: 'Shaikpet, Hyderabad' // Replace with the actual destination location
                }
              ]
            },
            {
              type: 'button',
              sub_type: 'quick_reply',
              index: 0,
              parameters: [
                {
                  type: 'text',
                  text: 'Accept'
                }
              ]
            },
            {
              type: 'button',
              sub_type: 'quick_reply',
              index: 1,
              parameters: [
                {
                  type: 'text',
                  text: 'Decline'
                }
              ]
            }
          ]
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
