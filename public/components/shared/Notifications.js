async function getNotifications(userId) {
    return __fetch('notification/getnotifications', { id: userId, pagenumber: 0, type: 1 })
}


function NotificationsModal(userId) {
    return
}