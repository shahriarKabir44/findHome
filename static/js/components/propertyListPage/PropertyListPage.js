async function render() {

    return `

        ${await Navbar()}
        ${Header()}
        ${SearchPanel()}
        ${await PropertyList()}
        ${ContactUsPanel()}
        ${Footer()}
    `
}


render()
    .then(html => {
        document.getElementById('container').innerHTML = html;
    })