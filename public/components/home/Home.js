
async function render() {
    let { user } = await __fetch('user/isAuthorized')

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
render()
    .then(html => {
        document.getElementById('container').innerHTML = html

    })
