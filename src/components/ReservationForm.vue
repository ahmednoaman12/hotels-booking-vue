<template>
  <b-form :ref="refer">
    <b-form-group
      label=" full Name "
    >
      <b-form-input
        v-model="$v.form.name.$model"
        name="name"
        :state="validateState('form.name')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Email">
      <b-form-input
        v-model="$v.form.email.$model"
        name="email"
        :state="validateState('form.email')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be a valid e-mail adress.
      </b-form-invalid-feedback>
    </b-form-group>


    <b-form-group label="Age">
      <b-form-input
        v-model="$v.form.age.$model"
        name="age"
        type="number"
        :state="validateState('form.age')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be greater than 6.
      </b-form-invalid-feedback>
    </b-form-group>



    <b-form-group label="Sex">
      <b-form-select
        v-model="$v.form.sex.$model"
        name="sex"
        :options="sex"
        :state="validateState('form.sex')"
      ></b-form-select>
      <b-form-invalid-feedback>
        This is a required.
      </b-form-invalid-feedback>
    </b-form-group>

    <div class="d-flex justify-content-between">
      <!-- next btn -->
      <b-button 
        v-if="showNextBtn"  
        variant="primary" 
        :disabled="$v.$invalid"
        @click="$emit('next')"
      >
        Next
        <i class="ml-1 fas fa-arrow-right"></i>
      </b-button>

      <!-- payment btn -->
      <b-button 
        v-if="!showNextBtn"  
        variant="primary" 
        :disabled="disablePaymentBtn"
        v-b-modal.payment-modal
      >
        Proceed To Payment
        <i class="ml-1 fas fa-credit-card"></i>
      </b-button>

    </div>

  </b-form>
</template>

<script>
import reservationValidation from "@/mixins/validation/reservation-validation.js"
import validateState from "@/mixins/validation/validate-state.js"

export default {
  name: "ReservationForm",
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    showNextBtn: {
      type: Boolean,
      required: true
    },
    disablePaymentBtn: {
      type: Boolean,
      required: true
    },
    refer: {
      type: String,
      required: true
    },
  },
  mixins: [reservationValidation, validateState],
  data() {
    return {
      form: {
        name: "",
        email: "",
        age: null,
        sex: ""
      },
      sex: ["Male", "Female", "Other"],
    };
  },
  computed: {
     isInvalid() {
      return this.$v.$invalid;
    }
  },
  watch: {
    isInvalid: function(val) {
      this.$emit("is-invalid", val);
    },
    isActive: function(isActive) {
      if(isActive) {
        if(!this.$v.$dirty) {  
          this.$refs[this.refer][1].focus();
        } else {  
          for (let i = 0; i < this.$refs[this.refer].length; i++) {
            if(!this.validateState(`form.${this.$refs[this.refer][i].name}`)) {
              this.$refs[this.refer][i].focus();
              break;
            }
          }
        }
      }
    }
  },
  created() {
     this.$emit("is-invalid", this.$v.$invalid);
  },
  methods: {
     formMagic() {
      this.form.name = "ahmed noaman";
      this.form.email = "ahmednoaman@gmail.com";
      this.form.age = 30;
      this.form.sex = "Male";
      this.$v.$touch();
    }
  }
};
</script>

