document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('blog-list');
    const searchTitle = document.getElementById('search-title');
    const searchDate = document.getElementById('search-date');

    let posts = [];

    function renderPosts(filteredPosts) {
        blogList.innerHTML = '';
        filteredPosts.forEach(post => {
            const blogItem = document.createElement('div');
            blogItem.classList.add('blog-post');
            blogItem.innerHTML = `
                <h3>${post.title}</h3>
                <p class="post-date">${new Date(post.date).toLocaleString()}</p>
                <p>${post.content}</p>
            `;
            blogList.appendChild(blogItem);
        });
    }

    function renderDateOptions(dates) {
        searchDate.innerHTML = '<option value="">Select Date</option>';
        dates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            searchDate.appendChild(option);
        });
    }

    function filterPosts() {
        let filteredPosts = posts;
        const title = searchTitle.value.toLowerCase();
        const date = searchDate.value;

        if (title) {
            filteredPosts = filteredPosts.filter(post => post.title.toLowerCase().includes(title));
        }
        if (date) {
            filteredPosts = filteredPosts.filter(post => new Date(post.date).toDateString() === new Date(date).toDateString());
        }

        renderPosts(filteredPosts);
    }

    searchTitle.addEventListener('input', filterPosts);
    searchDate.addEventListener('change', filterPosts);

    fetch('blogs/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            const dates = [...new Set(posts.map(post => new Date(post.date).toDateString()))];
            renderDateOptions(dates);
            renderPosts(posts);
        })
        .catch(error => console.error('Error loading blog posts:', error));
});
