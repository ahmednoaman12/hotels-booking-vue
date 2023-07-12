<template>
  <div>
    <b-form-rating
      v-model="avgRating"
      variant="warning"
      :id="`rating-popover-target-${id}`"
      no-border
      inline
      readonly
    >
    </b-form-rating>
  </div>
</template>

<script>
export default {
  name: "HotelCardRating",
  props: {
    id: Number,
    rating: Object
  },
  data() {
    return {
     
    }
  },
  computed: {
    avgRating() {
      return Object.values(this.rating).reduce((prev, curr) => prev + curr) / 4;
    }
  }
};
</script>

<style>
.b-rating {
  background-color: transparent;
}
</style>