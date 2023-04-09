async function render() {

    return `

        ${await Navbar()}
        ${Header()}
        ${SearchPanel()}
    
    `
}


render()
    .then(html => {
        document.getElementById('container').innerHTML = html;
    })