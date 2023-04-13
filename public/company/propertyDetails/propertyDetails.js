angular.module('property_details', [])
    .controller('property_details', ($scope) => {
        $scope.images = []
        $scope.prevewImages = []
        $scope.imageCover = []
        $scope.activeMainImages = 0


        $scope.availableImagesCount = []
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
                return { image, cover: 0, index }
            })
            if (property == null) {
                location.href = 'http://localhost:4000/company/dashboard'
            }

            $scope.activeMainImages = $scope.images.length

            console.log($scope.availableImagesCount)
            $scope.property = property
            $scope.$apply()
        }

        $scope.toggleCover = image => {
            image.cover ^= 1
            if (image.cover) {
                $scope.activeMainImages--
            }
            else {
                $scope.activeMainImages++
                console.log($scope.activeMainImages + $scope.prevewImages.length)
                while ($scope.activeMainImages + $scope.prevewImages.length > 3)
                    $scope.prevewImages.pop()
            }
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

        $scope.uploadImage = function (event) {
            var files = event.target.files;
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.prevewImages.push([e.target.result, $scope.prevewImages.length]);


                $scope.$apply();
            };
            reader.readAsDataURL(files[0]);
        };

        $scope.deleteTempImage = index => {
            console.log(index)
            $scope.prevewImages = $scope.prevewImages.filter((img, ind) => img[1] != index)
        }
    })