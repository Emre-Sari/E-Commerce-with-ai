document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector(".register-form");
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = document.querySelector("#new-username").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#new-password").value;
  
      if (!username || !email || !password) {
        alert("Lütfen tüm alanları doldurun.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message);
          window.location.href = "login.html";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Kayıt hatası:", error);
        alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    });
  });
  