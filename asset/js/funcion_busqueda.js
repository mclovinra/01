export const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();

    if (searchInput) {
        localStorage.setItem('searchText', searchInput);
        window.location.href = './comics.html';
    } else {
        console.log("Please enter a search term.");
    }
};