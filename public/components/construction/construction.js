async function render() {


    let { user } = await __fetch('user/isAuthorized')


    return `
        ${await Navbar(user)}
        <br><br><br><br><br><br><br><br>
         ${SearchPanel()}
         <br><br><br><br><br><br>

        <!-- Header Start -->
        <div class="container-fluid header bg-white p-0">
            <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div class="col-md-6 p-5 mt-lg-5">
                    <h1 class="display-5 animated fadeIn mb-4">Services</h1>
                    <nav aria-label="breadcrumb animated fadeIn">
                        <ol class="breadcrumb text-uppercase">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Services</a></li>
                            <li class="breadcrumb-item text-body active" aria-current="page">Construction</li>
                        </ol>
                    </nav>
                </div>
                <div class="col-md-6 animated fadeIn">
                    <img class="img-fluid" src="img/header.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Construction Services</h1>

                </div>

                <div class="row">
                    <div class="column side">
                        <div class="card">

                            <div class="row g-5 align-items-center">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img class="img-fluid w-100"
                                            src="https://media.istockphoto.com/id/911225858/photo/builder-at-work-with-wooden-roof-construction-wood-building-frame.jpg?s=612x612&w=0&k=20&c=vNon4zm6_sG3QsXGhzC0Xrc-il_1JWPzU1b1hKS_3f4="
                                            alt="" style="max-width: 400px;">
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h1 class="mb-4">Quality Construction Service in Bangladesh</h1>
                                    <p>Our concern FindHomeRealty Builders Ltd. is a leading construction company in
                                        Dhaka, Bangladesh. Our highly talented architects and designers ensure
                                        state-of-the-art construction services.</p>
                                    <p>We value every inch of your land and make the best use of it by building your
                                        property that resonates with your heart.</p>
                                    <p class="fw-bold">Become Our Joint Venture Partner:</p>
                                    <p>Since the beginning, we have been working with utmost sincerity and honesty that
                                        has gained trust from our land partners (landowners).</p>
                                    <p>Become our land partner and develop your land with the leading engineers of the
                                        real estate industry.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="column middle">
                        <div class="card">
                            <div class="row g-5 align-items-center">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img class="img-fluid w-100"
                                            src="https://imageio.forbes.com/specials-images/imageserve/620eaf4fcebbf71279629454/0x0.jpg?format=jpg&width=1200">
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h1 class="mb-4">Our Construction Gallery</h1>

                                    <img class="img-fluid w-25"
                                        src="https://www.shutterstock.com/image-photo/construction-residential-new-house-progress-260nw-1054842770.jpg">
                                    <img class="img-fluid w-25"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREhU9VNndeMb2DdATbtOWuDcyHYPEgqs_DStB8gh8T1A&s">
                                    <img class="img-fluid w-25"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebu0CWI6XuDvSCOyMGtApLzQT4Ue9moLKgFw9dOgYAQ&s">
                                    <img class="img-fluid w-25"
                                        src="https://www.piramalrealty.com/blog/wp-content/uploads/2022/12/Upcoming-Infrastructure-Projects-in-Mumbai-Leading-to-High-Demand-for-Residential-Properties.png"
                                        alt="" style="max-width: 400px;">
                                    <img class="img-fluid w-25"
                                        src="https://www.michaelpage.co.in/sites/michaelpage.co.in/files/legacy/image-7-essential-skills-in-real-estate-and-construction-for-2020-1.png">
                                    <img class="img-fluid w-25"
                                        src="https://businessday.ng/wp-content/uploads/2021/02/Real-estate-developers.jpg">
                                    <img class="img-fluid w-25"
                                        src="https://nairametrics.com/wp-content/uploads/2022/03/Property-Development.jpg">
                                    <img class="img-fluid w-25"
                                        src="https://www.shutterstock.com/image-photo/crane-building-construction-site-against-260nw-196734746.jpg">
                                    <img class="img-fluid w-25"
                                        src="https://www.shutterstock.com/image-photo/construction-site-260nw-318397754.jpg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column side">
                        <div class="card">
                            <div class="row g-5 align-items-center">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img class="img-fluid w-100"
                                            src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__480.jpg"
                                            alt="" style="max-width: 400px;">
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h1 class="mb-4">Why Do People Love Us?</h1>
                                    <p>A clear reflection of quality and professionalism. Thank you to the entire
                                        FindHomeRealty team who put in their effort to make this happen. It is an
                                        excellent work and it's a clear reflection of your quality and professionalism.
                                    </p>
                                    <p>Our quality has lead to making a successful real estate brand in Bangladesh in a
                                        short period of time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${Footer()}
    `
}


render()
    .then(html => {
        document.getElementById('container').innerHTML = html;
    })