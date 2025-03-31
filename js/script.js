document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('blog-list');
    const searchTitle = document.getElementById('search-title');
    const searchContent = document.getElementById('search-content');
    const searchDate = document.getElementById('search-date');

    let posts = [];

    function renderPosts(filteredPosts) {
        blogList.innerHTML = '';
        filteredPosts.forEach(post => {
            const blogItem = document.createElement('div');
            blogItem.classList.add('blog-post');
            blogItem.innerHTML = `
                <h3>${post.title}</h3>
                <p class="post-date">${formatDate(post.date)}</p>
                <p>${post.content}</p>
            `;
            blogList.appendChild(blogItem);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toLocaleString('en-US', { month: 'short' });
        const day = date.getDate().toLocaleString('en-US', { style: 'ordinal' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart('0', '0');
        const minutes = date.getMinutes().toString().padStart('0', '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${month} ${day}th, ${year} at ${hours}:${minutes} ${ampm}`;
    }

    function filterPosts() {
        let filteredPosts = posts;
        const title = searchTitle.value.toLowerCase();
        const content = searchContent.value.toLowerCase();
        const dateValue = searchDate.value;

        if (title) {
            filteredPosts = filteredPosts.filter(post => post.title.toLowerCase().includes(title));
        }
        if (content) {
            filteredPosts = filteredPosts.filter(post => post.content.toLowerCase().includes(content));
        }
        if (dateValue) {
            filteredPosts = filteredPosts.filter(post => formatDate(post.date).includes(dateValue));
        }

        renderPosts(filteredPosts);
    }

    searchTitle.addEventListener('input', filterPosts);
    searchContent.addEventListener('input', filterPosts);
    searchDate.addEventListener('change', filterPosts);

    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data.posts.sort(((a, b) => new Date(b.date) - new Date(a.date)));
            renderPosts(posts);
        })
        .catch(error => console.error('Error loading blog posts:', error));
});
