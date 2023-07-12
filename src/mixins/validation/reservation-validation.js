import { required, email, minValue } from "vuelidate/lib/validators";

export default {
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      age: {
        required,
        minValue: minValue(6),
      },


      sex: {
        required
      },
    },
  },
}