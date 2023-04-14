
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


    return `
    
        ${await Navbar(user)}

        <br><br><br><br><br><br>        
        ${SearchPanel()}
        <br><br><br><br><br><br>        

        ${Header()}
    `

}
render()
    .then(html => {
        document.getElementById('container').innerHTML = html

    })
