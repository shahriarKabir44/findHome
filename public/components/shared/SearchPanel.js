function SearchPanel() {
    return `<div class="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style="padding: 35px;">
            <div class="container">
                <form id="searchForm" class="row g-2">
                    <div class="col-md-10">
                        <div class="row g-2">
                            
                            <div class="col-md-3">
                                <select name="type" class="form-select border-0 py-3">
                                    <option value="" selected>Property Types</option>
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select name="phase" class="form-select border-0 py-3">
                                    <option value="" selected>Property Phase</option>
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select name="price" class="form-select border-0 py-3">
                                    <option value="" selected>Price</option>
                                    <option value="5000000-7000000">50,00000-70,00000</option>
                                    <option value="7000000-10000000">70,00000-1,0000000</option>
                                    <option value="10000000-15000000">1,00,00000-1,50,00000</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select  name="location" class="form-select border-0 py-3">
                                    <option value="">Select location</option>
                                    <option value="New York">New York</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="Chicago">Chicago</option>
                                    <option value="Houston">Houston</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-dark border-0 w-100 py-3">Search</button>
                    </div>
                </form>
            </div>
        </div>`
}



setTimeout(() => {
    document.getElementById('searchForm').onsubmit = e => {
        e.preventDefault();
        let formData = new FormData(document.getElementById('searchForm'));
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        let link = 'http://localhost:4000/search?'
        let temp = []
        for (let key in data) {
            temp.push(`${key}=${data[key]}`)
        }
        link += temp.join('&')

        location.href = link
    }
}, 1000)