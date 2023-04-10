async function TeamContainer() {
    let team = [
        { name: "abc", designation: "ceo" },
        { name: "abc1", designation: "ceo1" },
        { name: "abc2", designation: "ceo2" },
        { name: "abc3", designation: "ceo3" },
        { name: "abc4", designation: "ceo4" },

    ]
    return `
        <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Property Agents</h1>
                    <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit
                        eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                </div>
                <div class="row g-4">
                    ${team.map(member => { return Team(member) }).join()}
                    
                </div>
            </div>
        </div>
    `
}