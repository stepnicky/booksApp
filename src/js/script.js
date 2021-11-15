/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars


'use strict';

const filters = [];
const filterWrapper = document.querySelector('.filters');
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
    const bookList = document.querySelector('.books-list');
    
    bookList.addEventListener('click', function(event) {
            
        if (event.detail === 1){
            event.preventDefault();
        } else if(event.detail === 2){

            event.preventDefault();
            console.log(event);

            const clickedElement = event.target.offsetParent;

            if(clickedElement.classList.contains('book__image')){

                const bookId = clickedElement.getAttribute('data-id');

                if(clickedElement.classList.contains('favourite')){
                    const indexOfBookImage = favouriteBooks.indexOf(bookId);
                    favouriteBooks.splice(indexOfBookImage, 1);

                    clickedElement.classList.remove('favourite');
                } else{
                    favouriteBooks.push(bookId);

                    clickedElement.classList.add('favourite');
                }
            }
            console.log(favouriteBooks);
            console.log(clickedElement);
        }
    });

    filterWrapper.addEventListener('click', function(event) {

        const clickedElement = event.target;
        console.log(event);
        if (clickedElement.name == 'filter' && clickedElement.type == 'checkbox' && clickedElement.nodeName == 'INPUT') {
            console.log(clickedElement.value);
            if (clickedElement.checked) {
                filters.push(clickedElement.value);
            } else{
                filters.splice(filters.indexOf(clickedElement.value), 1);
            }
            
        }
        console.log(filters);
        filterBooks();
    });
}

function filterBooks(){

    for(let book of dataSource.books){

        let shouldBeHidden = false;

        for(let filter of filters){
            if(book.details[filter] == false){
                console.log(book);
                shouldBeHidden = true;

                break;
            }
        }
        if(shouldBeHidden == true){
            const hiddenBooks = document.querySelector('.book__image[data-id=' + '"' + book.id + '"' + ']');
            hiddenBooks.classList.add('hidden');
        }else{
            const hiddenBooks = document.querySelector('.book__image[data-id=' + '"' + book.id + '"' + ']');
            hiddenBooks.classList.remove('hidden');
        }
    }
}

function initProject() {
    renderBookList();
    initActions();
}
initProject();
