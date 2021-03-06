

secretApp.controller('homeCtrl', function($scope, Secret, $modal, $log, $window) {
    $scope.data = {
        message: 'Eternal Peace!'
    };

    $scope.secretForms = {
        0: 'no secrets',
        one: '{} secret',
        other: '{} secrets'
    };

    $scope.init = function() {
        $scope.retrieveAllSecrets();
    };

    $scope.retrieveAllSecrets = function() {
        Secret.getAllSecrets().success(function(data) {
            if (data.result) {
                $scope.secrets = data.result;
            }
        }).error(function(error) {
            alert('Something went wrong:' + error);
        });
    }

    $scope.toAddSecret = function() {
        var record = {
            data: {
                message: $scope.secretMessage,
                user: $scope.nickName,
                post_date: '',
                post_location: 'New York'
            }
        };
        Secret.createSecret(record).success(function(data) {
            if (data.result) {
                $scope.result = data.result;
                alert('posted successfully');
                $scope.retrieveAllSecrets();
                $scope.nickName = "";
                $scope.secretMessage = "";
            }

        }).error(function(error) {           
            alert('Something went wrong:' + error);
        })
    };


    $scope.toDeleteSecret = function(secretID) {
        var record = {
            id: secretID
        };

        Secret.deleteSecret(record).success(function(data) {
            if (data.result) {
                $scope.result = data.result;
                alert($scope.result);
                $scope.retrieveAllSecrets();
            }

        }).error(function(error) {           
            alert('Something went wrong:' + error);

        });
    };

    $scope.openModaltoUpdateSecret = function(secret) {

        $scope.updateSecretInfo = {
            secretID: secret.id,
            secretUser: secret.user,
            secretMessage: secret.message
        };

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            backdrop: 'static',
            // size: size,
            resolve: {
                items: function() {
                    return $scope.updateSecretInfo;
                }
            }
        });

        modalInstance.result.then(function(secret) {
            var record = {
                id: secret.secretID,
                data: {
                    user: secret.secretUser,
                    message: secret.secretMessage,
                    post_date: '',
                    post_location: 'New York'
                }
            };

            Secret.updateSecret(record).success(function(data) {
                if (data.result) {
                    // alert('posted successfully');
                    $scope.retrieveAllSecrets();
                }
            }).error(function(error) {
                alert('Something went wrong:' + error);
            })
        });
    };

    $scope.init();

});


secretApp.controller('ModalInstanceCtrl', function($scope, $log, $modalInstance, $window, items, Secret) {

    $scope.items = items;

    $scope.ok = function() {
        $modalInstance.close($scope.items);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

secretApp.filter('fromNow', function() {
    return function(date) {
        return moment(date).fromNow();
    }
});
