import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Auth/Login_Data.vue'
import Dashboard from '../views/Auth/Employee_Dashboard.vue'
import Employees from '../views/Employees/EmployeeList.vue'
import Payroll from '../views/Payroll/Payroll_data.vue'
import TimeOff from '../views/TimeOff/TimeOffRequests.vue'
import Attendance from '../views/Attendance/Attendance_Data.vue'
import Reports from '../views/Reports/Reports_data.vue'
import { useMainStore } from '../stores/main'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/employees', component: Employees, meta: { requiresAuth: true } },
  { path: '/payroll', component: Payroll, meta: { requiresAuth: true } },
  { path: '/timeoff', component: TimeOff, meta: { requiresAuth: true } },
  { path: '/attendance', component: Attendance, meta: { requiresAuth: true } },
  { path: '/reports', component: Reports, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useMainStore()
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/login')
  } else next()
})

export default router

