<template>
  <div>
    <NavBar />
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Employees</h4>
        <button class="btn btn-primary" @click="showForm = true">Add Employee</button>
      </div>

      <div class="mt-3">
        <table class="table table-striped table-hover table-fixed">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Position</th><th>Salary</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in employees" :key="e.id">
              <td>{{ e.firstName }} {{ e.lastName }}</td>
              <td>{{ e.email }}</td>
              <td>{{ e.position }}</td>
              <td>R {{ formatMoney(e.salaryMonthly) }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-1" @click="edit(e)">Edit</button>
                <button class="btn btn-sm btn-outline-danger" @click="remove(e.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmployeeForm v-if="showForm" :existing="selected" @close="onClose" />
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/Layout/NavBar.vue'
import EmployeeForm from './EmployeeForm.vue'
import { useMainStore } from '../../stores/main'
import { ref } from 'vue'

export default {
  components: { NavBar, EmployeeForm },
  setup() {
    const store = useMainStore()
    const employees = store.employees
    const showForm = ref(false)
    const selected = ref(null)

    function edit(emp) {
      selected.value = { ...emp }
      showForm.value = true
    }
    function remove(id) {
      if (confirm('Delete this employee?')) store.deleteEmployee(id)
    }
    function onClose() {
      showForm.value = false
      selected.value = null
    }
    function formatMoney(v){ return v.toLocaleString() }

    return { employees, showForm, selected, edit, remove, onClose, formatMoney }
  }
}
</script>
