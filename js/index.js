const axiosInstance = axios.create({
  baseURL:
    'http://api.c6v.ru/?key=f6ba774599d0b0fb5a0da4f124e75f101c73cda2&q=getPrice',
})

const cityInstance = axios.create({
  baseURL:
    'http://api.c6v.ru/?key=f6ba774599d0b0fb5a0da4f124e75f101c73cda2&q=getCities',
})

const mainForm = document.forms['mainForm']
const submitBtn = document.querySelector('.main__btn-block .find')

const loader = document.querySelector('.ts-loader-wrapper')

const loadData = async (from, to, weight) => {
  loader.classList.remove('closed')
  localStorage.setItem('from', from)
  localStorage.setItem('to', to)
  return await axiosInstance
    .get(
      `&q=getPrice&startCity=${from}&endCity=${to}&weight=${weight}&weight=50&width=50&height=50&length=50`
    )
    .then((r) => {
      loader.classList.add('closed')
      console.log(r)

      if (r.data) {
        localStorage.setItem('loadVariants', JSON.stringify(r.data))
        window.location = 'http://localhost:3000/search.html'
      }
    })
}

const loadAvailableCities = async () => {
  return await cityInstance.get()
}

let available = []

loadAvailableCities().then((r) => {
  available = [...r.data]
})

submitBtn.addEventListener('click', async () => {
  let values = []
  mainForm.querySelectorAll('.main__val-elem').forEach((item) => {
    values.push(item.querySelector('input').value)
  })

  const from = values[0]
  const to = values[1]
  const weight = values[2]
  const length = values[3]

  const myData = await loadData(from, to, weight)
})

const autoCompleteInputs = document.querySelectorAll('.autocompleteTargetCity')

const renderByQuery = (block, query) => {
  if (available.length > 0 && query.trim().length > 1) {
    block
      .querySelectorAll('.ts-form__autocomplete-item')
      .forEach((item) => item.remove())
    available.forEach((elem) => {
      if (elem.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        block.insertAdjacentHTML(
          'beforeend',
          `<div class='ts-form__autocomplete-item'>
                        ${elem.name}
                    </div>`
        )
      }
    })
  }
}

if (autoCompleteInputs.length > 0) {
  autoCompleteInputs.forEach((input) => {
    const autocompleteBlock = input.parentElement.querySelector(
      '.ts-form__autocomplete'
    )

    if (autocompleteBlock) {
      input.addEventListener('input', (e) => {
        renderByQuery(autocompleteBlock, e.target.value)

        if (
          autocompleteBlock.querySelectorAll('.ts-form__autocomplete-item')
            .length > 0
        ) {
          autocompleteBlock.classList.remove('closed')
        } else {
          autocompleteBlock.classList.add('closed')
        }
      })

      autocompleteBlock.addEventListener('click', (e) => {
        let target = e.target

        if (target.classList.contains('ts-form__autocomplete-item')) {
          input.value = target.textContent.trim()

          autocompleteBlock.classList.add('closed')
        }
      })

      input.onfocus = () => {
        if (
          autocompleteBlock.querySelectorAll('.ts-form__autocomplete-item')
            .length > 0
        ) {
          autocompleteBlock.classList.remove('closed')
        }
      }

      document.addEventListener('click', (e) => {
        const target = e.target

        if (!input.parentElement.contains(target)) {
          autocompleteBlock.classList.add('closed')
        }
      })
    }
  })
}
