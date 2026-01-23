
        let current = 0;
        let paused = false;
        const ims = document.querySelectorAll('.thumb-strip img');
        const display = document.getElementById('targetImg');
        const scope = document.getElementById('galleryScope');

        function jumpTo(idx) {
            current = idx;
            display.style.opacity = 0;
            setTimeout(() => {
                display.src = ims[current].src;
                display.style.opacity = 1;
                ims.forEach((m, i) => m.classList.toggle('active', i === current));
            }, 200);
        }

        let timer = setInterval(() => {
            if(!paused) {
                current = (current + 1) % ims.length;
                jumpTo(current);
            }
        }, 3500);

        scope.onmouseenter = () => paused = true;
        scope.onmouseleave = () => paused = false;

        document.onkeydown = (e) => {
            if(e.key === "ArrowRight") jumpTo((current + 1) % ims.length);
            if(e.key === "ArrowLeft") jumpTo((current - 1 + ims.length) % ims.length);
        }

        window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
});


const t = document.getElementById("themeToggle");

t.onclick = () => {
  document.body.classList.toggle("dark");
  t.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
};
