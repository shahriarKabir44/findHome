
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
