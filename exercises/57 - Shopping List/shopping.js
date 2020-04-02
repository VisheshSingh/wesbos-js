const shoppingList = document.querySelector('.shopping');
const list = document.querySelector('.list');

const items = [];

function handleFormSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  const item = {
    name,
    id: Date.now(),
    complete: false
  };

  items.push(item);
  shoppingList.reset();
  displayItems();
}

function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
                <input type="checkbox"/>
                <span class="itemName">${item.name}</span>
                <button>&times;</button>
            </li>`
    )
    .join('');
  list.innerHTML = html;
}

shoppingList.addEventListener('submit', handleFormSubmit);
