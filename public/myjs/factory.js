secretApp.factory('Secret', function($http, $q) {
    return {
        getAllSecrets: function(msg) {
            console.log(msg);
            return $http.get('http://localhost:3000/secrets')
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    return $q.reject(response.data);
                });
        },
        viewSecret: function(inp) {
            var input = JSON.stringify(inp);
            var encodedInput = btoa(input);
            return $http.get('http://localhost:3000/secret/view?input=' + encodedInput)
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    return $q.reject(response.data);
                });
        },
        createSecret: function(inp) {
            var input = JSON.stringify(inp);
            var encodedInput = btoa(input);
            return $http.post('http://localhost:3000/secret/create?input=' + encodedInput)
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    return $q.reject(response.data);
                });
        },
        updateSecret: function(inp) {
            var input = JSON.stringify(inp);
            var encodedInput = btoa(input);
            return $http.put('http://localhost:3000/secret/update?input=' + encodedInput)
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    return $q.reject(response.data);
                });
        },
        deleteSecret: function(inp) {
            var input = JSON.stringify(inp);
            var encodedInput = btoa(input);
            return $http.delete('http://localhost:3000/secret/delete?input=' + encodedInput)
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    return $q.reject(response.data);
                });
        }
    };
});
