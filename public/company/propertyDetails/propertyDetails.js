angular.module('property_details', [])
    .controller('property_details', ($scope) => {
        $scope.images = []
        $scope.imageCover = []
        $scope.availableImagesCount = 0
        $scope.onInit = async () => {
            await $scope.checkLoggedIn()
            let params = new URLSearchParams(location.search)
            let id = (params.get('id'))
            if (id == null) {
                location.href = 'http://localhost:4000/company/dashboard'
            }
            let { property } = await __fetch('property/searchPropertybyId/' + id)
            $scope.images = JSON.parse(property.images)
            $scope.images = $scope.images.map((image, index) => {
                $scope.availableImagesCount++
                return { image, cover: 0 }
            })
            if (property == null) {
                location.href = 'http://localhost:4000/company/dashboard'
            }
            $scope.property = property
            $scope.$apply()
        }

        $scope.toggleCover = image => {
            image.cover ^= 1
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
        $scope.confirmUpdate = async () => {
            await __fetch('property/update', $scope.property)
            alert('Updated property')
        }
    })