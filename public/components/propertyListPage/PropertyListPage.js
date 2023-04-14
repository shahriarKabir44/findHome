async function render() {
    let params = Object.fromEntries(new URLSearchParams(location.search))

    console.log(params)

    let properties = await __fetch('property/filter', params)
    properties = properties.map(property => {
        property.images = JSON.parse(property.images)
        property.images = property.images.map(image => 'http://localhost:4000/' + image)
        return property
    })

    let { user } = await __fetch('user/isAuthorized')


    /* 
      
        ${ContactUsPanel()}
    */
    return `
        ${await Navbar(user)}
        <br><br><br><br><br><br><br><br>
         ${SearchPanel()}
         <br><br><br><br><br>
         <div class="container">
            <h3>Properties matching your search</h3>
            ${await PropertyList(properties)}

         </div>
        ${Footer()}
    `
}


render()
    .then(html => {
        document.getElementById('container').innerHTML = html;
    })