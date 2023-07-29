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
});

const collection = document.querySelector('#toy-collection')

function renderCard(toyData){

  const card = document.createElement('div')
  card.className = 'card'
  collection.append(card)

  const toyName = document.createElement('h2')
  toyName.textContent = toyData.name
  

  const toyImg = document.createElement('img')
  toyImg.className = 'toy-avatar'
  toyImg.src  = toyData.image

  const likes = document.createElement('p')
  likes.textContent = `${toyData.likes }` + " likes"

  const likeButton = document.createElement('button')
  likeButton.className = 'like-btn'
  likeButton.setAttribute('id', toyData.id)
  likeButton.textContent= 'like ❤️'
  
  likeButton.addEventListener('click', () => {

    fetch (`http://localhost:3000/toys/${toyData.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
      },
      body: JSON.stringify({
        likes: toyData.likes + 1 
      })
    })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => alert(error));
  
  // })

  .then(response => response.json())
  .then(updatedToy => {
    toyData.likes = updatedToy.likes; // Update the likes in the local toyData object
    likes.textContent = `${toyData.likes} likes`; // Update the displayed likes on the card
  })
  .catch(error => alert(error));
});

  card.append(toyName, likes, likeButton, toyImg)
}


function getToys(){
fetch ('http://localhost:3000/toys') 
.then (response => response.json())
.then (data => {
  console.log(data),
  data.forEach((item) => {renderCard(item)})}
 
)}

getToys()



const form = document.querySelector('.add-toy-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

const nameInput = form.querySelector('input[name="name"]');
const imgInput = form.querySelector('input[name="image"]');
const likeCount = form.querySelector('input[name=""]');

console.log(imgInput.value)



const toyData = {
  name: nameInput.value,
  image: imgInput.value,
  likes: likesCount.value
  id: 0
}

  fetch ('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    },
    body: JSON.stringify(toyData)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => alert(error));
});













