import {
	dynamodbCreateTable,
	dynamodbDescribeTable,
	dynamodbDeleteTable,
	dynamodbCreateRecord,
} from './aws';
import vendors from './data/vendors';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const init = async () => {
	const vendorsTableName = 'vendors';

	const vendorsTable = await dynamodbDescribeTable(vendorsTableName);

	// Delete the table
	if (!(vendorsTable instanceof Error)) {
		await dynamodbDeleteTable(vendorsTableName);
		await delay(6000);
	}

	const vendorsTableParams: AWS.DynamoDB.CreateTableInput = {
		TableName: vendorsTableName,
		KeySchema: [{ AttributeName: 'twitterID', KeyType: 'HASH' }],
		AttributeDefinitions: [{ AttributeName: 'twitterID', AttributeType: 'S' }],
		ProvisionedThroughput: {
			ReadCapacityUnits: 10,
			WriteCapacityUnits: 10,
		},
	};

	dynamodbCreateTable(vendorsTableParams);
	await delay(6000);

	const firstVendor = vendors[0];
	await dynamodbCreateRecord(vendorsTableName, firstVendor);
};

init();
