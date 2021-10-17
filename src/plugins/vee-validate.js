import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  max,
  required,
  numeric,
  digits,
  email
} from 'vee-validate/dist/rules'
extend('max', {
  ...max,
  message: '{_filed_} 필드는 {length}자를 초과할 수 없습니다.'
})
extend('required', {
  ...required,
  message: '{_field_} 필드는 필수값 입니다.'
})
extend('numeric', {
  ...numeric,
  message: '{_field_} 필드는 숫자만 구성되어야 합니다.'
})
extend('digits', {
  ...digits,
  message: '{_field_} 필드는 {length} 자리여야 합니다.'
})
extend('email', {
  ...email,
  message: '잘못 입력된 이메일 주소입니다.'
})
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
