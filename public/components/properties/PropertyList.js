async function PropertyList() {
    let { properties } = await fetch('http://localhost:4000/property/getProperties').then(res => res.json());

    properties = properties.map(property => {
        property.images = JSON.parse(property.images)
        property.images = property.images.map(image => 'http://localhost:4000/' + image)
        return property
    })
    return `<div class="container-xxl py-5">
            <div class="container">
                <div class="row g-0 gx-5 align-items-end">
                    <div class="col-lg-6">
                        <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                            <h1 class="mb-3">List of Property</h1>
                            <h6>Flats or properties for sell in Dhaka</h6>
                        </div>
                    </div>
                    <div class="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                        <ul class="nav nav-pills d-inline-flex justify-content-end mb-5">
                            <li class="nav-item me-2">
                                <a class="btn btn-outline-primary active" data-bs-toggle="pill" href="#tab-1">Featured</a>
                            </li>
                            <li class="nav-item me-2">
                                <a class="btn btn-outline-primary" data-bs-toggle="pill" href="#tab-2">For Sell</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                             ${properties.map(property => { return PropertyItem(property) }).join()}

                            <div class="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                <a class="btn btn-primary py-3 px-5" href="">Browse More Property</a>
                            </div>
                        </div>
                    </div>
                    <div id="tab-2" class="tab-pane fade show p-0">
                        <div class="row g-4">
                             

                            <div class="col-12 text-center">
                                <a class="btn btn-primary py-3 px-5" href="">Browse More Property</a>
                            </div>
                        </div>
                    </div>
                    <div id="tab-3" class="tab-pane fade show p-0">
                        <div class="row g-4">
                            ${properties.map(property => { return PropertyItem(property) }).join()}

                            <div class="col-12 text-center">
                                <a class="btn btn-primary py-3 px-5" href="">Browse More Property</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}