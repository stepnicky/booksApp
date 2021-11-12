/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

'use strict';


const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

function renderBookList(){
    for(let book of dataSource.books){
        const generatedHTML = bookTemplate(book);
        // console.log(generatedHTML);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        // console.log(generatedDOM);
        const bookList = document.querySelector('.books-list');

        bookList.appendChild(generatedDOM);
    }
}

function initActions(){
    const favouriteBooks = [];
    const allBookImages = document.querySelectorAll('.book__image');
    console.log(allBookImages);
    for(let bookImage of allBookImages){
        bookImage.addEventListener('dblclick', function(event) {
            
            // prevent default
            
            event.preventDefault();

            // push clicked image's id to the favouriteBooks array

            const bookId = bookImage.getAttribute('data-id');
            console.log(bookId);
            favouriteBooks.push(bookId);
            console.log(favouriteBooks);

            // add .favourite class to the clicked image

            bookImage.classList.add('favourite');
            console.log(bookImage.classList.contains('favourite'));
            console.log(allBookImages);
        });
    }
}

function initProject() {
    renderBookList();
    initActions();
}
initProject();