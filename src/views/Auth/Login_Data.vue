<template>
<div class="auth-container">
  <div class="modal" id="loginModal">
    <div class="modal-content">
      <h2>Login</h2>


      <div class="tabs">
        <button class="tab active" data-target="employeeLogin">Employee</button>
        <button class="tab" data-target="adminLogin">Admin</button>
      </div>


      <form id="employeeLogin" class="login-form active">
        <input type="email" placeholder="Employee Email" required>
        <input type="password" placeholder="Password" required>
        <button type="submit">Login as Employee</button>
      </form>


      <form id="adminLogin" class="login-form">
        <input type="email" placeholder="Admin Email" required>
        <input type="password" placeholder="Password" required>
        <button type="submit">Login as Admin</button>
      </form>


      <div class="signup">
        Don't have an account? <a href="#" id="openSignup">Sign Up</a>
      </div>
    </div>
  </div>


  <div class="modal" id="signupModal">
    <div class="modal-content">
      <h2>Sign Up</h2>

      <form id="signupForm">
        <input type="text" placeholder="Full Name" required>
        <input type="email" placeholder="Email" required>
        <input type="password" placeholder="Password" required>


        <label for="profileImage" class="image-label">Upload Profile Image</label>
        <input type="file" id="profileImage" accept="image/*">

        <button type="submit">Sign Up</button>
      </form>

      <div class="signup">
        Already have an account? <a href="#" id="backToLogin">Login</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  mounted() {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');

    loginModal.style.display = 'flex';

    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.login-form');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        forms.forEach(f => f.classList.remove('active'));
        document.getElementById(tab.dataset.target).classList.add('active');
      });
    });


    document.getElementById('openSignup').addEventListener('click', e => {
      e.preventDefault();
      loginModal.style.display = 'none';
      signupModal.style.display = 'flex';
    });

    document.getElementById('backToLogin').addEventListener('click', e => {
      e.preventDefault();
      signupModal.style.display = 'none';
      loginModal.style.display = 'flex';
    });
  }
}
</script>
