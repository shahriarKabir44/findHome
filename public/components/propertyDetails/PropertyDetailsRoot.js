

async function render() {
    let params = new URLSearchParams(location.search)
    let id = (params.get('id'))
    if (id == null) {
        location.href = 'http://localhost:4000/home'
    }
    let { property } = await __fetch('property/searchPropertybyId/' + id)

    if (property == null) {
        location.href = 'http://localhost:4000/home'
    }
    let { company } = await __fetch('property/getCompanyInfo/' + id)

    let owner = null
    if (property.newOwner) {
        owner = await __fetch('transaction/getPropertyTransaction/' + property.id)
    }

    let { user } = await __fetch('user/isAuthorized')
    let offerInfo = null
    if (user) {
        let { offer } = await __fetch('offer/checkMyOffer', { offeredBy: user.id, propertyId: id })
        offerInfo = offer
        console.log(offer)
    }
    property.images = JSON.parse(property.images)
    return `

   
    ${await Navbar(user)}
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
                            <h4 class="panel-title mt-4">Additional Information</h4>
                        </div>
                        <div class="panel-body">
                            <div class="card">
                                <div class="card-body">
                                    <p>${property.info}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                <br><br><br><br>
                  ${owner ? '' : `${(!offerInfo) ? `  
                    <div class="col-lg-6 col-md-6">
                        <h5 class=" mb-4">Make an offer</h5>
                         <p>Want to buy? Make an offer to ${company.name}</p>
                        <div class="position-relative mx-auto" style="max-width: 400px;">
                            <input id="offerammount" class="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="number" value="" placeholder="Your offer">
                            <button onclick="submitOffer('${user?.id}','${id}','${company.id}')" type="button" class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Submit</button>
                        </div>
                    </div>`: ` 
                        <div class="col-lg-6 col-md-6">
                            <div style="display: flex !important;
                            align-items: center;
                            justify-content: space-between;"
                        >
                                <h5 >Your offer</h5>
                                <button class="btn btn-danger me-2" onclick="cancelOffer('${offerInfo.id}')">Cancel</button>

                            </div>
                            
                            <table class="table profile__table">
                                <tbody>
                                    <tr>
                                        <th><strong>Amount</strong></th>
                                        <td>tk. ${offerInfo.offer}</td>
                                    </tr>
                                    <tr>
                                        <th><strong>Time</strong></th>
                                        <td>${(new Date(offerInfo.time)).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>`}`}
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
                    <br><br>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title mt-4">Brought to you by:</h4>
                        </div>
                        <div class="panel-body">
                            <div class="card">
                                <div  style="display: grid;
                                        grid-template-columns: 50% auto;
                                        align-items: center;
                                    ">
                                    <div class="card-body">
                                        <p>${company.name}</p>
                                        <p><strong>Email:</strong> ${company.email}</p>
                                        <p><strong>Phone:</strong> ${company.phoneNumbers}</p>
                                        <p><strong>Location:</strong> ${company.location}</p>
                                    </div>
                                    <img style="width:100%" src="http://localhost:4000/${company.image}" alt="" />
                                </div>
                                 
                            </div>
                            
                        </div>
                    </div>

                    ${owner ? `<div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title mt-4">Owned by:</h4>
                        </div>
                        <div class="panel-body">
                            <div class="card">
                                <div  style="display: grid;
                                        grid-template-columns: 50% auto;
                                        align-items: center;
                                    ">
                                    <div class="card-body">
                                        <p>${owner.name}</p>
                                        <p><strong>Email: </strong> ${owner.email}</p>
                                        <p><strong>Phone: </strong> ${owner.phone}</p>
                                        <p><strong>Paid: </strong>BTD. ${owner.amount}</p>
                                    </div>
                                    <img style="width:100%" src="http://localhost:4000/${owner.profileImageURL}" alt="" />
                                </div>
                                 
                            </div>
                            
                        </div>
                    </div>`: ""}

                </div>
                <div class="col-md-6 animated fadeIn">
                    <div class="container">
                        <div class="carousel">
                        ${property.images.map((image, index) => {
        return `<img src="http://localhost:4000/${image}" 
                        class="${index == 0 ? 'active' : ""}">`
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

            showImage(index);
        });

        nextButton.addEventListener('click', () => {
            const index = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
            showImage(index);
        });

    })

async function submitOffer(userId, propertyId, companyId) {
    if (isNaN(userId * 1)) {
        alert('Please login or sign up and try again!')
        return
    }
    await __fetch('offer/create', {
        offeredBy: userId,
        propertyId,
        offer: document.getElementById('offerammount').value,
        companyId
    })
    alert('Offer has been placed!')
    location.reload()
}
//     .then(response => response.json())

async function cancelOffer(offerId) {
    if (!window.confirm('Are you sure you want to cancel?')) return;

    await __fetch('offer/delete/' + offerId)
    location.reload()
}
