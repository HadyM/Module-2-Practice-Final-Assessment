const allCharacters = document.querySelector('#all-characters')
const form = document.querySelector('#character-comments-section form')
const commentList = document.getElementById('character-comments-ul')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.querySelector('title').textContent
    const comment = document.querySelector('input[type="text"]').value

    const li = document.createElement('li')
    li.innerHTML = `<b>${name}:</b> ${comment}`
    commentList.appendChild(li)
    form.reset() // comment.value = "" (both reset the form after the comment is made)
})

async function getChar() {
    try {
        const res = await axios.get("https://rickandmortyapi.com/api/character")
        const apiResults = res.data.results    

        for(let character of apiResults) {
           const info = charInfo(character)
           allCharacters.appendChild(info)
       }
    }
    catch (error){
        console.log('Error')
    }
   
}

function charInfo(character) {
    const li = document.createElement('li')

    const img = document.createElement('img')
    img.src = character.image
    img.classList.add('photo-img')
    li.appendChild(img)

    const label = document.createElement('p')
    label.textContent = character.name
    li.appendChild(label)

    li.addEventListener('click', () => {
       const hidden = document.querySelector('main')
       hidden.classList.remove('hidden')

       const name = document.querySelector('#character-info h3')
       const pic = document.querySelector('#character-info img')
       const status = document.querySelector('#character-info p:first-of-type')
       const location = document.querySelector('#character-info p:last-of-type')
       const title = document.querySelector('title')

       title.textContent = character.name
       name.textContent = character.name
       pic.src = character.image
       status.innerHTML = `<b>Status:</b> ${character.status}`
       location.innerHTML = `<b>Location:</b> ${character.location.name}`
    })

    return li
}





getChar()