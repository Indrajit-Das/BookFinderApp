import { useState } from "react";
import { books } from "../../assets/books.js";
import BooksAction from "./BooksAction";
import BooksList from "./BooksList";

export default function BookShelve() {
  const [bookList, setBookList] = useState([...books]);

  function handleFav(bookId) {
    const bookIndex = bookList.findIndex((book) => book.id === bookId);
    const newBook = [...bookList];
    newBook[bookIndex].isFavorite = !newBook[bookIndex].isFavorite;
    setBookList(newBook);
  }

  function handleSearch(searchTerm) {
    const filtered = books.filter((book) =>
      book.book_name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
    setBookList([...filtered]);
  }

  function handleSort(sortTerm) {
    let sortedArray = [...bookList];

    switch (sortTerm) {
      case "name_asc":
        sortedArray.sort((a, b) => a.book_name.localeCompare(b.book_name));
        break;
      case "name_desc":
        sortedArray.sort((a, b) => b.book_name.localeCompare(a.book_name));
        break;
      case "year_asc":
        sortedArray.sort((a, b) => a.publish_date - b.publish_date);
        break;
      case "year_desc":
        sortedArray.sort((a, b) => b.publish_date - a.publish_date);
        break;
      default:
        sortedArray = [...bookList];
    }
    setBookList([...sortedArray]);
  }

  return (
    <main className="my-10 lg:my-14">
      <BooksAction onSearch={handleSearch} onSort={handleSort} />
      <BooksList books={bookList} onFav={handleFav} />
    </main>
  );
}
