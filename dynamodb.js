var AWS = require('aws-sdk');

//update your region.
AWS.config.update({
    region: "ap-northeast-1",
    endpoint: "http://localhost:8000"
});

const dynamoDB = new AWS.DynamoDB;
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Check if a table exists
 * @param {String} tableName
 */
const isTable = (tableName) => {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: tableName
        };
        dynamoDB.describeTable(params, (err, data) => {
            if (err) return reject(false);
            return resolve(true)
        })
    })
};

/**
 * Get record from user table
 * @param {String} tableName
 */
const getMovie = (tableName) => {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: tableName
        };
        docClient.scan(params, (err, data) => {
            if (err) {
                return reject(err)
            }
            console.log(data['Items'][0]);
            return resolve(data['Items'])
        })
    })
};

// Export functions
module.exports = { getMovie, isTable };
