document.getElementById('approvalRequestForm')
    .onsubmit = e => {
        e.preventDefault()
        const formData = new FormData(document.getElementById('approvalRequestForm'))
        const keys = {}
        console.log(e.target)
        console.log(formData.entries())
        for (let [key, value] of formData.entries()) {
            keys[key] = value;
        }
        console.log(keys)
        fetch('http://localhost:8080/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8;'
            },
            body: JSON.stringify(keys)
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(res)
            document.getElementById('result').innerHTML = data
        })
    }