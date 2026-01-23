// ---- SAFETY GUARD ----
document.documentElement.style.overflowX = "hidden";
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

const brand = document.querySelector('.brand');

function popLogo() {
  const directions = [
    'translateX(-60px)',
    'translateX(60px)',
    'translateY(-40px)',
    'translateY(40px)'
  ];

  const random = directions[Math.floor(Math.random() * directions.length)];

  brand.style.transition = 'none';
  brand.style.opacity = '0';
  brand.style.transform = random;

  setTimeout(() => {
    brand.style.transition = 'all 0.5s cubic-bezier(.25,.8,.25,1)';
    brand.style.opacity = '1';
    brand.style.transform = 'translate(0,0)';
  }, 50);
}

// repeat every 7–12 seconds randomly
setInterval(popLogo, 7000 + Math.random() * 5000);

fetch('/data/products.json')
  .then(res => res.json())
  .then(products => {
        const indicator = document.querySelector('.filter-indicator');

    const grid = document.getElementById('productGrid');
    const buttons = document.querySelectorAll('.product-filters button');

    
    function displayProducts(category) {
  grid.classList.remove("show");

    grid.innerHTML = '';

    let filteredProducts = category === 'All'
      ? products
      : products.filter(p => p.category === category);

    filteredProducts.forEach(p => {
      const images = p.images.map(img => `<img src="${img}" class="product-img">`).join("");

      grid.innerHTML += `
  <div class="product-card" data-slug="${p.slug}">
    <div class="product-img-box">${images}</div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <p>${p.composition}</p>
      <span class="tag">${p.category}</span>
    </div>
    <a href="/products/${p.slug}.html" class="view-btn">View Details</a>
  </div>
`;

    });

    initImageSliders();
    setTimeout(() => grid.classList.add("show"), 50);

  
}


    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
                document.querySelector('.product-filters .active')?.classList.remove('active');
        btn.classList.add('active');

        // move glowing indicator
        const rect = btn.getBoundingClientRect();
        const parentRect = btn.parentElement.getBoundingClientRect();
        indicator.style.left = (rect.left - parentRect.left + rect.width / 2 - 20) + 'px';

        displayProducts(btn.dataset.category);

      });
    });

    displayProducts('Gastro');
        const firstBtn = document.querySelector('[data-category="Gastro"]');
    firstBtn.classList.add('active');

    const rect = firstBtn.getBoundingClientRect();
    const parentRect = firstBtn.parentElement.getBoundingClientRect();
    indicator.style.left = (rect.left - parentRect.left + rect.width / 2 - 20) + 'px';


document.querySelector('[data-category="Gastro"]').classList.add('active');

  })
  .catch(err => console.error('Product load error:', err));



function initImageSliders() {
  document.querySelectorAll('.product-card').forEach(card => {
    const images = card.querySelectorAll('.product-img');
    if (!images.length) return;

    let index = 0;
    images[index].classList.add('active');

    let interval = setInterval(nextImage, 2000);

    function nextImage() {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }

    card.addEventListener('mouseenter', () => clearInterval(interval));
    card.addEventListener('mouseleave', () => {
      interval = setInterval(nextImage, 2000);
    });
  });
}

document.addEventListener('mousemove', e => {
  document.querySelectorAll('.bg-orb').forEach((orb, i) => {
    const speed = (i + 1) * 0.02;
    const x = (window.innerWidth / 2 - e.clientX) * speed;
    const y = (window.innerHeight / 2 - e.clientY) * speed;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

const presenceSection = document.querySelector('.presence-section');

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    presenceSection.classList.add('show');
  }
});

observer.observe(presenceSection);



const about = document.querySelector('.about-section');
const cards = document.querySelectorAll('.about-card');

const aboutObs = new IntersectionObserver(e => {
  if (e[0].isIntersecting) {
    about.classList.add('show');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.2}s`;
    });
  }
});

aboutObs.observe(about);


const contactSection = document.querySelector('.contact-section');

const contactObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    contactSection.classList.add('show');
  }
});

contactObserver.observe(contactSection);

document.querySelector('.menu-toggle')
  .addEventListener('click', () => {
    document.querySelector('.nav-links')
      .classList.toggle('show');
});
