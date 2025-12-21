const fetchKeyboardData = async () => {
  // 1. Load dữ liệu bàn phím
  const response = await fetch("./job/data2.json");
  const data = await response.json(); 

  const productList = document.querySelector("#product-list-row");
  const productCount = document.querySelector("#product-count");

  // 2. Hiển thị số lượng sản phẩm
  productCount.innerText = data.length;

  // 3. Render danh sách bàn phím
  productList.innerHTML = data.map(item => `
    <div class="col">
      <div class="card product-card h-100">

        <img src="${item.banner}" alt="${item.name}">

        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>

          <div class="price">
            ${item["sale-price"].toLocaleString("vi-VN")}₫<br>
            <small class="text-muted text-decoration-line-through">
              ${item.price.toLocaleString("vi-VN")}₫
            </small>
          </div>

          <a href="productdetail2.html?id=${item.id}"
             class="btn btn-dark mt-3 w-100">
             Mua ngay
          </a>
        </div>

      </div>
    </div>
  `).join("");
};


fetchKeyboardData();
