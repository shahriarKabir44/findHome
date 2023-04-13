async function RegistrationModal() {

    return `
	<link rel="stylesheet" href="http://localhost:4000/js/components/shared/auth/auth.css" />
	<div id="modal_auth_register" class="modal_auth">
		<div class="modal-content_auth">
			<span class="close_auth" onclick="toggleRegisterModal()" >&times;</span>
			<form   id="register_form_auth_reg">
				<h2>Sign up</h2>
				<div id="error-message_auth_reg" class="error"></div>
				<div id="success-message_auth_reg" class="success"></div>
				<label>Name</label>
				<input type="text" id="name" name="name" class="form-control_auth" required>
				<label>Email</label>
				<input type="email" id="email" name="email" class="form-control_auth" required>
                <label>Phone</label>
				<input type="tel" id="phone" name="phone" class="form-control_auth" required>
				<label>Password</label>
				<input type="password" id="password" name="password" class="form-control_auth" required>
                
                <label>Profile picture</label>
                <input name="profileImage"  type="file"  class="form-control_auth"  id="image1_reg">

                <label>Preview</label>
                <img style="max-width: calc(100% - 20px);
                            margin: 10px;"
                            src="" alt="" id="reg_prev" />
 				<button type="submit" class="btn_auth">register</button>
			</form>
		</div>
	</div>`
}


function toggleRegisterModal() {
    let el = document.getElementById('modal_auth_register')
    let style = el.style.display
    if (style == '') {
        el.style.display = 'block'
        return
    }
    el.style.display = style == 'block' ? 'none' : 'block'
}

let newUserRegister = {}

setTimeout(() => {

    document.getElementById('image1_reg').onchange = event => {
        var files = event.target.files;
        var reader = new FileReader();
        reader.onload = function (e) {
            newUserRegister.profileImageURL = e.target.result;
            document.getElementById("reg_prev").src = e.target.result
        };
        reader.readAsDataURL(files[0]);
    }
    document.getElementById('register_form_auth_reg').onsubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(document.getElementById('register_form_auth_reg'));
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        data.profileImage = null
        let { newId } = await __fetch('user/register', data)
        if (!newId) {
            alert(`Email or Phone Number is already taken`)
            return
        }
        let { fileURL } = await uploadImage(newUserRegister.profileImageURL, 'user/uploadProfilePicture', {
            filetype: "profilePicture",
            userid: newId
        })
        let { user, token } = await __fetch('user/update', {
            id: newId,
            profileImageURL: fileURL
        })
        localStorage.setItem('token', token)
        location.reload()
    }

}, 500)

