// Görsellerin listesi
const images = ["img/boya1.jpg", "img/boya2.jpg", "img/boya4.jpg"];
let currentIndex = 0;

// Sonraki resmi göster
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("slider-image").src = images[currentIndex];
}

// Önceki resmi göster
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById("slider-image").src = images[currentIndex];
}

// Menü simgesi tıklama işlevi
document.getElementById("menu-toggle").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
});
 // Sidebar'ı kapatmak için "X" butonuna tıklama işlevi
document.getElementById("close-sidebar").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("open");
});

// Otomatik kaydırma işlevi: 3 saniyede bir resim değiştirecek
setInterval(nextImage, 3000);  // 3000 milisaniye = 3 saniye
