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
        const month = (date.getMonth() + 1).toString().padStart('0', '0');
        const day = date.getDate().toString().padStart('0', '0');
        const year = date.getFullYear();
        return `${month}.${day}${day}th, ${year} at ${date.toTimeString().split(' ')[0]}`;
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
            filteredPosts = filteredPosts.filter(post => post.date.split('-')[0] === dateValue);
        }

        renderPosts(filteredPosts);
    }

    searchTitle.addEventListener('input', filterPosts);
    searchContent.addEventListener('input', filterPosts);
    searchDate.addEventListener('change', filterPosts);

    fetch('blogs/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data.posts.sort(((a, b) => new Date(b.date) - new Date(a.date)));
            renderPosts(posts);
        })
        .catch(error => console.error('Error loading blog posts:', error));
});
