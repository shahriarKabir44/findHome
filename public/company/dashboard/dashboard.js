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

    }
    $scope.createProperty = async () => {
        $scope.newProperty.sellerId = $scope.company.id
        let { newId } = await __fetch('property/create', $scope.newProperty)
        let promises = []
        let urls = []
        for (let n = 0; n < $scope.prevewImages.length; n++) {
            let image = $scope.prevewImages[n]
            if (image) {
                promises.push(
                    uploadImage(image, 'property/uploadImage', {
                        filetype: "property",
                        fileindex: n,
                        propertyid: newId,
                        companyid: $scope.company.id
                    }).then(({ fileURL }) => {
                        console.log(fileURL);
                        urls.push(fileURL)
                    })
                )
            }
        }
        await Promise.all(promises)
        await __fetch('property/update', { images: JSON.stringify(urls), id: newId })
        $("#addPropertyModal").modal('hide')

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