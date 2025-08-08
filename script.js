function productHtml(product) {
  return `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h2>${product.name}</h2>
            <p class="description">${product.description}</p>
            <div class="price-rating">
              <span class="price">$${product.price}</span>
            </div>
          </div>
        `;
}

function renderProducts(products) {
  let productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = productHtml(product);
    productList.appendChild(card);
  });
}

async function fetchProducts() {
  try {
    let response = await fetch(
      "https://sonnguyen2005.pythonanywhere.com/api/i_fan/categories"
    );
    const data = await response.json();

    // Gom tất cả sản phẩm từ các danh mục
    products = data.categories.flatMap((category) =>
      category.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      }))
    );

    renderProducts(products);
    // renderProducts(data);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById(
      "product-list"
    ).innerHTML = `<p style="color:red;">Failed to load products.</p>`;
  }
}

window.addEventListener("DOMContentLoaded", fetchProducts());
