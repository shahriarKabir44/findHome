
async function render(user) {
    return ` 
    ${await Navbar(user)}
    <br><br><br><br><br><br>
    ${Header()}
    ${SearchPanel()}
    ${CatagoryList()}
    ${About()}
    ${await PropertyList()}
    ${ContactUsPanel()}
    ${CompanyProfile()}
    ${TeamContainer()}
    ${TestimonialContainer()}
    ${Footer()}
`
}
// render()
//     .then(html => {
//         document.getElementById('container').innerHTML = html

//     })


angular.module('home', [])
    .controller('home', ($scope, $sce) => {
        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
        $scope.html = ""
        $scope.user = null

        $scope.onInit = async () => {
            $scope.user = await __fetch('user/isAuthorized')
            $scope.html = $scope.renderHtml(await render($scope.user))
            $scope.$apply()
        }
    })
