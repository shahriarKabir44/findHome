function SearchPanel() {
    return `<div class="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style="padding: 35px;">
            <div class="container">
                <div class="row g-2">
                    <div class="col-md-10">
                        <div class="row g-2">
                            
                            <div class="col-md-3">
                                <select class="form-select border-0 py-3">
                                    <option selected>Property Types</option>
                                    <option value="1">Residential</option>
                                    <option value="2">Commercial</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="form-select border-0 py-3">
                                    <option selected>Property Phase</option>
                                    <option value="1">Upcoming</option>
                                    <option value="2">Ongoing</option>
                                    <option value="3">Completed</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="form-select border-0 py-3">
                                    <option selected>Price</option>
                                    <option value="1">50,00000-70,00000</option>
                                    <option value="2">70,00000-1,0000000</option>
                                    <option value="3">1,00,00000-1,50,00000</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="form-select border-0 py-3">
                                    <option selected>Location</option>
                                    <option value="1">Mirpur</option>
                                    <option value="2">Uttara</option>
                                    <option value="3">Bashundhara</option>
                                    <option value="4">Gulshan</option>
                                    <option value="5">Banani</option>
                                    <option value="6">Shantinagar</option>
                                    <option value="7">Kalshi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-dark border-0 w-100 py-3">Search</button>
                    </div>
                </div>
            </div>
        </div>`
}