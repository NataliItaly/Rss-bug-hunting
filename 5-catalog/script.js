const products = [
  { id: 1, name: 'iPhone 15', price: 999, category: 'phone' },
  { id: 2, name: 'Galaxy S24', price: 899, category: 'phone' },
  { id: 3, name: 'Pixel 8', price: 699, category: 'phone' },
  { id: 4, name: 'MacBook Air', price: 1199, category: 'laptop' },
  { id: 5, name: 'ThinkPad X1', price: 1399, category: 'laptop' },
  { id: 6, name: 'AirPods Pro', price: 249, category: 'audio' },
  { id: 7, name: 'Sony WH-1000', price: 349, category: 'audio' },
  { id: 8, name: 'JBL Flip', price: 129, category: 'audio' },
];

const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const sortSelect = document.getElementById('sort');
const resetBtn = document.getElementById('reset');
const grid = document.getElementById('grid');
const countEl = document.getElementById('count');

render();

function getFiltered() {
  let searched;
  let sorted;
  let result;

  const search = searchInput.value.toLowerCase().trim();
  const category = categorySelect.value;
  const sort = sortSelect.value;
  console.log(search, category, sort);

  if (search) {
    searched = products.filter((p) => p.name.toLowerCase().includes(search));
  } else {
    searched = products;
  }
  console.log('after search', searched);
  // check category
  if (category !== 'all') {
    sorted = searched.filter((p) => p.category === category);
  } else {
    sorted = searched;
  }
  console.log('after category', sorted);

  if (sort === 'asc') {
    result = structuredClone(sorted).sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    result = structuredClone(sorted).sort((a, b) => b.price - a.price);
  } else {
    result = sorted;
  }
  console.log('after ordering', result);

  return result;
}

function render() {
  grid.innerHTML = '';

  const items = getFiltered();

  items.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${p.name}</h3><p class="cat">${p.category}</p><p class="price">$${p.price}</p>`;
    grid.appendChild(card);
  });
  countEl.textContent = items.length;
}

searchInput.addEventListener('input', render);
categorySelect.addEventListener('change', render);
sortSelect.addEventListener('change', render);

resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = 'all';
  sortSelect.value = 'default';

  render();
});
