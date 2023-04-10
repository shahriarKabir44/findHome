async function render() {

    return `

        ${await Navbar()}
        <br><br><br><br><br><br><br><br>
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