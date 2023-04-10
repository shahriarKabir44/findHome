
async function render() {
    console.log((location.search))
    let params = new URLSearchParams(location.search)
    let id = (params.get('id'))
    let { post } = await fetch('http://localhost:4000/a/' + id)
        .then(res => res.json())
    return `

   
    ${await Navbar()}
    ${Header()}
    <br><br><br><br><br><br>
    <div class="container-fluid header bg-white p-0">
        <div class="row gx-0 align-items-center flex-column-reverse flex-md-row">

            <div class="topnav">
                <a href="index.html">
                    <h4 class="m-0 text-white">Sky View</h4>
                </a>
                <a href="propertydetails-sv.html">${post}</a>
                <a href="#">Floor Plan</a>
                <a href="#">Location Map</a>
                <a href="contact.html">Contact</a>
                <a href="#">Add to wishlist</a>
            </div>
        </div>
    </div>
    <br><br><br><br><br>




     <div class="container-fluid header bg-white p-0">
            <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div class="col-md-6 p-5 mt-lg-5">
                    <h3 class="display-5 animated fadeIn mb-4">Overview <span class="text-primary">of Sky View</span>
                    </h3>
                    <p class="animated fadeIn mb-4 pb-2">Sky View offers Assure Fair View, an attractive residential
                        property for sale in Mirpur, Dhaka. This property can be a very suitable home address for you.
                    </p>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title mt-4">General Information</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table profile__table">
                                <tbody>
                                    <tr>
                                        <th><strong>Type</strong></th>
                                        <td>Commercial</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Location</strong></th>
                                        <td>Mirpur, Dhaka, Bangladesh</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Price</strong></th>
                                        <td>90,00,000</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Unit Size</strong></th>
                                        <td>1200 Sqft</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <br><br>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title mt-4">Appartments Information</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table profile__table">
                                <tbody>
                                    <tr>
                                        <th><strong>Land Area</strong></th>
                                        <td>10 Katha</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Facing</strong></th>
                                        <td>South</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Number of Elevators</strong></th>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Number of Floors</strong></th>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Number of Appartments</strong></th>
                                        <td>30</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Parking</strong></th>
                                        <td>Basement+Ground</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Number of Car Parking</strong></th>
                                        <td>20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <br><br>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title mt-4">Each Flat Contains</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table profile__table">
                                <tbody>
                                    <tr>
                                        <th><strong>Number of Bed</strong></th>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Number of Bath</strong></th>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Number of Varenda</strong></th>
                                        <td>2</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 animated fadeIn">
                    <img class="img-fluid" src="http://localhost:4000/img/property-1.jpg" alt="">
                </div>

            </div>
        </div>

        ${Footer()}
`
}



render()
    .then(data => {
        document.getElementById('container').innerHTML = data

    })



//     .then(response => response.json())


