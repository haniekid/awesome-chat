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
  token_undefined: "Token không tồn tại",
  login_failed: "Sai tài khoản hoặc mật khẩu",
  server_error:
    "Có lỗi phía máy chủ, vui lòng liên hệ với bộ phận kỹ thuật để được hỗ trợ",
};

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo thành công. Vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập. Xin cảm ơn`;
  },
  account_actived:
    "Kích hoạt tài khoản thành công, bạn có thể đăng nhập vào Awesome",
  loginSuccess: (userName) => {
    return `Xin chào ${userName}, chúc bạn một ngày tốt lành!`;
  },
};

export const transMail = {
  subject: "Awesome chat: Xác nhận kích hoạt tài khoản",
  template: (linkVerify) => {
    return `
        <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng Awesome Chat.</h2>
        <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
        <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
        <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng.</h4>
      `;
  },
  send_failed:
    "Xuất hiện lỗi trong quá trình gửi email, vui lòng liên hệ lại với bộ phận hỗ trợ của chúng tôi. Xin cảm ơn!",
};
