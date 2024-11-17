// metto l'URL all'interno di una costante per poter essere più facilmente utilizzato
const TANNICRUD_URL = 'https://striveschool-api.herokuapp.com/api/product/'

fetch(TANNICRUD_URL, {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWM1NDhhZDEyOTAwMTU4NzZjMjIiLCJpYXQiOjE3MzE2NjQ5ODEsImV4cCI6MTczMjg3NDU4MX0.kkM1d_iF6SLAVc1L7ZwMPvV0xh5O2Sby9W7eXVidOZ4',
    // stavolta per poter accedere dobbiamo inserire la nostra KEY generata in fase di sign-in
  },
})
  .then((response) => {
    console.log('RESPONSE', response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero della risposta dal server')
    }
  })
  .then((arrayOfWines) => {
    console.log('arrayOfWines', arrayOfWines)

    const row = document.getElementById('wine-row')
    arrayOfWines.forEach((wine) => {
      const newCard = document.createElement('div')
      newCard.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
      newCard.innerHTML = `
            <div class="card mb-3 border border-3 border-light-subtle shadow-lg bg-transparent rounded-3 h-100">
                <div class="row g-0 h-100">
                    <div class="col-4">
                        <img src=${wine.imageUrl} class="img-fluid w-100 h-100 rounded-start" alt="wine-photo">
                    </div>
                    <div id="bodyCard" class="col-8 d-flex">
                        <div class="card-body d-flex flex-column align-items-end">
                            <h5 class=" card-title text-danger-emphasis text-end fs-4 my-1 pb-2 border-bottom border-1 border-dark">${wine.name}</h5>
                            <p class="card-text text-danger-emphasis text-end fs-5 my-1 p-0 ">${wine.brand}</p>
                            <p class="card-text text-danger-emphasis d-none text-end my-1 p-0 ">Prezzo: ${wine.price}€</p>
                            <div class="d-flex flex-grow-1">
                                <button type="button" class="btn btn-outline-dark mt-auto " 
                                data-bs-toggle="modal" 
                                data-bs-target="#wineModal" 
                                data-wine-id="${wine._id}"
                                data-wine-description="${wine.description}"
                                data-wine-name="${wine.name}"
                                data-wine-brand="${wine.brand}"
                                data-wine-imageUrl="${wine.imageUrl}"
                                data-wine-price="${wine.price}"
                                >Vai ai dettagli
                                </button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        `
      row.appendChild(newCard)
    })
  })
  .catch((error) => {
    console.log('ERROR', error)
  })

//  per concludere cerco di tenere aggiornato l'anno visualizzato nel footer
const currentYear = document.getElementById('current-year')
currentYear.innerText = new Date().getFullYear()

// aggiungo un evento di avvenuto caricamento per far nascondere lo spinner
const spinner = document.getElementById('spinner')
document.addEventListener('DOMContentLoaded', () => {
  spinner.classList.add('d-none')
})

// recupero l'ID del vino all'interno del modale in modo da poter gestirne i dati
const wineModal = document.getElementById('wineModal')
wineModal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget // Il bottone che ha attivato il modale
  const wineId = button.getAttribute('data-wine-id') // Recupero l'ID del vino
  const wineDescription = button.getAttribute('data-wine-description') // Recupero l'ID del vino
  const wineName = button.getAttribute('data-wine-name') // Recupero il nome del vino
  const wineBrand = button.getAttribute('data-wine-brand') // Recupero il nome dell'azienda
  const winePrice = button.getAttribute('data-wine-price') // Recupero il prezzo del vino
  const wineImg = button.getAttribute('data-wine-imageUrl') // Recupero l'URL dell'immagine del vino

  // mostro nel modale tutti i dati recuperati
  const modalTitle = wineModal.querySelector('.modal-title')
  modalTitle.textContent = wineName
  const modalImg = wineModal.querySelector('.modal-img')
  modalImg.src = wineImg
  const modalBrand = wineModal.querySelector('.modal-brand')
  modalBrand.textContent = wineBrand
  const modalPrice = wineModal.querySelector('.modal-price')
  modalPrice.textContent = 'Prezzo: ' + winePrice + '€'
  const modalDescription = wineModal.querySelector('.modal-description')
  modalDescription.textContent = wineDescription
  const modifyButton = wineModal.querySelector('#modifyButton')
  modifyButton.href = `./backoffice.html?wineId=${wineId}`
})
