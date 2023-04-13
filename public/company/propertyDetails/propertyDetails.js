angular.module('property_details', [])
    .controller('property_details', ($scope) => {
        $scope.onInit = async () => {
            await $scope.checkLoggedIn()
            let params = new URLSearchParams(location.search)
            let id = (params.get('id'))
            if (id == null) {
                location.href = 'http://localhost:4000/company/dashboard'
            }
            let { property } = await __fetch('property/searchPropertybyId/' + id)
            console.log(property)
            if (property == null) {
                location.href = 'http://localhost:4000/company/dashboard'
            }
            $scope.property = property
            $scope.$apply()
        }


        $scope.checkLoggedIn = async function () {
            let { company } = await __fetch('company/isAuthorized')
            $scope.company = company

            if (!company) {
                location.href = 'http://localhost:4000/company/login'
            }
            company.image = 'http://localhost:4000/' + company.image
            $scope.$apply()
        }
    })