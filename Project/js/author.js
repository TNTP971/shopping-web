//Đảm bảo toàn bộ mã JavaScript chỉ chạy sau khi trình duyệt đã tải xong mã HTML
document.addEventListener('DOMContentLoaded', () => {

    // Hàm lỗi chung 
    const showErrorSwal = (message) => {
        Swal.fire({
            title: "Lỗi Validation!",
            text: message,
            icon: "error",
            confirmButtonText: "Đã hiểu"
        });
    };
    // Hàm thành công 
    const showSuccessSwal = (title, message, callback = null) => {
        Swal.fire({
            title: title,
            text: message,
            icon: "success",
            confirmButtonText: "Tuyệt vời"
        }).then((result) => {
            if (result.isConfirmed && callback) {
                callback();
            }
        });
    };

    // Hàm kiểm tra Email hợp lệ
    //Biến emailRegex là một mẫu ký tự dùng để kiểm tra xem chuỗi nhập vào có đúng định dạng email
    const isValidEmail = (email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    // Hàm lấy tất cả người từ Local Storage 
    const getUsers = () => {
        const usersString = localStorage.getItem('users');
        if (!usersString) {
            return []; // Trả về  nếu chưa có dữ liệu
        }
        try {

            const users = JSON.parse(usersString);
            return Array.isArray(users) ? users : [];
        } catch (e) {
            console.error("Lỗi khi đọc dữ liệu người dùng từ Local Storage:", e);
            return [];
        }
    };

    // Hàm lưu mảng người dùng vào Local Storage
    //Hàm này có nhiệm vụ lấy một danh sách (mảng) người dùng đang ở dạng bộ nhớ tạm của JavaScript và cất vào trong ổ cứng của trình duyệt (Local Storage).
    const saveUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    // --- Xử lý Form Đăng nhập login.html ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Ngăn chặn hành vi submit mặc định
            let isValid = true;

            const usernameInput = loginForm.querySelector('input[type="text"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');
            const inputIdentifier = usernameInput.value.trim();
            const password = passwordInput.value;
            const users = getUsers(); // Luôn trả về MẢNG []

            // 1. Kiểm tra Tên đăng nhập/Email
            if (inputIdentifier === "") {
                showErrorSwal('Vui lòng nhập tên đăng nhập hoặc Email.');
                isValid = false;
            } else if (!isValidEmail(inputIdentifier) && inputIdentifier.length < 4) {
                showErrorSwal('Tên đăng nhập không hợp lệ.');
                isValid = false;
            }
            //  Kiểm tra Mật khẩu 
            if (isValid && password === "") {
                showErrorSwal('Vui lòng nhập mật khẩu.');
                isValid = false;
            } else if (isValid && password.length < 6) {
                showErrorSwal('Mật khẩu phải có ít nhất 6 ký tự.');
                isValid = false;
            }

            //kiểm tra thông tin đăng nhập trong Local Storage
            if (isValid) {
                const userFound = users.find(user =>
                    (user.username === inputIdentifier || user.email === inputIdentifier) && user.password === password
                );

                if (userFound) {
                    // Lưu thông tin đăng nhập
                    localStorage.setItem('loggedInUser', JSON.stringify({ username: userFound.username, email: userFound.email, fullName: userFound.fullName }));

                    showSuccessSwal('Đăng nhập thành công!', 'Bạn đã chuyển hướng đến trang chủ.', () => {
                        window.location.href = 'index.html';

                    });

                } else {
                    showErrorSwal('Tên đăng nhập/Email hoặc mật khẩu không chính xác.');
                    isValid = false;
                }
            }
        });
    }

    // --- Xử lý Form Đăng ký (signup.html) ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Ngăn chặn hành vi submit mặc định
            let isValid = true;

            const fullNameInput = signupForm.querySelector('input[name="fullname"]');
            const usernameInput = signupForm.querySelector('input[name="username"]');
            const emailInput = signupForm.querySelector('input[name="email"]');
            const passwordInput = signupForm.querySelector('input[name="password"]');
            const confirmPasswordInput = signupForm.querySelector('input[name="confirm_password"]');
            const termsCheckbox = signupForm.querySelector('input[name="terms"]');

            // Lấy danh sách người dùng 
            const users = getUsers();

            // Kiểm tra Họ tên
            if (fullNameInput.value.trim().length < 2) {
                showErrorSwal('Họ tên phải có ít nhất 2 ký tự.');
                isValid = false;
            }

            // Kiểm tra Username
            if (isValid) {
                const username = usernameInput.value.trim();
                if (username.length < 4) {
                    showErrorSwal('Username phải có ít nhất 4 ký tự.');
                    isValid = false;
                } else if (users.some(user => user.username === username)) {
                    showErrorSwal('Username đã tồn tại. Vui lòng chọn Username khác.');
                    isValid = false;
                }
            }

            // Kiểm tra Email
            if (isValid) {
                const email = emailInput.value.trim();
                if (!isValidEmail(email)) {
                    showErrorSwal('Email không hợp lệ.');
                    isValid = false;
                } else if (users.some(user => user.email === email)) {
                    showErrorSwal('Email đã được sử dụng. Vui lòng sử dụng Email khác.');
                    isValid = false;
                }
            }

            // Kiểm tra Mật khẩu
            if (isValid && passwordInput.value.length < 6) {
                showErrorSwal('Mật khẩu phải có ít nhất 6 ký tự.');
                isValid = false;
            }

            // Kiểm tra Xác nhận mật khẩu
            if (isValid && confirmPasswordInput.value !== passwordInput.value) {
                showErrorSwal('Mật khẩu xác nhận không khớp.');
                isValid = false;
            }

            // iểm tra Điều khoản
            if (isValid && termsCheckbox && !termsCheckbox.checked) {
                showErrorSwal('Vui lòng đồng ý với điều khoản và chính sách.');
                isValid = false;
            }

            // --- LƯU DỮ LIỆU VÀO LOCAL STORAGE ---
            if (isValid) {
                // Tạo  người dùng mới
                const newUser = {
                    fullName: fullNameInput.value.trim(),
                    username: usernameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                };


                users.push(newUser);
                saveUsers(users);

                showSuccessSwal('Đăng ký thành công!', 'Bạn sẽ được chuyển hướng đến trang đăng nhập.', () => {
                    window.location.href = 'login.html';

                });
            }
        });
    }
});