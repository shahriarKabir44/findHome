var app = angular.module('myApp', []);


app.controller('myCtrl', function ($scope) {
    $scope.companies = []
    $scope.openModal = () => {
        console.log($("#myModal"))
        $("#myModal").modal('show')

    }
    $scope.newCompany = {}
    $scope.createCompany = async () => {
        let image = $scope.newCompany.image

        let { id } = await __fetch('company/register', { ...$scope.newCompany, image: null })

        if (!id) {
            alert("email already registered")
            return
        }
        await uploadImage(image, 'company/uploadImage', {
            filetype: "company",
            userid: id
        })
    }
    $scope.uploadImage = function (event) {
        var files = event.target.files;
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.newCompany.image = e.target.result;

            $scope.$apply();
        };
        reader.readAsDataURL(files[0]);
    };
});