<template>
  <div>
    <NavBar/>
    <div class="container mt-4">
      <h4>Time Off Requests</h4>

      <div class="card p-3 mb-3">
        <h6>New Request</h6>
        <form @submit.prevent="submitRequest">
          <div class="row g-2">
            <div class="col-md-4">
              <label>Employee</label>
              <select v-model="form.employeeId" class="form-select" required>
                <option value="">Select employee</option>
                <option v-for="e in employees" :value="e.id" :key="e.id">
                  {{ e.firstName }} {{ e.lastName }}
                </option>
              </select>
            </div>
            <div class="col-md-2">
              <label>Start</label>
              <input v-model="form.startDate" type="date" class="form-control" required />
            </div>
            <div class="col-md-2">
              <label>End</label>
              <input v-model="form.endDate" type="date" class="form-control" required />
            </div>
            <div class="col-md-2">
              <label>Type</label>
              <select v-model="form.type" class="form-select">
                <option>Annual</option>
                <option>Sick</option>
                <option>Unpaid</option>
              </select>
            </div>
            <div class="col-md-2 d-flex align-items-end">
              <button class="btn btn-success w-100">Submit</button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <h6>Requests</h6>
        <table class="table table-sm">
          <thead><tr><th>Employee</th><th>Dates</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="r in requests" :key="r.id">
              <td>{{ findName(r.employeeId) }}</td>
              <td>{{ r.startDate }} → {{ r.endDate }}</td>
              <td>{{ r.type }}</td>
              <td>
                <span :class="statusClass(r.status)">{{ r.status }}</span>
              </td>
              <td>
                <button v-if="r.status==='Pending'" class="btn btn-sm btn-success me-1" @click="update(r.id,'Approved')">Approve</button>
                <button v-if="r.status==='Pending'" class="btn btn-sm btn-danger me-1" @click="update(r.id,'Denied')">Deny</button>
                <button class="btn btn-sm btn-outline-secondary" @click="deleteReq(r.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
    const requests = store.timeOffRequests
    const form = reactive({ employeeId:'', startDate:'', endDate:'', type:'Annual', reason:'' })

    function submitRequest() {
      if (!form.employeeId || !form.startDate) { alert('Select employee and start date'); return }
      store.createTimeOff({ ...form })
      form.employeeId = ''
      form.startDate=''
      form.endDate=''
    }
    function findName(id) {
      const e = employees.find(x => x.id === id)
      return e ? `${e.firstName} ${e.lastName}` : 'Unknown'
    }
    function update(id, status) { store.updateTimeOffStatus(id, status) }
    function deleteReq(id) {
      if (confirm('Delete request?')) {
        store.timeOffRequests.splice(store.timeOffRequests.findIndex(x => x.id === id), 1)
        store.persist()
      }
    }
    function statusClass(s) {
      if (s==='Pending') return 'badge bg-warning text-dark'
      if (s==='Approved') return 'badge bg-success'
      return 'badge bg-danger'
    }

    return { employees, requests, form, submitRequest, findName, update, deleteReq, statusClass }
  }
}
</script>
