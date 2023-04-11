var app = angular.module('myApp', []);


app.controller('myCtrl', function ($scope) {
    $scope.companies = []
    $scope.checkLoggedIn = async function () {
        let admin = await __fetch('admin/isAuthorized')
        if (!admin) {
            location.href = 'http://localhost:4000/admin/dashboard/dashboard.html'
        }
    }


    $scope.onInit = () => {
        $scope.checkLoggedIn()
        $scope.getCompanies()
    }
    $scope.openModal = () => {
        console.log($("#myModal"))
        $("#myModal").modal('show')

    }
    $scope.getCompanies = async () => {
        let { companies } = await __fetch('company/getCompanyList/0')

        $scope.companies = companies.map(company => {
            return { ...company, image: 'http://localhost:4000/' + company.image }
        })
        $scope.$apply()
    }
    $scope.selectedCompany = {}
    $scope.viewCompany = async (id) => {
        let { company } = await __fetch('company/searchById/' + id)
        $scope.selectedCompany = company
        company.image = 'http://localhost:4000/' + company.image
        $scope.$apply()
        $("#detailsModal").modal('show')

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
        $("#myModal").modal('hide')

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