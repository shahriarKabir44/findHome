async function render() {
    return `
        ${await Navbar()}
        <br><br><br><br><br><br>
        ${Header()}
        <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div class="about-img position-relative overflow-hidden p-5 pe-0">
                            <img class="img-fluid w-100" src="http://localhost:4000/img/about.jpg">
                        </div>
                    </div>
                    <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 class="mb-4">About Us</h1>
                        <p class="mb-4">Our motivation is to provide our customers with the best products at an
                            affordable price built by using the best components available along with all possible
                            benefits and services. We also listen carefully to our valued clients even after a decade of
                            experience ,we are often enlightened by their criticisms. This helps us to further improve
                            our design ,quality and overall service. We are developing the website to make it more
                            efficient.</p>
                        <p class="mb-4">This website ensures the users to get a property on the basis of their required-
                        </p>
                        <p><i class="fa fa-check text-primary me-3"></i>Location</p>
                        <p><i class="fa fa-check text-primary me-3"></i>Budget</p>
                        <p><i class="fa fa-check text-primary me-3"></i>Property Type</p>
                        <a class="btn btn-primary py-3 px-5 mt-3" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        ${await TeamContainer()}
        ${Footer()}
    `
}


render()
    .then(html => {
        document.getElementById('container').innerHTML = html
    })