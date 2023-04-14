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
        <!-- Header End -->

        <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Our Interior Design Service</h1>
                    <p>FindHomeRealty Interior is the home of creative designers skilled in the latest design
                        technologies. We make the best use of your property's space and come up with a superior work
                        designed to meet your particular requirements. Get the best interior design service in Dhaka,
                        Bangladesh.</p>
                    <p>Our quality has lead to making a successful real estate brand in Bangladesh in a short period of
                        time.</p>
                </div>

                <div class="row">
                    <div class="column side">
                        <div class="card">

                            <div class="row g-5 align-items-center">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img class="img-fluid w-100"
                                            src="https://www.spectruminteriors.co.in/wp-content/uploads/2020/12/WhatsApp-Image-2020-12-02-at-20.32.06.jpeg">
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h1 class="mb-4">Home Interior</h1>
                                    <p>Our expert designers turn your dream into reality by putting the best effort
                                        while designing your home.</p>

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
                                            src="https://i.pinimg.com/550x/54/7b/2b/547b2b6595611c2f836cbd6c70c5a24d.jpg">
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h1 class="mb-4">Office Interior</h1>
                                    <p>We realize how the surroundings in an office affect the thoughts, behaviors and
                                        work styles of the employees and customer designers turn your dream into reality
                                        by putting the best effort while designing your home.</p>


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
                                    <h1 class="mb-4">How We Work</h1>
                                    <p><i class="fa fa-check text-primary me-3"></i>Introductory Meeting:<br> In the
                                        introductory meeting, our designers will learn your requirements and listen to
                                        your ideas.</p>

                                    <p><i class="fa fa-check text-primary me-3"></i>Overall Planning:<br> In this phase,
                                        we will come up with a budget and set goals and deadlines for the project. </p>

                                    <p><i class="fa fa-check text-primary me-3"></i>The Work Phase & Submit:<br> We
                                        create the desired design as per the defined plan and goal. Then comes the time
                                        to submit it. </p>


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