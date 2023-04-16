function TestimonialContainer() {
    let testimonials = [
        { image: "img/testimonial-1.jpg", name: "abcd", message: "Shera!!!", profession: "Teacher" },

        { image: "img/testimonial-1.jpg", name: "abcd1", message: "Osthir", profession: "chef" },
        { image: "img/testimonial-1.jpg", name: "abcd2", message: "Mama shera", profession: "doctpr" },
        { image: "img/testimonial-1.jpg", name: "abcd3", message: "Shohomot vai", profession: "engineer" },
        { image: "img/testimonial-1.jpg", name: "abcd4", message: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ", profession: "Dakat" },

    ]
    return `<div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Why Do People Love Us?</h1>
                    <p>A clear reflection of quality and professionalism. Thank you to the entire FindHomeRealty team who put in their effort to make this happen. It is an excellent work and it's a clear reflection of your quality and professionalism.</p>
                </div>
                <div class="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s" style="display:block">
                    ${testimonials.map((testimonial) => Testimonial(testimonial)).join('')}

                </div>
            </div>
        </div>`
}