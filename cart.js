// Sepet ürünlerini API'den çek
function loadCart() {
  fetch('http://localhost:3000/cart')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Sepet verileri alınamadı.');
      }
      return response.json();
    })
    .then((data) => {
      const cartItemsContainer = document.getElementById('cart-items');
      const totalPriceElement = document.getElementById('total-price');
      cartItemsContainer.innerHTML = '';
      let totalPrice = 0;
      // Sepetteki ürünleri listele
      data.forEach((item) => {
        const row = document.createElement('tr');
        totalPrice += item.price * item.quantity;

        // Dinamik olarak HTML oluşturuluyor
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.price} ₺</td>
          <td>
            <input type="number" min="1" value="${item.quantity}" onchange="updateCart(${item.product_id}, this.value)">
          </td>
          <td>${(item.price * item.quantity).toFixed(2)} ₺</td>
          <td>
            <span class="delete-btn" onclick="removeFromCart(${item.product_id})"><i class="fas fa-trash-alt"></i></span>
          </td>
        `;
        cartItemsContainer.appendChild(row);
        
      });

      // Toplam fiyatı güncelle
      totalPriceElement.textContent = totalPrice.toFixed(2);
    })
    .catch((error) => console.error('Sepeti yüklerken hata oluştu:', error));
 

}


// Sepet miktarını güncelle
function updateCart(cartId, quantity) {
  fetch('http://localhost:3000/update-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartId, quantity }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Miktar güncellenemedi.');
      }
      return response.json();
    })
    .then(() => loadCart())
    .catch((error) => console.error('Miktarı güncellerken hata oluştu:', error));
}
  function removeFromCart(cartId) {

    console.log('Silmek istediğiniz ürün ID:', cartId); // Bu satırı ekleyerek id'yi konsola yazdır
    fetch('http://localhost:3000/remove-from-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ürün silinemedi.');
        }
        return response.json();
      })
      .then(() => loadCart())
      .catch((error) => console.error('Ürünü silerken hata oluştu:', error));
  }
  

  function addToCart(productId) {
    fetch('http://localhost:3000/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
    })
        .then((response) => response.json())
        .then((data) => alert(data.message))
        .catch((error) => console.error('Hata:', error));

        updateCartCount();
}

// Sayfa yüklendiğinde sepeti getir
window.onload = loadCart;
