
async function render() {
    let { user } = await __fetch('user/isAuthorized')
    let { properties } = await fetch('http://localhost:4000/property/getProperties').then(res => res.json());

    properties = properties.map(property => {
        property.images = JSON.parse(property.images)
        property.images = property.images.map(image => 'http://localhost:4000/' + image)
        return property
    })
    return ` 
    ${await Navbar(user)}
    <br><br><br><br><br><br>
    ${Header()}
    ${SearchPanel()}
    ${CatagoryList()}
    ${About()}
    <div class="container text-center mx-auto mb-5 wow fadeInUp">    
        <h1 class="mb-3">Properties available for sale</h1>
    </div>

    ${await PropertyList(properties)}
    ${ContactUsPanel()}
    ${CompanyProfile()}
    ${TeamContainer()}
    ${TestimonialContainer()}
    ${Footer()}
`
}
render()
    .then(html => {
        document.getElementById('container').innerHTML = html

    })
