var app = angular.module('myApp', []);


app.controller('myCtrl', function ($scope) {
    $scope.companies = []
    $scope.checkLoggedIn = async function () {
        let { admin } = await __fetch('admin/isAuthorized')
        if (!admin) {
            localStorage.clear()
            location.href = 'http://localhost:4000/admin/login'
        }
    }


    $scope.onInit = () => {
        $scope.checkLoggedIn()
        $scope.getCompanies()
    }
    $scope.openModal = () => {
        $("#myModal").modal('show')

    }

    $scope.updateProhibition = (company) => {
        if (!window.confirm('Are you sure you want to update?')) return
        company.isProhibited ^= 1
        __fetch('company/updateProhibition', { companyId: company.id, status: company.isProhibited })
    }
    $scope.getCompanies = async () => {
        let { companies } = await __fetch('company/getCompanyList/0')

        $scope.companies = companies.map(company => {
            return { ...company, image: company.image }
        })
        $scope.$apply()
    }
    $scope.selectedCompany = {}
    $scope.viewCompany = (id) => {
        location.href = `http://localhost:4000/viewCompany?id=${id}`

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
        $scope.getCompanies()

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
    $scope.logOut = () => {
        localStorage.clear()
        location.reload()
    }
});