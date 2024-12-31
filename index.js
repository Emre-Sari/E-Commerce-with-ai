document.addEventListener("DOMContentLoaded", function () {
    // Element seçimi
    const userLink = document.getElementById("user-link");
    const logoutAction = document.getElementById("logout-action");
    const logoutButton = document.getElementById("logout-button");
  
    // localStorage'dan kullanıcı adı kontrolü
    const username = localStorage.getItem("username");
  
    if (username) {
      console.log("Kullanıcı adı bulundu:", username); // Test için log
      // Kullanıcı giriş yapmışsa, butonları güncelle
      userLink.textContent = username;
      userLink.href = "#"; // Profil sayfasına yönlendirilebilir
      if (logoutAction) {
        logoutAction.style.display = "block"; // Çıkış yap butonunu göster
      }
    } else {
      console.log("Kullanıcı oturum açmamış."); // Test için log
      // Kullanıcı giriş yapmamışsa Giriş Yap/Kayıt Ol'u göster
      userLink.textContent = "Giriş Yap/Kayıt Ol";
      userLink.href = "login.html";
      if (logoutAction) {
        logoutAction.style.display = "none"; // Çıkış yap butonunu gizle
      }
    }
  
    // Çıkış yap işlemi
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        console.log("Çıkış yap butonuna tıklandı."); // Test için log
        localStorage.removeItem("username"); // localStorage'dan kullanıcı adını sil
        alert("Başarıyla çıkış yaptınız.");
        window.location.href = "index.html"; // Ana sayfaya yönlendir
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const cartLink = document.getElementById("cart-link");
  
    // Kullanıcının giriş yapıp yapmadığını kontrol et
    const username = localStorage.getItem("username");
  
    if (cartLink) {
      cartLink.addEventListener("click", function (e) {
        if (!username) {
          alert("Lütfen giriş yapın veya kayıt olun.");
          e.preventDefault(); // Sepet sayfasına gitmesini engeller
          window.location.href = "login.html"; // Kullanıcıyı giriş sayfasına yönlendir
        }
      });
    }
  });
  
function updateCartCount() {
  fetch('http://localhost:3000/cart/count')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Sepet sayacı alınamadı.');
      }
      return response.json();
    })
    .then((data) => {
      console.log("API'den gelen veri:", data);
      const cartCountElement = document.getElementById('cart-count');
      if (cartCountElement) {
          cartCountElement.textContent = data.total_items || 0; // Gelen veriyi sayaçta göster
      } else {
        console.error("Cart count elementi bulunamadı!");
      }
    })
    .catch((error) => {
      console.error('Sepet sayacı hatası:', error);
    });
}

