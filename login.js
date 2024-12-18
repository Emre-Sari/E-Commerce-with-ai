document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (!username || !password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Kullanıcı oturum bilgisini localStorage'da sakla
        localStorage.setItem("username", data.username);

        // Ana sayfaya yönlendir
        window.location.href = "index.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  });
});
