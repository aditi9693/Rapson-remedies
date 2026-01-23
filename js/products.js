document.addEventListener("DOMContentLoaded", () => {

    let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const perPage = 8;

const grid = document.getElementById("productGrid");
const pagination = document.getElementById("pagination");
const searchBox = document.getElementById("searchBox");
const buttons = document.querySelectorAll(".product-filters button");

const overlay = document.getElementById("quickViewOverlay");
const contentBox = document.getElementById("quickViewContent");

let modalOpen = false;

/* ===============================
   LOAD DATA
================================ */
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    filteredProducts = data;
    render();
  });

/* ===============================
   RENDER PRODUCTS
================================ */
function render() {
  grid.innerHTML = "";
  const start = (currentPage - 1) * perPage;
  const pageItems = filteredProducts.slice(start, start + perPage);

  /* Inside function render() */
pageItems.forEach(p => {
    grid.innerHTML += `
      <div class="product-card" data-id="${p.id}"> <div class="product-img-box">
          ${p.images.map((img, i) =>
            `<img src="${img}" class="product-img ${i === 0 ? 'active' : ''}">`
          ).join("")}
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.composition}</p>
          <span class="tag">${p.category}</span>
          <a href="products/${p.slug}.html" class="view-btn">Details</a> </div>
      </div>
    `;
});

  grid.classList.remove("show");
  setTimeout(() => grid.classList.add("show"), 20);

  renderPagination();
  initImageSliders();
}

/* ===============================
   PAGINATION
================================ */
function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      render();
    });

    pagination.appendChild(btn);
  }
}


/* ===============================
   SEARCH
================================ */
searchBox.addEventListener("input", () => {
  const term = searchBox.value.toLowerCase();
  filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.composition.toLowerCase().includes(term)
  );
  currentPage = 1;
  render();
});

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    filteredProducts = category === "All"
      ? allProducts
      : allProducts.filter(p => p.category === category);

    currentPage = 1;
    render();
  });
});

/* ===============================
   CATEGORY FILTER
================================ */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");

    const cat = btn.dataset.category;
    filteredProducts = cat === "All"
      ? allProducts
      : allProducts.filter(p => p.category === cat);

    currentPage = 1;
    render();
  });
});

/* ===============================
   IMAGE SLIDER
================================ */
function initImageSliders() {
  document.querySelectorAll('.product-card').forEach(card => {
    const images = card.querySelectorAll('.product-img');
    if (images.length <= 1) return;

    let index = 0;

    let interval = setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 2200);

    card.addEventListener('mouseenter', () => clearInterval(interval));
    card.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
      }, 2200);
    });
  });
}

/* ===============================
   QUICK VIEW MODAL
================================ */
/* ===============================
   QUICK VIEW MODAL
================================ */
/* ===============================
   QUICK VIEW EVENT LISTENER
================================ */
/* ===============================
   QUICK VIEW EVENT LISTENER
================================ */
document.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    
    // Prevent opening if clicking the "Details" button or if modal is open
    if (!card || e.target.classList.contains('view-btn') || modalOpen) return;

    const productId = card.dataset.id;
    
    // Use == to match string "5" to number 5
    const product = allProducts.find(p => p.id == productId); 
    
    if (!product) {
        console.error("Product not found for ID:", productId);
        return;
    }

    modalOpen = true;
    openQuickView(product);
});

/* Inside function openQuickView(product) */
function openQuickView(product) {
    overlay.style.display = "flex";
    contentBox.innerHTML = `
        <div class="quick-view-layout">
            <div class="quick-view-image-box">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="quick-view-info">
                <h2>${product.name}</h2>
                <p><strong>Composition:</strong> ${product.composition}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Indications:</strong></p>
                <ul>
                    ${product.indications.map(i => `<li>${i}</li>`).join("")}
                </ul>
                <a href="products/${product.slug}.html" class="view-btn-modal">View Full Product Page</a>
            </div>
        </div>
    `;
}

// Attach the close function via JS instead of HTML onclick
const closeBtn = document.querySelector(".close-modal");
if (closeBtn) {
    closeBtn.addEventListener("click", closeQuickView);
}

if (overlay) {
    overlay.addEventListener("click", e => {
        if (e.target === overlay) closeQuickView();
    });
}

function closeQuickView() {
    overlay.style.display = "none";
    modalOpen = false;
}
});

window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
});
