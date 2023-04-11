
angular.module('login-app', []).controller('login-controller', function ($scope) {
    $scope.email = "";
    $scope.password = "";

    $scope.checkLoggedIn = async function () {
        let admin = await __fetch('company/isAuthorized')
        if (admin) {
            location.href = 'http://localhost:4000/company/dashboard/dashboard.html'
        }
    }

    $scope.login = async function () {
        const { email, password } = $scope
        console.log(email, password)
        let { admin, token } = await __fetch('company/authenticate', {
            email, password
        })

        localStorage.setItem('token', token)
        location.href = 'http://localhost:4000/company/dashboard/dashboard.html'

    }
});