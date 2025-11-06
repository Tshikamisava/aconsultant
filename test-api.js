const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API endpoint...');
    
    const response = await fetch('https://email-52up9ownm-tshikamisava-b24f0bf2.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_name: 'Test User',
        from_email: 'test@example.com',
        message: 'This is a test message from the API test script.'
      })
    });

    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (response.ok) {
      console.log('✅ API test successful!');
    } else {
      console.log('❌ API test failed:', result.error || result.message);
    }
    
  } catch (error) {
    console.error('❌ API test error:', error.message);
  }
}

testAPI();