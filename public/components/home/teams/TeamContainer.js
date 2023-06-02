function TeamContainer() {
    let teams = [
        
        { designation: "CEO", name: "Momtahina Rahman ", image: "img/agent1.jpg" },

        { designation: "CEO", name: "Mehrun Nessa ", image: "img/agent2.jpg" },
        { designation: "CEO", name: "Pranto Sen", image: "img/agent5.jpg" }

    ]
    return `<div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Property Agents</h1>
                    <p>We are commited to give you the best service.</p>
                </div>
                <div class="row g-4">
                    ${teams.map((team) => Team(team)).join('')}

                   
                </div>
            </div>
        </div>`
}