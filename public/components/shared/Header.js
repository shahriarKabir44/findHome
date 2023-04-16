function Header() {
    return `
    
    
    
        <div class="container-fluid header bg-white p-0">
            <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div class="col-md-6 p-5 mt-lg-5">
                    <h1 class="display-5 animated fadeIn mb-4">Find A <span class="text-primary">Perfect Home</span> To Live With Your Family</h1>
                    <p class="animated fadeIn mb-4 pb-2">Find Home Realty has a clear objective of providing modern homes to the city dwellers. Since the very beginning, we have been working with sincere efforts to build and provide apartments with all the latest facilities in the industry. We provide you with Home for Peace with superior design, reliable construction materials, and enhanced usability.</p>
 
                </div>
                <div class="col-md-6 animated fadeIn">
                    <div class="container">
                        <div class="carousel carousel_container">
                         
                            <img class="active" src="http://localhost:4000/img/carousel-1.jpg" alt="">
                            <img class="" src="http://localhost:4000/img/carousel-2.jpg" alt="">

                            <button class="carousel-btn prev prevBtn">&#8249;</button>
                            <button class="carousel-btn next nextBtn">&#8250;</button>
                        </div>
                    </div>
                </div>
                 
            </div>
        </div>`
}

setTimeout(() => {
    const images = document.querySelectorAll('.carousel_container img');
    const prevButton = document.querySelector('.prevBtn');
    const nextButton = document.querySelector('.nextBtn');
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
}, 600)