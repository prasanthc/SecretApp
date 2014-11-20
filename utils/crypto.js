exports.decode = function(encodedData) {
    var decodedData = new Buffer(encodedData, 'base64').toString('ascii')
    var parsedData = JSON.parse(decodedData)
    return parsedData;
}