var app = angular.module('myApp', []);


app.controller('myCtrl', function ($scope) {
    $scope.companies = []
    $scope.newProperty = {
        price: 0,
        location: "",
    }
    $scope.prevewImages = [null, null, null]
    $scope.checkLoggedIn = async function () {
        let { company } = await __fetch('company/isAuthorized')
        $scope.company = company

        if (!company) {
            location.href = 'http://localhost:4000/company/login/login.html'
        }
        company.image = 'http://localhost:4000/' + company.image
        $scope.$apply()
    }


    $scope.onInit = () => {
        $scope.checkLoggedIn()
        //$scope.getProperties()
    }
    $scope.openModal = () => {
        $("#addPropertyModal").modal('show')

    }
    $scope.getProperties = async () => {
        let { companies } = await __fetch()

        $scope.companies = companies.map(company => {
            return { ...company, image: 'http://localhost:4000/' + company.image }
        })
        $scope.$apply()
    }
    $scope.createProperty = () => {
        $scope.newProperty.sellserId = $scope.company.id
        console.log($scope.newProperty)
    }

    $scope.uploadImage = function (event, order) {
        var files = event.target.files;
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.prevewImages[order] = e.target.result;

            $scope.$apply();
        };
        reader.readAsDataURL(files[0]);
    };

    $scope.removePhoto = (index) => {
        $scope.prevewImages[index] = null
    }
});