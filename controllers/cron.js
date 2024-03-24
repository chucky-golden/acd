const axios = require('axios');
const cron = require('node-cron');

// Define the cron schedule (every 14 minutes)
const cronExpression = '*/1 * * * *';

// Function to make the GET request
const fetchData = async () => {
    try {
        const response = await axios.get('https://acd-test.vercel.app/');
        console.log('Data fetched successfully:');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

// Schedule the cron job
cron.schedule(cronExpression, () => {
    console.log('Fetching data...');
    fetchData();
});