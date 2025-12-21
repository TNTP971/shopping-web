const fletchDetailCourse = async () => {
  const Params = new URLSearchParams(window.location.search);
  const CourseId = Params.get("id");

  if (!CourseId) {
    console.error(" Ko co id sản phẩm");
    return;
  }

  const response = await fetch("./job/data.json");
  const data = await response.json();

  const course = data.find(item => item.id == CourseId);

  const detailCourse = document.querySelector("#detail-product");

  if (!course) {
    detailCourse.innerHTML = "<h3>Không tìm thấy sản phẩm</h3>";
    return;
  }

  detailCourse.innerHTML = `
    <div class="row product-detail">
      <div class="col-md-6">
        <img src="${course.images[0]}" class="img-fluid">
        <div class="d-flex mt-2">
          ${course.images.map(img => `
            <img src="${img}" class="img-thumbnail me-2" style="width:80px">
          `).join("")}
        </div>
      </div>

      <div class="col-md-6">
        <h2>${course.name}</h2>

        <p>
          <span class="text-danger fw-bold">
            ${course["sale-price"].toLocaleString("vi-VN")}đ
          </span>
          <del class="ms-2 text-muted">
            ${course.price.toLocaleString("vi-VN")}đ
          </del>
        </p>

        <table class="table">
          <tr><td>Trọng lượng</td><td>${course.weight}</td></tr>
          <tr><td>Chipset</td><td>${course.chipset}</td></tr>
          <tr><td>Tốc độ</td><td>${course.speed}</td></tr>
          <tr><td>MCU</td><td>${course.MCU}</td></tr>
          <tr><td>Kết nối</td><td>${course.connectivity}</td></tr>
        </table>

        <select class="form-control">
          ${course.colors.map(c => `<option>${c}</option>`).join("")}
        </select>

        <button class="btn btn-primary mt-3">Thêm vào giỏ</button>
      </div>
    </div>
    `;
};

fletchDetailCourse();
