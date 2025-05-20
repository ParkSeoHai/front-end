import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  name: yup.string().required('Tên là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  phone: yup.string().matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ'),
});

export const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required('Mật khẩu cũ là bắt buộc'),
  newPassword: yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu mới là bắt buộc'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});