function TestimonialContainer() {
    return `<div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Why Do People Love Us?</h1>
                    <p>A clear reflection of quality and professionalism. Thank you to the entire FindHomeRealty team who put in their effort to make this happen. It is an excellent work and it's a clear reflection of your quality and professionalism.</p>
                </div>
                <div class="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s" style="display:block">
                    ${Testimonial()}
                    ${Testimonial()}
                    ${Testimonial()}
                    ${Testimonial()}

                </div>
            </div>
        </div>`
}