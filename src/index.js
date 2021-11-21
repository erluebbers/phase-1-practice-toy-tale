let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
      }
    });
  
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => {
      data.forEach(obj => createToyCard(obj))
    })
  
  document.querySelector('form').addEventListener('submit', submitToy)

  
  function submitToy (e) {
    e.preventDefault()
    let newToyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    postNewToy(newToyObj)
    createToyCard(newToyObj)
  }

  function createToyCard (obj) {
    let newCard = document.createElement('div')
    newCard.className = "card"
    newCard.innerHTML = `
    <h2>${obj.name}</h2>
    <img src="${obj.image}" class="toy-avatar" />
    <p> ${obj.likes} </p>
    <button class="like-btn" id="${obj.id}">Like <3</button>
    `
    newCard.querySelector('.like-btn').addEventListener('click', () => {
      updateLikes(newCard)
    })

    document.querySelector('#toy-collection').appendChild(newCard)
    
  }

  function postNewToy (obj) {
      fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${obj.name}`,
        "image": `${obj.image}`,
        "likes": `${obj.likes}`
        })
      })
    }
  
  function updateLikes (obj) {
    fetch(`http://localhost:3000/toys/${obj.id}`, {
      method: "PATCH",
      headers: 
      {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
      "likes": obj.likes += 1
      })
    })
  }


});
