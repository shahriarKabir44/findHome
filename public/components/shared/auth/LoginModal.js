async function LoginModal() {

	return `
	<link rel="stylesheet" href="http://localhost:4000/components/shared/modal.css" />
	<div id="modal_" class="modal_">
		<div class="modal-content_">
			<span class="close_" onclick="toggleLoginModal()" >&times;</span>
			<div   id="login-form_">
				<h2>Login</h2>
				<div id="error-message_" class="error"></div>
				<div id="success-message_" class="success"></div>
				<label>Email</label>
				<input type="email" onchange="setEmail( )" id="email-login" name="email" class="form-control_" required>
				<label>Password</label>
				<input type="password" onchange="setPassword( )" id="password-login" name="password" class="form-control_" required>
				<button  onclick="submitLoginInfo()" class="btn_">Login</button>
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
	let style = document.getElementById('modal_').style.display
	if (style == '') {
		document.getElementById('modal_').style.display = 'block'
		return
	}
	document.getElementById('modal_').style.display = style == 'block' ? 'none' : 'block'
}

