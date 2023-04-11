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


async function uploadImage(base64Image, API, headers) {
    let formData = new FormData()
    let blob = await fetch(base64Image)
        .then(res => res.blob())
    formData.append('file', blob)
    let url = await fetch('http://localhost:4000/' + API, {
        method: 'POST',
        body: formData,
        headers: {

            ...headers
        }
    }).then(res => res.json())
}