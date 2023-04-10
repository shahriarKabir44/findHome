
angular.module('login-app', []).controller('login-controller', function ($scope) {
    $scope.email = "";
    $scope.password = "";

    $scope.checkLoggedIn = async function () {
        let admin = await __fetch('admin/isAuthorized')
        if (admin) { }

    }

    $scope.login = async function () {
        const { email, password } = $scope
        console.log(email, password)
        let { admin, token } = await __fetch('admin/authenticate', {
            email, password
        })
        localStorage.setItem('token', token)
    }
});