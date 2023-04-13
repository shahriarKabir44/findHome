async function LoginModal() {

	return `
	<link rel="stylesheet" href="http://localhost:4000/js/components/shared/auth/auth.css" />
	<div id="modal_auth" class="modal_auth">
		<div class="modal-content_auth">
			<span class="close_auth" onclick="toggleLoginModal()" >&times;</span>
			<div   id="login-form_auth">
				<h2>Login</h2>
				<div id="error-message_auth" class="error"></div>
				<div id="success-message_auth" class="success"></div>
				<label>Email</label>
				<input type="email" onchange="setEmail( )" id="email-login" name="email" class="form-control_auth" required>
				<label>Password</label>
				<input type="password" onchange="setPassword( )" id="password-login" name="password" class="form-control_auth" required>
				<button  onclick="submitLoginInfo()" class="btn_auth">Login</button>
			</div>
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
function submitLoginInfo() {

	console.log(newUser)
	__fetch('user/authenticate', newUser)
		.then(({ user, token }) => {
			if (user) {
				localStorage.setItem('token', token)
				location.reload()
			}
			else {
				alert('Invalid credentials')
			}
		})
}


function toggleLoginModal() {
	let style = document.getElementById('modal_auth').style.display
	if (style == '') {
		document.getElementById('modal_auth').style.display = 'block'
		return
	}
	document.getElementById('modal_auth').style.display = style == 'block' ? 'none' : 'block'
}

