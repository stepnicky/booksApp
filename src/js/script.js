/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars


'use strict';

class BooksList {
    constructor(){
        const thisBookList = this;

        thisBookList.filters = [];
        thisBookList.favouriteBooks = [];
        thisBookList.initData();
        thisBookList.getElements();
        thisBookList.renderBookList();
        thisBookList.initActions();
    }
    initData(){
        const thisBookList = this;

        thisBookList.data = dataSource.books;
    }
    getElements(){
        const thisBookList = this;

        thisBookList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
        
        thisBookList.class = {};
        thisBookList.class.bookImage = 'book__image';
        thisBookList.class.favorite = 'favourite';
        thisBookList.class.hidden = 'hidden';

        thisBookList.dom = {};
        thisBookList.dom.filterWrapper = document.querySelector('.filters');
        thisBookList.dom.bookList = document.querySelector('.books-list');
    }
    renderBookList(){
        const thisBookList = this;

        for(let book of thisBookList.data){
    
            book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
    
            book.ratingWidth = book.rating * 10;
    
            const generatedHTML = thisBookList.template(book);
            
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            
            thisBookList.dom.bookList.appendChild(generatedDOM);
        }
    }
    determineRatingBgc(rating) {
        let backgroundColor = '';
        if(rating < 6) {
            backgroundColor = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            return backgroundColor;
        } else if(rating > 6 && rating <= 8){
            backgroundColor = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
            return backgroundColor;
        } else if(rating > 8 && rating <= 9){
            backgroundColor = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            return backgroundColor;
        } else if(rating > 9){
            backgroundColor = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
            return backgroundColor;
        }
    }
    initActions(){
        const thisBookList = this;

        thisBookList.dom.bookList.addEventListener('click', function(event) {
                
            if (event.detail === 1){

                event.preventDefault();

            } else if(event.detail === 2){
    
                event.preventDefault();
                console.log(event);
    
                const clickedElement = event.target.offsetParent;
    
                if(clickedElement.classList.contains(thisBookList.class.bookImage)){
    
                    const bookId = clickedElement.getAttribute('data-id');
    
                    if(clickedElement.classList.contains(thisBookList.class.favorite)){
                        const indexOfBookImage = thisBookList.favouriteBooks.indexOf(bookId);
                        thisBookList.favouriteBooks.splice(indexOfBookImage, 1);
    
                        clickedElement.classList.remove(thisBookList.class.favorite);
                    } else{
                        thisBookList.favouriteBooks.push(bookId);
    
                        clickedElement.classList.add(thisBookList.class.favorite);
                    }
                }
                console.log(thisBookList.favouriteBooks);
                console.log(clickedElement);
            }
        });
    
        thisBookList.dom.filterWrapper.addEventListener('click', function(event) {
    
            const clickedElement = event.target;
            console.log(event);
            
            if (clickedElement.name == 'filter' && clickedElement.type == 'checkbox' && clickedElement.nodeName == 'INPUT') {
                
                console.log(clickedElement.value);

                if (clickedElement.checked) {

                    thisBookList.filters.push(clickedElement.value);

                } else{

                    thisBookList.filters.splice(thisBookList.filters.indexOf(clickedElement.value), 1);
                
                }
                
            }

            console.log(thisBookList.filters);

            thisBookList.filterBooks();
        });
    }
    filterBooks(){
        const thisBookList = this;

        for(let book of thisBookList.data){

            const hiddenBooks = document.querySelector('.book__image[data-id=' + '"' + book.id + '"' + ']');
            let shouldBeHidden = false;
    
            for(let filter of thisBookList.filters){

                if(book.details[filter] == false){

                    console.log(book);
                    shouldBeHidden = true;
    
                    break;
                }
            }

            if(shouldBeHidden == true){
                
                hiddenBooks.classList.add(thisBookList.class.hidden);

            }else{
            
                hiddenBooks.classList.remove(thisBookList.class.hidden);
            
            }
        }
    }
}

const app = new BooksList();