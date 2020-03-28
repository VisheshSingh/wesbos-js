// Make a div
const div = document.createElement('div');
// add a class of wrapper to it
div.classList.add('wrapper');
// put it into the body
document.body.appendChild(div);
// make an unordered list
const ul = document.createElement('ul');
// add three list items with the words "one, two three" in them
// put that list into the above wrapper
const li = `
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
`;
const myFragment = document.createRange().createContextualFragment(li);
ul.appendChild(myFragment);
div.appendChild(ul);
// create an image
const img = document.createElement('img');
// set the source to an image
// set the width to 250
// add a class of cute
// add an alt of Cute Puppy
// Append that image to the wrapper
img.src = 'https://picsum.photos/300';
img.width = 250;
img.height = 250;
img.classList.add('cute');
img.alt = 'Cute Puppy';

div.appendChild(img);

// with HTML string, make a div, with two paragraphs inside of it
// put this div before the unordered list from above
const newDiv = `
    <div class="string-div"> 
        <p>Para 1</p>
        <p>Para 2</p>
    </div>  
`;

ul.insertAdjacentHTML('beforebegin', newDiv);

// add a class to the second paragraph called warning
const newDivFragment = document.createRange().createContextualFragment(newDiv);
// console.log(newDivFragment);
const StringDiv = document.querySelector('.string-div');
// StringDiv.children[1].classList.add('warning');
StringDiv.lastElementChild.classList.add('warning');
// remove the first paragraph
// console.log(StringDiv.children[0]);
// StringDiv.children[0].remove();
StringDiv.firstElementChild.remove();
// create a function called generatePlayerCard that takes in three arguments: name, age, and height
function generatePlayerCard(name, age, height) {
  const playerCard = document.createElement('div');
  // have that function return html that looks like this:
  // <div class="playerCard">
  //   <h2>NAME — AGE</h2>
  //   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
  // </div>
  playerCard.classList.add('playerCard');
  const h2 = document.createElement('h2');
  h2.textContent = `${name} - ${age}`;
  const p = document.createElement('p');
  p.textContent = `They are ${height} and ${age} years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!`;
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  playerCard.appendChild(h2);
  playerCard.appendChild(p);
  playerCard.appendChild(delBtn);
  return playerCard;
}

const cardDiv = generatePlayerCard('wesbos', 34, "6'2");
div.appendChild(cardDiv);

// make a new div with a class of cards
const cardsDiv = document.createElement('div');
cardsDiv.classList.add('cards');

// Have that function make 4 cards
const cardOne = generatePlayerCard('John', 24, "5'8");
const cardTwo = generatePlayerCard('Mary', 21, "5'3");
const cardThree = generatePlayerCard('Raj', 30, "5'9");
const cardFour = generatePlayerCard('Preeti', 28, "5'5");

// append those cards to the div
cardsDiv.appendChild(cardOne);
cardsDiv.appendChild(cardTwo);
cardsDiv.appendChild(cardThree);
cardsDiv.appendChild(cardFour);
// put the div into the DOM just before the wrapper element
// console.log(cardsDiv);
div.insertAdjacentElement('beforebegin', cardsDiv);
// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
// make out delete function
// loop over them and attach a listener
const deleteCard = function(e) {
  //   this.parentElement.remove();
  //   e.currentTarget.parentElement.remove();
  e.currentTarget.closest('.playerCard').remove();
};
const btns = Array.from(document.querySelectorAll('button'));
btns.forEach(btn => {
  btn.addEventListener('click', deleteCard);
});
