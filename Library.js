/*Use object-oriented JavaScript to model a public library (w/ three classes: Library, Shelf, & Book). *
 The library should be aware of a number of shelves. Each shelf should know what books it contains.
 Make the book object have "enshelf" and "unshelf" methods that control what shelf the book is sitting on.
 The library should have a method to report all books it contains.
 */

function createBook(name) {
    var aBook = {};
    aBook.name = name;
    aBook.shelf = null;
    aBook.sayName = function () {
        console.log(this.name);
    };
    aBook.enshelf = function (shelf) {
        if (this.shelf === null) {
            this.shelf = shelf;
            shelf.books.push(this);
        } else {
            this.unshelf();
            this.enshelf(shelf);
        }
    };
    aBook.unshelf = function () {
        if (this.shelf === null) {
            console.error("The book", name, "is already unshelved.")
        } else {
            var index = this.shelf.books.indexOf(this);
            this.shelf.books.splice(index, index + 1);
            this.shelf = null;
        }
    };
    return aBook;
}

function createShelf(number) {
    var aShelf = {};
    aShelf.number = number;
    aShelf.books = [];
    aShelf.addBook = function (book) {
        book.enshelf(this);
    };
    aShelf.removeBook = function (book) {
        book.unshelf();
    };

    aShelf.reportBooks = reportBooks;
    function reportBooks() {
        if (this.books.length > 0) {
            for (var i = 0; i < this.books.length; i++) {
                console.log(this.books[i].name);
            }
        } else {
            console.log("NOTHING");
        }
    }

    return aShelf;
}

var library = {
    shelves: [],
    addShelf: function (shelf) {
        library.shelves.push(shelf);
    },
    reportBooks: function () {
        for (var i = 0; i < library.shelves.length; i++) {
            console.log("Shelf", library.shelves[i].number, "has:");
            library.shelves[i].reportBooks();
        }
    },
    numShelves: function () {
        return library.shelves.length;
    }
};

var tests = function(){
    var shelf1 = createShelf(1);
    var shelf2 = createShelf(2);
    var book1 = createBook("a");
    var book2 = createBook("b");
    var book3 = createBook("c");

    library.addShelf(shelf1);
    library.addShelf(shelf2);
    book1.enshelf(shelf1);
    book1.unshelf();
    book1.enshelf(shelf2); //a  should be on shelf 2

    book2.enshelf(shelf1);
    shelf1.removeBook(book2); //b should be off all shelves

    shelf1.addBook(book3);
    shelf1.removeBook(book3);
    shelf1.removeBook(book3); //expect error, c should be off shelves
    library.reportBooks();
};

tests();