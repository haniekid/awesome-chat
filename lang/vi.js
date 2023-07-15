export const transValidation = {
  email_incorrect: "Email phải có dạng example@gmail.com",
  password_incorrect:
    "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
  password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác",
  gender: "Trường giới tính chưa chính xác!",
};

export const transErrors = {
  account_in_use: "Email đã được sử dụng",
  account_removed:
    "Tài khoản này đã bị gỡ khỏi hệ thống. Trường hợp điều này có thể  đã bị hiểu nhầm, vui lòng liên hệ bộ phận hỗ trợ của chúng tôi",
  account_not_active:
    "Email đã được đăng ký nhưng chưa kích hoạt tài khoản, vui lòng kiểm tra email hoặc liên hệ bộ phận kỹ thuật để đựoc hỗ trợ",
};

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo thành công. Vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập. Xin cảm ơn`;
  },
};
