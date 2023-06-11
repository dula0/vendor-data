// dynamdb connection
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoDb = new DynamoDB.DocumentClient();

export default dynamoDb;