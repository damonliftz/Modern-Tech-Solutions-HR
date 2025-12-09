<template>
  <div>
    <NavBar/>
    <div class="container mt-4">
      <h4>Reports</h4>

      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card p-3">
            <h6>Employee Headcount by Position</h6>
            <canvas id="positionChart"></canvas>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card p-3">
            <h6>Attendance Summary (last 30 records)</h6>
            <canvas id="attendanceChart"></canvas>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import NavBar from '../../components/Layout/NavBar.vue'
import { useMainStore } from '../../stores/main'
import { onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  components: { NavBar },
  setup() {
    const store = useMainStore()

    function buildPositionChart() {
      const byPos = {}
      store.employees.forEach(e => byPos[e.position] = (byPos[e.position] || 0) + 1)
      const ctx = document.getElementById('positionChart')
      new Chart(ctx, {
        type: 'doughnut',
        data: { labels: Object.keys(byPos), datasets: [{ data: Object.values(byPos) }] }
      })
    }
    function buildAttendanceChart() {
      const last = store.attendance.slice(-30)
      const counts = {}
      last.forEach(a => counts[a.status] = (counts[a.status] || 0) + 1)
      const ctx = document.getElementById('attendanceChart')
      new Chart(ctx, {
        type: 'bar',
        data: { labels: Object.keys(counts), datasets: [{ label: 'Records', data: Object.values(counts) }] },
        options: { indexAxis: 'y' }
      })
    }

    onMounted(() => {
      setTimeout(() => {
        buildPositionChart()
        buildAttendanceChart()
      }, 100) // wait DOM
    })

    return {}
  }
}
</script>
