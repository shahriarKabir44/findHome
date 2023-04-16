async function Navbar(user) {


    return `
    <style>
        img.userPhoto {
            max-width: 70px;
            max-height: 70px;
        }
    </style>
    ${NotificationsModal()}

    ${await LoginModal()}
    ${await RegistrationModal()}
    <div class="container-fluid nav-bar bg-transparent">
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                <a href="http://localhost:4000/home" class="navbar-brand d-flex align-items-center text-center">
                    <div class="icon p-2 me-2">
                        <img class="img-fluid" src="http://localhost:4000/img/icon-deal.png" alt="Icon" style="width: 30px; height: 30px;">
                    </div>
                    <h1 class="m-0 text-primary">FindHomeRealty</h1>
                </a>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto">
                        <div class="notificationbar">
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</a>
                                <div class="dropdown-menu rounded-0 m-0">
                                    <a href="property-list.html" class="dropdown-item">Property List</a>
                                    <a href="property-type.html" class="dropdown-item">Property Types</a>
                                    <a href="property-phase.html" class="dropdown-item">Property Phase</a>
                                    <a href="property-agent.html" class="dropdown-item">Property Agent</a>

                                </div>
                            </div>
                        </div>
                        

                        <div class="notificationbar">
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Services</a>
                                <div class="dropdown-menu rounded-0 m-0">
                                    <a href="http://localhost:4000/construction" class="dropdown-item">Construction</a>
                                    <a href="http://localhost:4000/interior" class="dropdown-item">Interior Solution</a>
                                </div>
                            </div>                        
                        </div>
                        
                       
 

                     ${user ? `<div class="notificationbar">
                            <div class="nav-item dropdown">
                                <div onclick="toggleNotificationModal('${user.id}')"   class="nav-link dropdown-toggle"  ><span
                                        class="label label-pill label-danger count" style="border-radius:10px;"></span>
                                    <span class="fas fa-bell" style="font-size:18px;"></span></div>
                                 
                            </div>
                        </div>`: ''}
                        <div class="notificationbar">
                            ${user ? `
                            
                            <div class="notificationbar">
                            <div class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <img class="userPhoto" src="http://localhost:4000/${user.profileImageURL}" />
                                </a>
                                <div class="dropdown-menu rounded-0 m-0">
                                    <a  href="http://localhost:4000/userProfile/?id=${user.id}"  class="dropdown-item">${user.name}</a>
                                    <a href="#" onclick="logout()" class="dropdown-item">Log out</a>


                                </div>
                            </div>
                        </div>
                            
                            </a>` : `
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Sign in</span></a>
                                 <div class="dropdown-menu rounded-0 m-0">
                                <a href="#" onclick="toggleLoginModal()" class="dropdown-item">Login</a>
                                <a href="#" class="dropdown-item"  onclick="toggleRegisterModal()">Sign up</a>
                            </div>
                            </div>`}


                        </div>

                    </div>

                </div>
            </nav>
        </div>`
}

function logout() {
    localStorage.clear()
    location.reload()
}