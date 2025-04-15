document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".carousel img");
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");
    let index = 0;

    function showImage(i) {
        images.forEach((img, idx) => {
            img.classList.remove("active");
            if (idx === i) {
                img.classList.add("active");
            }
        });
    }

    function nextImage() {
        index = (index + 1) % images.length;
        showImage(index);
    }

    function prevImage() {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
    }

    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);

    showImage(index); // Show the first image initially

    setInterval(nextImage, 5000); // Auto-rotate every 5 seconds
});
