
async function render() {
    let params = new URLSearchParams(location.search)
    let id = (params.get('id'))
    if (id == null) {
        location.href = 'http://localhost:4000/home'
    }
    let userInfo = await __fetch('user/findUser/' + id)
    if (!userInfo) {
        location.href = 'http://localhost:4000/home'
    }
    let { user: currentUser } = await __fetch('user/isAuthorized')
    console.log(currentUser)
    let properties = await __fetch(`property/getUserOwnedProperties/${id}`)

    properties = properties.map(property => {
        property.images = JSON.parse(property.images)
        property.images = property.images.map(image => 'http://localhost:4000/' + image)
        return property
    })

    return `
    
        ${await Navbar(currentUser)}

        <br><br><br><br><br><br>        
        ${SearchPanel()}
        <br><br><br><br><br><br>        

        <div class="container-fluid header bg-white p-0">
            <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div class="col-md-6 p-5 mt-lg-5">
                    <h1 class="display-5 animated fadeIn mb-4"><span class="text-primary">${userInfo.name}</span> To Live With Your Family</h1>
                     <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title mt-4">General Information</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table profile__table">
                                <tbody>
                                    <tr>
                                        <th><strong>Phone</strong></th>
                                        <td>${userInfo.phone}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Email</strong></th>
                                        <td>${userInfo.email}</td>
                                    </tr>
                                     
                                    

                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
                <div class="col-md-6 animated fadeIn">
                    <div class="header-carousel">
                        <div class="owl-carousel-item">
                            <img class="img-fluid" src="http://localhost:4000/${userInfo.profileImageURL}" alt="">
                        </div>
                         
                    </div>
                </div>
            </div>
        </div>
        <br><br><br><br><br><br> 
        <div class="container">
        
            <div class="col-lg-6">
                <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                    <h1 class="mb-3">List of Properties owned by ${userInfo.name}</h1>
                     
                </div>
            </div>
        </div>    
         ${await PropertyList(properties)}
        ${Footer()}


    `

}
render()
    .then(html => {
        document.getElementById('container').innerHTML = html

    })
