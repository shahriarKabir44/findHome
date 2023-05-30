document.getElementById('approvalRequestForm')
    .onsubmit = e => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const keys = {}
        formdata.forEach((key, value) => {
            keys[key] = value
        });
        fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(keys)
        }).then(res => {
            return res.json()
        }).then(data => {
            document.getElementById('result').innerHTML = data
        })
    }