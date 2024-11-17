// inizio creando la mia classe per i vini che andranno inseriti nel database
class Wine {
  constructor(_name, _description, _brand, _image, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _image
    this.price = _price
  }
}

// qui targhettizzo le informazioni inserite nel form perché mi serviranno in più occasioni, sia per il salvataggio che per il reset o modifica
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const brandInput = document.getElementById('brand')
const imageUrlInput = document.getElementById('image')
const priceInput = document.getElementById('price')

// metto l'URL all'interno di una costante per poter essere più facilmente utilizzato
const TANNICRUD_URL = 'https://striveschool-api.herokuapp.com/api/product/'

// ora verifico se esiste un wineId nella barra degli indirizzi
const addressBarContent = new URLSearchParams(window.location.search)
const wineId = addressBarContent.get('wineId')

// se trovo un ID sono arrivato alla pagina di backoffice cliccando nel modale di dettaglio del prodotto
// quindi avrò a disposizione una versione della pagina di backoffice con tutti gli input field ricaricati
// con i dati del prodotto, pronti per poter essere modificati, dandomi anche la possibilità di eliminare il prodotto

// MODALITA' MODIFICA
if (wineId) {
  // esiste l'ID, quindi mi si apre la versione della pagina backoffice dedicata a modifica ed eliminazione prodotto
  // per prima cosa, quindi, nascondo il bottone "salva" e lascio solo "modifica" ed "elimina" (oltre al reset)

  const saveButton = document.getElementById('saveButton')
  saveButton.classList.add('d-none')

  // eseguo una GET direttamente sul singolo prodotto che mi interessa
  fetch(TANNICRUD_URL + '/' + wineId, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWM1NDhhZDEyOTAwMTU4NzZjMjIiLCJpYXQiOjE3MzE2NjQ5ODEsImV4cCI6MTczMjg3NDU4MX0.kkM1d_iF6SLAVc1L7ZwMPvV0xh5O2Sby9W7eXVidOZ4',
      // stavolta per poter accedere dobbiamo inserire la nostra KEY generata in fase di sign-in
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero informazioni re-compilazione form')
      }
    })
    .then((targetWine) => {
      document.getElementById('name').value = targetWine.name
      document.getElementById('description').value = targetWine.description
      document.getElementById('brand').value = targetWine.brand
      document.getElementById('image').value = targetWine.imageUrl
      document.getElementById('price').value = targetWine.price
    })
    .catch((err) => console.log('errore', err))

  const deleteWine = function () {
    fetch(TANNICRUD_URL + '/' + wineId, {
      method: 'DELETE',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWM1NDhhZDEyOTAwMTU4NzZjMjIiLCJpYXQiOjE3MzE2NjQ5ODEsImV4cCI6MTczMjg3NDU4MX0.kkM1d_iF6SLAVc1L7ZwMPvV0xh5O2Sby9W7eXVidOZ4',
        // anche stavolta per poter accedere dobbiamo inserire la nostra KEY generata in fase di sign-in
      },
    })
      .then((response) => {
        if (response.ok) {
          //   // ELIMINAZIONE AVVENUTA CON SUCCESSO
          //   alert('Concerto eliminato!')
          // mi riporta in homepage
          window.location.assign('./homepage.html')
        } else {
          throw new Error("Errore nell'eliminazione del prodotto")
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  // e abilito il bottone "ELIMINA" (che ora targhettizzo) affinchè possa eliminare l'elemento visualizzato
  const deleteButton = document.getElementById('deleteButton')
  deleteButton.addEventListener('click', deleteWine)
} else {
  // modalità creazione!
}

// creo il form per la gestione dell'inserimento di nuovi prodotti
const form = document.getElementById('wine-form')
form.addEventListener('submit', (e) => {
  // prevengo la gestione di default del submit che mi resetterebbe tutti i campi
  e.preventDefault()
  // creo il nuovo prodotto dando i parametri del form ed utilizzando il constructor predisposto in precedenza
  const newWine = new Wine(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  )
  console.log('Vino creato pronto per il salvataggio', newWine)

  //   let methodToUse
  //   if (concertId) {
  //     methodToUse = 'PUT' // modifica
  //     URLToUse = EPITICKET_URL + '/' + concertId // specifico
  //   } else {
  //     methodToUse = 'POST' // creazione
  //     URLToUse = EPITICKET_URL // generico
  //   }

  fetch(TANNICRUD_URL, {
    method: 'POST', // col metodo POST creo un nuovo prodotto e con stringify lo trasformo in una stringa affinchè possa essere letto
    body: JSON.stringify(newWine),
    headers: {
      'Content-Type': 'application/json', // questa riga va aggiunta di default
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWM1NDhhZDEyOTAwMTU4NzZjMjIiLCJpYXQiOjE3MzE2NjQ5ODEsImV4cCI6MTczMjg3NDU4MX0.kkM1d_iF6SLAVc1L7ZwMPvV0xh5O2Sby9W7eXVidOZ4',
      // stavolta per poter accedere dobbiamo inserire la nostra KEY generata in fase di sign-in
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('EVENTO SALVATO!')
        nameInput.value = ''
        descriptionInput.value = ''
        brandInput.value = ''
        imageUrlInput.value = ''
        priceInput.value = ''
      } else {
        throw new Error('Errore nel salvataggio del nuovo prodotto')
      }
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
})

// faccio in modo che il bottone reset mi permette di resettare tutti i campi compilati
const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', () => {
  nameInput.value = ''
  descriptionInput.value = ''
  brandInput.value = ''
  imageUrlInput.value = ''
  priceInput.value = ''
})

//  per concludere cerco di tenere aggiornato l'anno visualizzato nel footer
const currentYear = document.getElementById('current-year')
currentYear.innerText = new Date().getFullYear()

// aggiungo un evento di avvenuto caricamento per far nascondere lo spinner
const spinner = document.getElementById('spinner')
document.addEventListener('DOMContentLoaded', () => {
  spinner.classList.add('d-none')
})
