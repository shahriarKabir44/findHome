async function getNotifications(userId) {
    let notifications = await __fetch('notification/getnotifications', { id: userId, pagenumber: 0, type: 1 })

    notifications.sort((a, b) => { return b.time - a.time })
    return notifications

}


function NotificationsModal() {
    return `<link rel="stylesheet" href="http://localhost:4000/components/shared/modal.css" />
	<div id="modal_notifications" class="modal_">
		<div class="modal-content_">
			<span class="close_" onclick="toggleNotificationModal()" >&times;</span>
            <h2>Notifications</h2>
			<div id="notificationsContainer">
				
			</div>
		</div>
	</div>`
}


async function toggleNotificationModal(userId = null) {
    let style = document.getElementById('modal_notifications').style.display
    if (style == '' || style == 'none') {
        let notifications = await getNotifications(userId)

        document.getElementById('notificationsContainer').innerHTML = notifications.map(notification => NotificationItem(notification)).join('')
        document.getElementById('modal_notifications').style.display = 'block'
        return
    }
    document.getElementById('modal_notifications').style.display = 'none'
}


function NotificationItem(notification) {
    return ` <div onclick="viewNotification('${notification.propertyId}')" style="border: 1px solid;
                                        padding: 11px;
                                        cursor: pointer;
                                        margin: 5px;
                                        border-radius: 5px;" ng-repeat="notification in notifications">
                <p style="margin: 0;"> ${notification.body} </p>
                <p style="margin: 0; font-size:10px"> ${(new Date(notification.time)).toLocaleString()}</p>
            </div>`
}


function viewNotification(propertyId) {
    location.href = 'http://localhost:4000/propertyDetails?id=' + propertyId
}