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
            <div class="card mb-3 border border-3 border-dark shadow-lg" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${wine.imageUrl} class="img-fluid rounded-start border-end border-3 border-dark" alt="wine-photo">
                    </div>
                    <div class="col-md-8 bg-warning-subtle d-flex">
                        <div class="card-body d-flex flex-column align-items-end">
                            <h5 class="card-title text-end fs-5 my-1 pb-2 border-bottom border-1 border-dark">${wine.name}</h5>
                            <p class="card-text text-end my-1 p-0 ">${wine.brand}</p>
                            <p class="card-text text-end my-1 p-0 ">Prezzo: ${wine.price}€</p>
                            <div class="d-flex flex-grow-1">
                               <a href="./details.html?wineId=${wine._id}" class="btn btn-outline-dark mt-auto">Vai ai dettagli!</a>
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
const currentYear = document.getElementById('current-year') // seleziono lo span
currentYear.innerText = new Date().getFullYear() // recupero l'anno corrente e ce lo ficco
