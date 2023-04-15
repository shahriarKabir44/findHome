function TeamContainer() {
    let teams = [
        { designation: "CEO", name: "Abcdweif ", image: "img/agent4.jpg" },
        { designation: "CEO", name: "Jamal ", image: "img/agent1.jpg" },

        { designation: "CEO", name: "Kamal ", image: "img/agent2.jpg" },
        { designation: "CEO", name: "Kuddus ", image: "img/agent3.jpg" }

    ]
    return `<div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Property Agents</h1>
                    <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                </div>
                <div class="row g-4">
                    ${teams.map((team) => Team(team)).join('')}

                   
                </div>
            </div>
        </div>`
}