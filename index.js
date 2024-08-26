const axios = require('axios');

const accessToken = 'EAANCYxBbdsYBOZCZBbV3CcfjvtjOUr7TksZA7zIXzkgGmqhZBYb9MyevAPEZCZBKYMHexxA2x6Qar5R3ro1zmnX7e6aE4Our1KDTWXA6FewU06hs4IhUwLvdzOEEvtABBEC3IYlUSOU5F0MkSLlfHJtmf6yFzsBfQTIA0LaCuAiZCW5eAQZCCHaS4kAZCFwCJKE2ZBDKMeUbVqFM4u3cboJqIZD';
const fromPhoneNumberId = '396565413537008';
const toPhoneNumber = '916370272245'; // Replace with your desired phone number

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
          name: 'hello_world',
          language: {
            code: 'en_US'
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
