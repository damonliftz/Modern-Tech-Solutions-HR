<template>
  <div class="card mt-4 p-3">
    <h5>{{ existing ? 'Edit' : 'New' }} Employee</h5>
    <form @submit.prevent="save">
      <div class="row">
        <div class="col-md-6 mb-2">
          <label>First Name</label>
          <input v-model="data.firstName" class="form-control" required />
        </div>
        <div class="col-md-6 mb-2">
          <label>Last Name</label>
          <input v-model="data.lastName" class="form-control" required />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-2">
          <label>Email</label>
          <input v-model="data.email" class="form-control" type="email" required />
        </div>
        <div class="col-md-6 mb-2">
          <label>Position</label>
          <input v-model="data.position" class="form-control" required />
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mb-2">
          <label>Monthly Salary (ZAR)</label>
          <input v-model.number="data.salaryMonthly" class="form-control" type="number" min="0" required />
        </div>
        <div class="col-md-4 mb-2">
          <label>Employment Date</label>
          <input v-model="data.employmentDate" class="form-control" type="date" />
        </div>
        <div class="col-md-4 d-flex align-items-end mb-2">
          <button class="btn btn-success me-2" type="submit">Save</button>
          <button type="button" class="btn btn-outline-secondary" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useMainStore } from '../../stores/main'

export default {
  props: { existing: Object },
  setup(props, { emit }) {
    const store = useMainStore()
    const data = reactive(props.existing ? { ...props.existing } : {
      firstName: '', lastName: '', email: '', position: '', salaryMonthly: 0, employmentDate: ''
    })

    function save() {
     
      if (!data.firstName || !data.lastName || !data.email) {
        alert('Please fill required fields')
        return
      }
      if (props.existing) store.updateEmployee(data.id, data)
      else store.addEmployee({ ...data })
      emit('close')
    }

    return { ...toRefs(data), data, save }
  }
}
</script>
