// Fetch and display list of users
function fetchAndDisplayUsersList() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('personalDetails');
            usersList.innerHTML = '<h2>Users List</h2>';
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <div class="userItem" data-user-id="${user.id}">
                        <img class="avatar" src="https://picsum.photos/100?id=${user.id}" alt="Avatar">
                        <p><a href="#" class="userLink">${user.name}</a></p>
                    </div>
                `;
                usersList.appendChild(userDiv);
            });

            // Add event listeners to user links
            document.querySelectorAll('.userLink').forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const userId = this.parentElement.parentElement.getAttribute('data-user-id');
                    fetchAndDisplayUserDetails(userId);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching users list:', error);
        });
}

// Fetch and display user details, posts, and comments
function fetchAndDisplayUserDetails(userId) {
    // Fetch and display personal details
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const personalDetails = document.getElementById('personalDetails');
            personalDetails.innerHTML = `<h2>Personal Details</h2>
                <div class="userDetails">
                    <img class="avatar" src="https://picsum.photos/100?id=${user.id}" alt="Avatar">
                    <div>
                        <p>Name: ${user.name}</p>
                        <p>Email: ${user.email}</p>
                    </div>
                </div>
                <p><a href="#" id="backLink">Back</a></p>`;
            
            // Add event listener to back link
            document.getElementById('backLink').addEventListener('click', function(event) {
                event.preventDefault();
                fetchAndDisplayUsersList();
            });
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });

    // Fetch and display user posts
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            const userPosts = document.getElementById('userPosts');
            userPosts.innerHTML = '<h2>Posts</h2>';
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('postItem');
                postDiv.setAttribute('data-post-id', post.id);
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                userPosts.appendChild(postDiv);
            });

            // Add event listeners to post divisions
            document.querySelectorAll('.postItem').forEach(postItem => {
                postItem.addEventListener('click', function(event) {
                    const postId = this.getAttribute('data-post-id');
                    fetchAndDisplayComments(postId);
                    showClickedPost(postId);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching user posts:', error);
        });
}

// Fetch and display comments for a specific post
function fetchAndDisplayComments(postId) {
    // Clear existing comments
    document.getElementById('postComments').innerHTML = '';

    // Fetch and display comments
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            const postComments = document.getElementById('postComments');
            postComments.innerHTML = '<h2>Comments</h2>';
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('commentItem');
                commentDiv.innerHTML = `
                    <div class="commentBox">
                        <p><strong>Name:</strong> ${comment.name}</p>
                        <p><strong>Email:</strong> ${comment.email}</p>
                        <p><strong>Comment:</strong> ${comment.body}</p>
                    </div>
                `;
                postComments.appendChild(commentDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });

    // Add event listener to back link
    document.getElementById('backLink').addEventListener('click', function(event) {
        event.preventDefault();
        clearContents();
        fetchAndDisplayUsersList();
    });
}

// Show the clicked post message as a box
function showClickedPost(postId) {
    // Remove existing clicked post class
    document.querySelectorAll('.postItem').forEach(postItem => {
        postItem.classList.remove('clickedPost');
    });

    // Add clicked post class to the clicked post
    document.querySelector(`[data-post-id="${postId}"]`).classList.add('clickedPost');
}

// Clear contents in the posts and comments grid
function clearContents() {
    document.getElementById('userPosts').innerHTML = '';
    document.getElementById('postComments').innerHTML = '';
}

// Event listener for "Users" main menu item
document.getElementById('usersLink').addEventListener('click', function(event) {
    event.preventDefault();
    clearContents();
    fetchAndDisplayUsersList();
});
