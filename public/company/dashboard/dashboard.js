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
            location.href = 'http://localhost:4000/company/login'
        }
        company.image = 'http://localhost:4000/' + company.image
        $scope.$apply()
    }

    $scope.viewProperty = async (propertyId) => {
        location.href = 'http://localhost:4000/company/viewProperty?id=' + propertyId

    }

    $scope.onInit = async () => {
        await $scope.checkLoggedIn()
        await $scope.getOwnedProperties()
    }
    $scope.openModal = () => {
        $("#addPropertyModal").modal('show')

    }
    $scope.ownedProperties = []
    $scope.getOwnedProperties = async () => {
        $scope.ownedProperties = await __fetch('company/getOwnedProperties/' + $scope.company.id)
        $scope.ownedProperties = $scope.ownedProperties.map(property => {
            property.images = JSON.parse(property.images)
            property.images = property.images.map(image => 'http://localhost:4000/' + image)
            return property
        });
        $scope.$apply()
    }
    $scope.createProperty = async () => {
        $scope.newProperty.sellerId = $scope.company.id
        let { newId } = await __fetch('property/create', $scope.newProperty)
        if (newId == null) {
            alert("You are not allowed to create a new property");
        }
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
                        urls.push(fileURL)
                    })
                )
            }
        }
        await Promise.all(promises)
        await __fetch('property/update', { images: JSON.stringify(urls), id: newId })
        $("#addPropertyModal").modal('hide')
        $scope.getOwnedProperties()

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

    $scope.updateCompanyInfo = async () => {
        await __fetch('company/update', { ...$scope.company })
        alert("Information updated successfully")
    }


    $scope.getNotifications = async () => {
        $scope.notifications = await __fetch('notification/getnotifications', { id: $scope.company.id, pagenumber: 0, type: 2 })
        $scope.notifications.sort((a, b) => { return b.time - a.time })
        $scope.notifications.forEach(notification => {
            notification.time = (new Date(notification.time)).toLocaleString()
        })
        $scope.$apply()
        $('#notificationsModal').modal('show')

    }
    $scope.viewNotification = (notification) => {
        if (notification.type == 3) return
        location.href = 'http://localhost:4000/company/viewProperty?id=' + notification.propertyId
    }
    $scope.logOut = () => {
        localStorage.clear()
        location.href = 'http://localhost:4000/company/login'
    }
});