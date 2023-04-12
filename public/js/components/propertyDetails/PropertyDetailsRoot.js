
async function render() {
    let params = new URLSearchParams(location.search)
    let id = (params.get('id'))
    if (id == null) {
        location.href = 'http://localhost:4000/index.html'
    }
    let { property } = await fetch('http://localhost:4000/property/searchPropertybyId/' + id)
        .then(res => res.json())
    console.log(property)
    property.images = JSON.parse(property.images)
    return `

   
    ${await Navbar()}
        <br><br><br><br><br>

    ${Header()}
    <br><br><br><br><br><br>
    <div class="container-fluid header bg-white p-0">
        <div class="row gx-0 align-items-center flex-column-reverse flex-md-row">

            <div class="topnav">
                <a href="index.html">
                    <h4 class="m-0 text-white">Property Details</h4>
                </a>
                <a href="#">Floor Plan</a>
                <a href="#">Location Map</a>
                <a href="contact.html">Contact</a>
                <a href="#">Add to wishlist</a>
            </div>
        </div>
    </div>




     <div class="container-fluid header bg-white p-0">
            <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div class="col-md-6 p-5 mt-lg-5">
                     
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title mt-4">General Information</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table profile__table">
                                <tbody>
                                    <tr>
                                        <th><strong>Type</strong></th>
                                        <td>${property.type}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Location</strong></th>
                                        <td>${property.location}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Price</strong></th>
                                        <td>BDT ${property.price}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Unit Size</strong></th>
                                        <td>${property.area} Sqft</td>
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
                                        <td>${property.numBeds}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Number of Bath</strong></th>
                                        <td>${property.numBath}</td>
                                    </tr>
                                     


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 animated fadeIn">
                    <div class="container">
                        <div class="carousel">
                        ${property.images.map((image, index) => {
        return `<img src="http://localhost:4000/${image}" class="${index == 0 ? 'active' : ""}">`
    })}
                         
                        <button class="carousel-btn prev">&#8249;</button>
                        <button class="carousel-btn next">&#8250;</button>
                    </div>
    </div>
                </div>

            </div>
        </div>

        ${Footer()}
`
}



render()
    .then(data => {
        document.getElementById('container').innerHTML = data

        const images = document.querySelectorAll('.carousel img');
        const prevButton = document.querySelector('.carousel-btn.prev');
        const nextButton = document.querySelector('.carousel-btn.next');
        let currentImageIndex = 0;

        function showImage(index) {
            images[currentImageIndex].classList.remove('active');
            images[index].classList.add('active');
            currentImageIndex = index;
        }

        prevButton.addEventListener('click', () => {
            const index = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
            console.log(index)
            showImage(index);
        });

        nextButton.addEventListener('click', () => {
            const index = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
            showImage(index);
        });

    })


//     .then(response => response.json())


