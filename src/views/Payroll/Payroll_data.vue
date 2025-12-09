<template>
  <div>
    <NavBar />
    <div class="container mt-4">
      <h4 class="mb-3">Payroll Processing</h4>

      
      <div class="card p-3 mb-4">
        <form @submit.prevent="runPayroll">
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <label class="form-label">Employee</label>
              <select v-model="employeeId" class="form-select" required>
                <option value="">Select employee</option>
                <option v-for="e in employees" :key="e.id" :value="e.id">
                  {{ e.firstName }} {{ e.lastName }} ({{ e.position }})
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Period Start</label>
              <input v-model="periodStart" type="date" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label class="form-label">Period End</label>
              <input v-model="periodEnd" type="date" class="form-control" required />
            </div>
            <div class="col-md-2">
              <button class="btn btn-primary w-100">Generate Payslip</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Payslip Result -->
      <div v-if="resultPayslip" class="card p-3">
        <h5>Payslip for {{ empName }}</h5>
        <hr>
        <div class="row">
          <div class="col-md-6 mb-2"><b>Period:</b> {{ periodStart }} to {{ periodEnd }}</div>
          <div class="col-md-6 mb-2"><b>Hours Worked:</b> {{ resultPayslip.hoursWorked }}</div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-1"><b>Gross Pay:</b> R {{ resultPayslip.grossPay.toLocaleString() }}</div>
          <div class="col-md-6 mb-1"><b>Tax:</b> R {{ resultPayslip.tax.toLocaleString() }}</div>
          <div class="col-md-6 mb-1"><b>Pension:</b> R {{ resultPayslip.pension.toLocaleString() }}</div>
          <div class="col-md-6 mb-1"><b>UIF:</b> R {{ resultPayslip.uif.toLocaleString() }}</div>
          <div class="col-md-6 mb-1"><b>Net Pay:</b> R {{ resultPayslip.netPay.toLocaleString() }}</div>
        </div>
      </div>

      <!-- Info if no payslip -->
      <div v-else class="alert alert-info">
        Select an employee and period above to generate a payslip.
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/Layout/NavBar.vue'
import { useMainStore } from '../../stores/main'
import { ref, computed } from 'vue'

export default {
  components: { NavBar },
  setup() {
    const store = useMainStore()
    const employees = store.employees

    const employeeId = ref('')
    const periodStart = ref(new Date().toISOString().slice(0,10))
    const periodEnd = ref(new Date().toISOString().slice(0,10))
    const resultPayslip = ref(null)

    const empName = computed(() => {
      const emp = employees.find(e => e.id === employeeId.value)
      return emp ? `${emp.firstName} ${emp.lastName}` : ''
    })

    function runPayroll() {
      if (!employeeId.value) {
        alert('Please select an employee')
        return
      }
      // Use the Pinia store payroll function
      resultPayslip.value = store.generatePayslip(employeeId.value, periodStart.value, periodEnd.value)
    }

    return {
      employees,
      employeeId,
      periodStart,
      periodEnd,
      resultPayslip,
      empName,
      runPayroll
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background: #fff;
}
h5 {
  font-weight: 600;
}
</style>
