const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

// Configure AWS SDK
const dynamoDBClientParams = {};

// If running locally, use local DynamoDB
if (process.env.IS_OFFLINE) {
  dynamoDBClientParams.region = 'localhost';
  dynamoDBClientParams.endpoint = 'http://localhost:8000';
  dynamoDBClientParams.credentials = {
    accessKeyId: 'MOCK_ACCESS_KEY_ID',
    secretAccessKey: 'MOCK_SECRET_ACCESS_KEY',
  };
}

const dynamoDBClient = new DynamoDBClient(dynamoDBClientParams);
const docClient = DynamoDBDocumentClient.from(dynamoDBClient, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

// Connect to DynamoDB
const connectDB = async () => {
  try {
    // Test the connection
    await docClient.send(
      new (require('@aws-sdk/client-dynamodb').ListTablesCommand)({})
    );
    console.log('Connected to DynamoDB');
  } catch (error) {
    console.error('Error connecting to DynamoDB:', error.message);
    process.exit(1);
  }
};

module.exports = { docClient, connectDB };
