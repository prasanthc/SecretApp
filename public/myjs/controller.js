var secretApp = angular.module("secretApp", ['ui.bootstrap']);

secretApp.controller('homeCtrl', function($scope, Secret, $modal, $log, $window) {
    $scope.data = {
        message: 'Eternal Peace!'
    };

    $scope.init = function() {
        Secret.getAllSecrets($scope.data.message)
            .then(function(data) {
                if (data.result) {
                    $scope.secrets = data.result;
                }
            }, function(error) {
                // console.log(error);
                alert('Something went wrong:' + error);
            });
    };


    $scope.toAddSecret = function() {
        var record = {
            data: {
                message: $scope.secretMessage,
                user: $scope.nickName,
                post_date: '',
                post_location: 'New York'
            }
        };

        Secret.createSecret(record)
            .then(function(data) {
                if (data.result) {
                    $scope.result = data.result;

                    alert('posted successfully');
                    $window.location.reload();
                }
            }, function(error) {
                // console.log(error);
                alert('Something went wrong:' + error);
            });
    };


    $scope.toDeleteSecret = function(secretID) {
        var record = {
            id: secretID
        };

        Secret.deleteSecret(record)
            .then(function(data) {
                if (data.result) {
                    $scope.result = data.result;
                    alert($scope.result);
                    $window.location.reload();
                }
            }, function(error) {
                // console.log(error);
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
            $scope.nickName = secret.nickName;
            $scope.picture = secret.message;

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.init();

});


secretApp.controller('ModalInstanceCtrl', function($scope, $log, $modalInstance, $window, items, Secret) {

    $scope.mNickName = items.secretUser;
    $scope.mSecretMessage = items.secretMessage;

    $scope.toUpdateSecret = function() {
        var record = {
            id: items.secretID,

            data: {
                user: $scope.mNickName,
                message: $scope.mSecretMessage,
                post_date: '',
                post_location: 'New York'
            }
        };

        Secret.updateSecret(record)
            .then(function(data) {
                if (data.result) {
                    $scope.result = data.result;
                    $window.location.reload();
                }
            }, function(error) {
                alert('Something went wrong:' + error);
                // console.log('Something went wrong:' + error);
            });
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
