const shoppingList = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function handleFormSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false
  };

  items.push(item);
  shoppingList.reset();
  // displayItems();
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
                <input type="checkbox"  id="${item.id}" ${
        item.complete ? 'checked' : ''
      }/>
                <span class="itemName">${item.name}</span>
                <button aria-label="Remove ${item.name}" id="${
        item.id
      }">&times;</button>
            </li>`
    )
    .join('');
  list.innerHTML = html;
}

function mirrorLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreLocalStorage() {
  const listItems = JSON.parse(localStorage.getItem('items'));
  if (listItems.length) {
    items.push(...listItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function checkItem(id) {
  const itemRef = items.find(item => item.id === id);
  console.log(itemRef);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingList.addEventListener('submit', handleFormSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorLocalStorage);
list.addEventListener('click', e => {
  const id = parseInt(e.target.id);
  console.log(id);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    checkItem(id);
  }
});
restoreLocalStorage();
