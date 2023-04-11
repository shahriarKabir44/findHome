
angular.module('login-app', []).controller('login-controller', function ($scope) {
    $scope.email = "";
    $scope.password = "";

    $scope.checkLoggedIn = async function () {
        let { company } = await __fetch('company/isAuthorized')
        console.log(company)
        if (company) {
            location.href = 'http://localhost:4000/company/dashboard/dashboard.html'
        }
    }

    $scope.login = async function () {
        const { email, password } = $scope
        let { company, token } = await __fetch('company/authenticate', {
            email, password
        })
        console.log(company, token)
        localStorage.setItem('token', token)
        location.href = 'http://localhost:4000/company/dashboard/dashboard.html'

    }
});