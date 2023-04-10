
async function render() {
    return ` 
    ${await Navbar()}
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
