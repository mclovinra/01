export const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();

    if (searchInput) {
        localStorage.setItem('searchText', searchInput);
        window.location.href = './search.html';

        const searchRel = doc.getElementById("searchRelacion");
        searchRel.textContent = `${searchInput}`;

    } else {
        console.log("");
    }
};