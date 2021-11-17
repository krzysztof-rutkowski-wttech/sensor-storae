import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD} = process.env;

const uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;
const client = new MongoClient(uri);

const dbName = "iot";

const testStorage = async () => {
	await connectDB();
	try {
		client.db(dbName);
	} finally {
		client.close();
	}
};

async function connectDB() {
	console.log('connectDB')
	try {
		await client.connect();
		console.log('Connected to DB');
	}
	catch (error) {
		console.log('Connection error.');
		throw new Error(error);
	}
}

function disconnectDB(data) {
	client.close();
	console.log('DB closed');
	return data;
}

function selectDatabase(dbName) {
	return () => {
		return new Promise(function(resolve) {
			resolve({ dbo: client.db(dbName) });
		});
	}
}

function findDevice(sensor) {
	return (data) => {
		return findDeviceFun(data, sensor);
	}
}

function findDeviceFun(data, device) {
	return new Promise(function(resolve, reject) {
		data.dbo.collection("devices").findOne({device: device}, {"_id" : 1}, function(err, resDevice) {
			if (err) {
				reject(err);
			} else {
				if (!resDevice) console.log('device not found: ' + device);
				data.device = resDevice;
				data.found = resDevice;
				resolve(data);
			}
		})
	});
}

function addDevice(sensor) {
	return (data) => {
		return addNewDeviceFun(data, sensor);
	}
}

function ifNotFoundDo(doFunction) {
	return (data) => {
		return data.found ? Promise.resolve(data) : doFunction(data);
	}
}

function addNewDeviceFun(data, device) {
	return new Promise(function(resolve, reject) {
		data.dbo.collection("devices").insertOne({device: device, records: []}, function(err, res) {
			if (err) {
				reject(err);
			} else {
				console.log('added new device: ' + device);
				resolve(data);
			}
		});
	});
}

function addNewRecord(device, record) {
	return (data) => {
		return new Promise(function(resolve, reject) {
			data.dbo.collection("devices")
				.update( 
					{ device },
					{ $push: { records: record } }, 
					function(err, res) {
					if (err) {
						reject(err);
					} else {
						console.log('1 document inserted for ' + device);
						resolve(data);
					}
			});
		});
	}
}

function findRecords(device) {
	return (data) => {
		return new Promise(function(resolve, reject) {
			data.dbo.collection("devices").findOne({device: device}, {"records": 1, "device": 1}, function(err, result) {
				if (err) {
					reject(err);
				} else {
					console.log('Data fetched from DB');
					data.result = result;
					resolve(data);
				}
			});
		});
	}
}

const insertDeviceRecord = (recordObj) => {
	console.log('insertDeviceRecord', sensor);
	var sensor = recordObj.sensor;
	if (sensor) {
		connectDB()
			.then(selectDatabase(dbName))
			.then(findDevice(sensor))
			.then(ifNotFoundDo(addDevice(sensor)))
			.then(addNewRecord(sensor, recordObj.data))
			.then(disconnectDB);
	}
}

const getRecordsForDevice = (device) => {
	return connectDB()
		.then(selectDatabase(dbName))
		.then(findRecords(device))
		.then(disconnectDB);
}

export {
	testStorage,
	insertDeviceRecord,
	getRecordsForDevice,
}
