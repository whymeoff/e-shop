const deleteButtons = document.querySelectorAll('#delete-button')
const amountSetButtons = document.querySelectorAll('.amount-set-btn')

if (deleteButtons) {
    deleteButtons.forEach(element => {
        element.addEventListener('click', deleteItem)
    })
}

if (amountSetButtons) {
    amountSetButtons.forEach(element => {
        element.addEventListener('click', setAmount)
    })
}

function setAmount (e) {
    const type = e.target.getAttribute('data-type')
    const goodID = e.target.getAttribute('data-goodID')
    fetch(`/cart?goodID=${goodID}&type=${type}`, { method: 'PATCH' }).then(() => {
        window.location.reload()
    })
}

function deleteItem (e) {
    let goodID = e.target.getAttribute('data-goodID')
    fetch(`/cart?goodID=${goodID}`, { method: 'DELETE' }).then(() => {
        window.location.reload()
    })
}