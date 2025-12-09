<template>
  <div>
    <NavBar/>
    <div class="container mt-4">
      <h4>Attendance</h4>

      <div class="card p-3 mb-3">
        <form @submit.prevent="mark">
          <div class="row g-2">
            <div class="col-md-4">
              <label>Employee</label>
              <select v-model="form.employeeId" class="form-select" required>
                <option value="">Select</option>
                <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.firstName }} {{ e.lastName }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label>Date</label>
              <input v-model="form.date" type="date" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label>Status</label>
              <select v-model="form.status" class="form-select">
                <option>Present</option>
                <option>Absent</option>
                <option>On Leave</option>
                <option>Remote</option>
              </select>
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <button class="btn btn-primary w-100">Mark</button>
            </div>
          </div>
        </form>
      </div>

      <table class="table">
        <thead><tr><th>Date</th><th>Employee</th><th>Status</th><th>Notes</th></tr></thead>
        <tbody>
          <tr v-for="a in attendance" :key="a.id">
            <td>{{ a.date }}</td>
            <td>{{ findName(a.employeeId) }}</td>
            <td>{{ a.status }}</td>
            <td>{{ a.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/Layout/NavBar.vue'
import { useMainStore } from '../../stores/main'
import { reactive } from 'vue'

export default {
  components: { NavBar },
  setup() {
    const store = useMainStore()
    const employees = store.employees
    const attendance = store.attendance
    const form = reactive({ employeeId:'', date: new Date().toISOString().slice(0,10), status: 'Present', notes: '' })

    function mark() {
      if (!form.employeeId) { alert('Select employee'); return }
      store.markAttendance({ employeeId: form.employeeId, date: form.date, status: form.status, notes: form.notes })
      form.notes = ''
    }
    function findName(id) {
      const e = employees.find(x => x.id === id)
      return e ? `${e.firstName} ${e.lastName}` : 'Unknown'
    }

    return { employees, attendance, form, mark, findName }
  }
}
</script>
