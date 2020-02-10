const buttons = document.querySelectorAll('.order-buttons')

if (buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', orderEvent)
    })
}

function orderEvent (e) {
    const status = e.target.getAttribute('data-status')
    const id = e.target.getAttribute('data-id')

    fetch(`/order/${id}?status=${status}`, { method: 'PATCH' }).then(() => {
        window.location.reload()
    })
}