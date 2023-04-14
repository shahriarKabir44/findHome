async function render() {
    let params = Object.fromEntries(new URLSearchParams(location.search))

    console.log(params)

    // let properties = await __fetch('property/filter', params)


    let { user } = await __fetch('user/isAuthorized')


    /* 
       ${await PropertyList()}
        ${ContactUsPanel()}
    */
    return `
        ${await Navbar(user)}
        <br><br><br><br><br><br><br><br>
         ${SearchPanel()}
         <br><br><br><br><br
     
        ${Footer()}
    `
}


render()
    .then(html => {
        document.getElementById('container').innerHTML = html;
    })