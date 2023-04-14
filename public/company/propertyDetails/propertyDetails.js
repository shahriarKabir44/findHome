angular.module('property_details', [])
    .controller('property_details', ($scope) => {
        $scope.images = []
        $scope.prevewImages = []
        $scope.imageCover = []
        $scope.activeMainImages = 0

        $scope.getOffers = async (propertyId) => {
            $scope.offerers = await __fetch('offer/getPropertyOffers/' + propertyId)

            $scope.offerers.forEach(offerer => {
                offerer.time = (new Date(offerer.time)).toLocaleString()
            })
            $scope.$apply()
        }
        $scope.acceptOffer = async (offer) => {
            if (!window.confirm("Are you sure you want to accept?"))
                return

            await __fetch('offer/accept', { offer, company: $scope.company, property: $scope.property })
            location.reload()
        }
        $scope.availableImagesCount = []

        $scope.getOwnerInfo = async (ownerId) => {
            $scope.propertyOwner = await __fetch(`user/findUser/${ownerId}`)
            $scope.$apply()
        }
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
            if (property.newOwner) {
                await $scope.getOwnerInfo(property.newOwner)
            }
            else {
                $scope.getOffers(id)
            }
            $scope.activeMainImages = $scope.images.length

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
            let toDelete = []
            let toKeep = []
            $scope.images.forEach(({ image, cover }) => {
                if (cover) {
                    toDelete.push(image)
                    __fetch('property/deleteImage', { image })
                }
                else {
                    toKeep.push(image)
                }
            })
            __fetch('property/update', { id: $scope.property.id, images: JSON.stringify(toKeep) })
            let promises = []
            let urls = []
            $scope.prevewImages.forEach(([image, index]) => {
                promises.push(uploadImage(image, 'property/uploadImage', {
                    filetype: "property",
                    fileindex: (new Date()) * 1 + index,
                    propertyid: $scope.property.id,
                    companyid: $scope.property.sellerId
                }).then(({ fileURL }) => {
                    urls.push(fileURL)
                }))
            })
            await Promise.all(promises)
            await __fetch('property/update', { images: JSON.stringify([...urls, ...toKeep]), id: $scope.property.id })

            alert('Updated property')
            location.reload()
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
            $scope.prevewImages = $scope.prevewImages.filter((img, ind) => img[1] != index)
        }


        $scope.getNotifications = async () => {
            $scope.notifications = await __fetch('notification/getnotifications', { id: $scope.company.id, pagenumber: 0, type: 2 })
            $scope.notifications.forEach(notification => {
                notification.time = (new Date(notification.time)).toLocaleString()
            })
            $scope.$apply()
            $('#notificationsModal').modal('show')

        }
        $scope.viewNotification = (notification) => {
            location.href = 'http://localhost:4000/company/viewProperty?id=' + notification.propertyId
        }
    })