async function PropertyList(properties) {

    return `<div class="container-xxl py-5">
            <div class="container">
                <div class="row g-0 gx-5 align-items-end">
                     
                </div>
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                             ${properties.map(property => { return PropertyItem(property) }).join()}

                             
                        </div>
                    </div>
                     
                    <div id="tab-3" class="tab-pane fade show p-0">
                        <div class="row g-4">
                            ${properties.map(property => { return PropertyItem(property) }).join()}
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}