function Testimonial({ name, image, message, profession }) {
    return `<div class="testimonial-item bg-light rounded p-3">
                <div class="bg-white border rounded p-4">
                    <p> ${message} </p>
                    <div class="d-flex align-items-center">
                        <img class="img-fluid flex-shrink-0 rounded" src="http://localhost:4000/${image}" style="width: 45px; height: 45px;">
                        <div class="ps-3">
                            <h6 class="fw-bold mb-1">${name}</h6>
                               <small>${profession}</small>
                        </div>
                    </div>
                </div>
            </div>`
}