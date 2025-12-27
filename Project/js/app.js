const fetchData = async () => {
  const response = await fetch("./job/data.json");
  const data = await response.json(); //response.json(): Chuyển đổi dữ liệu nhận được (đang ở dạng thô) sang dạng mảng đối tượng (Array of Objects) của JavaScript để chúng ta có thể dùng các hàm như .map(), .length.
  const productList = document.querySelector("#product-list-row");
  const productCount = document.querySelector("#product-count");

  productCount.innerText = data.length;//length là một thuộc tính (property) của mảng. Nó cho bạn biết "Có bao nhiêu phần tử bên trong mảng đó?".

  productList.innerHTML = data.map(item => `
        <div class="col">
          <div class="card product-card h-100">

            <img src="${item.banner}" alt="${item.name}">

            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>

              <div class="price">
                ${item["sale-price"].toLocaleString()}₫<br>
                <small class="text-muted text-decoration-line-through">
                  ${item.price.toLocaleString()}₫
                </small>
              </div>

              <a href="productdetail1.html?id=${item.id}"
                 class="btn btn-dark mt-3 w-100">
                 Mua ngay
              </a>
            </div>

          </div>
        </div>
    `).join("");
};

fetchData()
