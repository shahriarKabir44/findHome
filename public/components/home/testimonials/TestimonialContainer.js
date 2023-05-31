function TestimonialContainer() {
    let testimonials = [
        { image: "img/agent3.jpg", name: "Fehenna", message: "A perfect site to get the desired property.", profession: "Teacher" },

        { image: "img/agent4.jpg", name: "Sanjida", message: "I think you will get no pain to get your desired property here.", profession: "Chef" },
        { image: "img/team-4.jpg", name: "Palash", message: "I have not this type of website ever, Really wonderful.", profession: "DDoctor" },
        { image: "img/team-2.jpg", name: "Jony", message: "Very Desired website and a wonderful UI", profession: "Engineer" },
        

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