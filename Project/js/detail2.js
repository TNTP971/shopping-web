const fetchDetailProduct = async () => {
    // 1. Lấy id từ URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    // 2. Fetch dữ liệu bàn phím
    const response = await fetch("./job/data2.json");
    const data = await response.json();

    // 3. Tìm sản phẩm theo id
    const product = data.find(item => String(item.id) === String(productId));

    // 4. Box render
    const detailBox = document.querySelector("#detail-product");

    if (!product) {
        detailBox.innerHTML = "<p> Không tìm thấy sản phẩm</p>";
        return;
    }

    // 5. Nếu không có images thì tạo mảng rỗng
    const images = product.images && product.images.length
        ? product.images
        : ["./image/no-image.png"];

    detailBox.innerHTML = `
        <div class="row product-detail">

            <!-- HÌNH ẢNH -->
            <div class="col-md-6">
                <img src="${images[0]}"
                     class="img-fluid mb-3"
                     id="mainImage">

                <div class="d-flex gap-2 mt-2">
                    ${images.map(img => `
                        <img src="${img}"
                             class="img-thumbnail"
                             style="width:80px;cursor:pointer"
                             onclick="document.getElementById('mainImage').src='${img}'">
                    `).join("")}
                </div>
            </div>

            <!-- THÔNG TIN -->
            <div class="col-md-6">
                <h2>${product.name}</h2>

                <p>
                    <span class="text-danger fw-bold fs-5">
                        ${product["sale-price"].toLocaleString("vi-VN")}đ
                    </span>
                    <del class="text-muted ms-2">
                        ${product.price.toLocaleString("vi-VN")}đ
                    </del>
                </p>

                <h3>Thông số bàn phím</h3>
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Layout</td>
                            <td>${product.layout || "Đang cập nhật"}</td>
                        </tr>
                        <tr>
                            <td>Switch</td>
                            <td>${product.switch || "Đang cập nhật"}</td>
                        </tr>
                        <tr>
                            <td>Kết nối</td>
                            <td>${product.connection || "Đang cập nhật"}</td>
                        </tr>
                        <tr>
                            <td>LED</td>
                            <td>${product.led || "Đang cập nhật"}</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Màu sắc</h3>
                <select class="form-select w-50">
                    ${(product.colors || []).map(color => `
                        <option>${color}</option>
                    `).join("")}
                </select>

                <button class="btn btn-primary mt-3">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `;
};

fetchDetailProduct();
