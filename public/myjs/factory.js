secretApp.factory('Secret', function($http, $q) {

    var Secret = {};
    var urlBase = "/secret";

    Secret.getAllSecrets = function() {
        return $http.get('/secrets');
    }

    Secret.viewSecret = function(inp) {
        var input = JSON.stringify(inp);
        var encodedInput = btoa(input);
        return $http.get('/secret/view?input=' + encodedInput);
    }

    Secret.createSecret = function(inp) {
        var input = JSON.stringify(inp);
        var encodedInput = btoa(input);
        return $http.post('/secret/create?input=' + encodedInput);
    }

    Secret.updateSecret = function(inp) {
        var input = JSON.stringify(inp);
        var encodedInput = btoa(input);
        return $http.put('/secret/update?input=' + encodedInput);
    }

    Secret.deleteSecret = function(inp) {
        var input = JSON.stringify(inp);
        var encodedInput = btoa(input);
        return $http.delete('/secret/delete?input=' + encodedInput);
    }

    return Secret;

});
