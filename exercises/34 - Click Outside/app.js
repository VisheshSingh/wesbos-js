// DOM Elements
const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

// Event Handlers
function handleBtnClick(e) {
  //   modalOuter.classList.add('open');
  const card = e.currentTarget.closest('.card');
  const imgSrc = card.querySelector('img').src;
  //   console.log(imgSrc);
  const desc = card.dataset.description;
  //   console.log(desc);
  const html = `
    <img src=${imgSrc.replace('200', '600')} alt=${desc} width=600 height=600 />
    <p>${desc}</p>
  `;

  modalInner.innerHTML = html;
  modalOuter.classList.add('open');
}

function closeModal() {
  modalOuter.classList.remove('open');
}
// Event Listeners
cardButtons.forEach(button => {
  button.addEventListener('click', handleBtnClick);
});

modalOuter.addEventListener('click', e => {
  const isOutside = !e.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
