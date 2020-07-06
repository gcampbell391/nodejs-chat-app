const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#messageForm').addEventListener('submit', (event) => {
    event.preventDefault()
    const message = event.target.elements.message.value
    socket.emit('sendMessage', message)
    event.target.reset()
})

document.querySelector('#sendLocation').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser...')
    }

    //Gets current location 
    navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }
        socket.emit('sendLocation', coords)

    })
})