async function __fetch(url, body) {
    let payload = {
        method: body ? 'POST' : 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        }
    }
    if (body) payload.body = JSON.stringify(body)
    return fetch('http://localhost:4000/' + url, payload).then(response => response.json())
}