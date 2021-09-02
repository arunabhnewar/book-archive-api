const error = document.getElementById('error');
const searchDetails = document.getElementById('search-details');

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchInText = searchField.value;
    // spinner
    searchDetails.innerHTML = `
    <div class="text-center">
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
    //an invalid input search error
    if (searchInText === '') {
        error.innerHTML = `
        <div class="d-flex justify-content-center">
            <p class="error-text"> You've entered an invalid name ⚠️</p>
        </div>`

        searchDetails.innerHTML = '';
        searchDetails.appendChild(error);
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchInText}`
        // clear search field
        searchField.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs))
    }
}

const displayBook = books => {
    const booksArray = books.filter(element => element.cover_i !== undefined && element.title !== undefined && element.author_name !== undefined && element.publisher !== undefined && element.first_publish_year !== undefined)

    // error handle 
    if (booksArray.length === 0) {
        searchDetails.innerHTML = `Sorry, No Result Found ⚠️`
    }
    else {
        const para = document.createElement('paragraph');
        para.style.color = 'bisque';
        para.style.textAlign = 'center';
        para.style.width = '100%';
        para.style.fontSize = '24px';
        para.innerHTML = `📖 Showing ${booksArray.length} Books`

        searchDetails.innerHTML = '';
        searchDetails.appendChild(para);
        booksArray.forEach(book => {

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card book-item" style="width: 18rem;">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid h-50">
            <div class="card-body">
            <h5 class="card-title title">${book.title.slice(0, 20)}</h5>
            <p class="card-text text">Author: ${book.author_name[0]}</p>
            <p class="card-text text">Publisher: ${book.publisher[0]}</p>
            <p class="card-text text">First Published: ${book.first_publish_year}</p>
            </div>
            </div>
            `;
            console.log(book.title);
            searchDetails.appendChild(div);
        })
    }
}
