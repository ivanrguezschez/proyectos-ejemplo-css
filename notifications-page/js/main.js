// Notifications Collection
/*
    avatar: string
    name: string
    content: string
    date: string
    unread: boolean
    type: string (standard | link | message | picture)
    meta?: object
        linkType?: string (post | group)
        linkText?: string
        message?: string
        picture?: string
*/

const notificationCollection = [
    {
        avatar: 'assets/images/avatar-mark-webber.webp',
        name: 'Mark Webber',
        content: 'reacted to your recent post',
        date: '1m ago',
        unread: true,
        type: 'link',
        meta: {
            linkType: 'post',
            linkText: 'My first tournament today!'
        }
    },
    {
        avatar: 'assets/images/avatar-angela-gray.webp',
        name: 'Angela Gray',
        content: 'followed you',
        date: '5m ago',
        unread: true,
        type: 'standard'
    },
    {
        avatar: 'assets/images/avatar-jacob-thompson.webp',
        name: 'Jacob Thompson',
        content: 'your group',
        date: '1 day ago',
        unread: true,
        type: 'link',
        meta: {
            linkType: 'group',
            linkText: 'Chess Club'
        }
    },
    {
        avatar: 'assets/images/avatar-rizky-hasanuddin.webp',
        name: 'Rizky Hasanuddin',
        content: 'sent you a private message',
        date: '5 days ago',
        unread: false,
        type: 'message',
        meta: {
            message: 'Hello, thanks for setting up the Chess Club. I\'ve been a member for a few weeks now and I\'m already having lots of fun and improving my game.'
        }
    },
    {
        avatar: 'assets/images/avatar-kimberly-smith.webp',
        name: 'Kimberly Smith',
        content: 'commented on your picture',
        date: '1 week ago',
        unread: false,
        type: 'picture',
        meta: {
            picture: 'assets/images/image-chess.webp'
        }
    },
    {
        avatar: 'assets/images/avatar-nathan-peterson.webp',
        name: 'Nathan Peterson',
        content: 'reacted to your recent post',
        date: '2 weeks ago',
        unread: false,
        type: 'link',
        meta: {
            linkType: 'post',
            linkText: '5 end-game strategies to increase your win rate'
        }
    },
    {
        avatar: 'assets/images/avatar-anna-kim.webp',
        name: 'Anna Kim',
        content: 'left the group',
        date: '2 weeks ago',
        unread: false,
        type: 'link',
        meta: {
            linkType: 'group',
            linkText: 'Chess Club'
        }
    }
];

// Compose notification DOM element
function composeNotification(notification) {
    // Notification wrapper
    const notificationElement = document.createElement('article');
    notificationElement.classList.add('notification');
    if (notification.unread) {
        notificationElement.classList.add('notification--unread');
    }

    // Avatar
    const avatarElement = document.createElement('img');
    avatarElement.classList.add('avatar');
    avatarElement.alt = notification.name;
    avatarElement.src = notification.avatar;

    // Title
    const titleElement = document.createElement('h2');
    titleElement.classList.add('notification__title');
    let titleContent = `<strong>${notification.name}</strong> ${notification.content} `;
    if (notification.type === 'link') {
        titleContent += `<a href="#" class="link link--${notification.meta.linkType}">${notification.meta.linkText}</a>`;
    }
    if (notification.unread) {
        titleContent += `<span class="unread_bubble"></span>`;
    }
    titleElement.innerHTML = titleContent;

    // Date
    const dateElement = document.createElement('p');
    dateElement.classList.add('date');
    dateElement.textContent = notification.date;
    
    notificationElement.appendChild(avatarElement);
    notificationElement.appendChild(titleElement);
    notificationElement.appendChild(dateElement);

    if (notification.type === 'message') {
        notificationElement.classList.add('notification--message');
        // Message
        const messageElement = document.createElement('p');
        messageElement.classList.add('notification__message');
        messageElement.textContent = notification.meta.message;
        notificationElement.appendChild(messageElement);
    }

    if (notification.type === 'picture') {
        notificationElement.classList.add('notification--picture');
        // Picture
        const pictureElement = document.createElement('img');
        pictureElement.classList.add('notification__picture');
        pictureElement.src = notification.meta.picture;
        pictureElement.alt = 'Image Attached';
        notificationElement.appendChild(pictureElement);
    }

    return notificationElement;
}

// Show all notifications
function showAllNotifications(notifications) {
    notifications.forEach(notification => {
        const notificationElement = composeNotification(notification);
        mainElement.appendChild(notificationElement);
    });
}

// Remove all notifications
function removeAllNotifications() {
    const allNotificationElements = document.querySelectorAll('.notification');
    allNotificationElements.forEach(notification => notification.remove());
}

const mainElement = document.querySelector('.notifications');
showAllNotifications(notificationCollection);

// Get DOM elements
const markAllAsReadElement = document.querySelector('.header__link');
const unreadCountElement = document.querySelector('.unread-count');

// Listen for click events
markAllAsReadElement.addEventListener('click', () => {
    markAllAsRead();
    resetUnreadCount();
    removeUnreadBubble();

    removeAllNotifications();
    showAllNotifications(notificationCollection);
});

// Mark all notifications as read
function markAllAsRead() {
    // Get all unread notifications
    /*
    const unreadNotifications = document.querySelectorAll('.notification--unread');
    unreadNotifications.forEach(notification => notification.classList.remove('notification--unread'));
    */
    notificationCollection.forEach(notification => notification.unread = false);

}

function resetUnreadCount() {
    unreadCountElement.textContent = '0';
}

function removeUnreadBubble() {
    const unreadBubbleElements = document.querySelectorAll('.unread_bubble');
    unreadBubbleElements.forEach(unreadBubble => unreadBubble.remove());
}
