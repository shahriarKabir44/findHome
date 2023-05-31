
async function render() {
    let params = new URLSearchParams(location.search)
    let id = (params.get('id'))
    if (id == null) {
        location.href = 'http://localhost:4000/home'
    }
    let { company } = await __fetch('company/searchById/' + id)
    if (!company) {
        location.href = 'http://localhost:4000/home'
    }
    let { user } = await __fetch('user/isAuthorized')
    let properties = await __fetch(`company/getOwnedPropertiesForDisplay/${id}`)
    properties = properties.map(property => {
        property.images = JSON.parse(property.images)
        property.images = property.images.map(image => 'http://localhost:4000/' + image)
        return property
    })

    return `
    
        ${await Navbar(user)}

        <br><br><br><br><br><br>        
        ${SearchPanel()}
        <br><br><br><br><br><br>        

        <div class="container-fluid header bg-white p-0">
            <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div class="col-md-6 p-5 mt-lg-5">
                    <h1 class="display-5 animated fadeIn mb-4"><span class="text-primary">${company.name}</span> </h1>
                    <p class="animated fadeIn mb-4 pb-2">${company.description}</p>
                    <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title mt-4">General Information</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table profile__table">
                                <tbody>
                                    <tr>
                                        <th><strong>Phone</strong></th>
                                        <td>${company.phoneNumbers}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Email</strong></th>
                                        <td>${company.email}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Location</strong></th>
                                        <td>${company.location}</td>
                                    </tr>
                                    

                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
                <div class="col-md-6 animated fadeIn">
                    <div class="header-carousel">
                        <div class="owl-carousel-item">
                            <img class="img-fluid" src="http://localhost:4000/${company.image}" alt="">
                        </div>
                         
                    </div>
                </div>
            </div>
        </div>
        <br><br><br><br><br><br> 
        <div class="container">
        
            <div class="col-lg-6">
                <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                    <h1 class="mb-3">List of Properties</h1>
                    <h6>Flats or properties from ${company.name}</h6>
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
