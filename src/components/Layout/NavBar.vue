<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ModernTech HR</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><router-link class="nav-link" to="/dashboard">Dashboard</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/employees">Employees</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/payroll">Payroll</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/timeoff">Time Off</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/attendance">Attendance</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/reports">Reports</router-link></li>
        </ul>
        <div class="d-flex align-items-center">
          <div class="me-3 small-note" v-if="user">Signed in as {{ user.name }}</div>
          <button class="btn btn-outline-light btn-sm" @click="doLogout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useMainStore } from '../../stores/main'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useMainStore()
    const router = useRouter()
    const user = store.currentUser
    function doLogout() {
      store.logout()
      router.push('/login')
    }
    return { user, doLogout }
  }
}
</script>
