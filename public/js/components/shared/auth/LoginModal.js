async function LoginModal() {

	return `
	<link rel="stylesheet" href="http://localhost:4000/js/components/shared/auth/auth.css" />
	<div id="modal" class="modal_auth">
		<div class="modal-content_auth">
			<span class="close_auth">&times;</span>
			<form onsubmit="" id="login-form_auth">
				<h2>Login</h2>
				<div id="error-message_auth" class="error"></div>
				<div id="success-message_auth" class="success"></div>
				<label>Email</label>
				<input type="email" onchange="setEmail( )" id="email-login" name="email" class="form-control_auth" required>
				<label>Password</label>
				<input type="password" onchange="setPassword( )" id="password-login" name="password" class="form-control_auth" required>
				<button type="submit" class="btn_auth">Login</button>
			</form>
		</div>
	</div>`
}
let newUser = {}
function setEmail() {
	newUser.email = document.getElementById('email-login').value
}

function setPassword() {
	newUser.password = document.getElementById('password-login').value
}