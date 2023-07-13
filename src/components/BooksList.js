import React, { useEffect, useState } from 'react';

import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const BooksList = () => {
  const [books, setBooks] = useState([]);
 
  const [hasMore, setHasMore] = useState(true);

//   const fetchBooks = () => {
//     axios.get(`https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=AIzaSyAeldNoTUwjHYAXBpMwAEO-fPHd26K7MxA&startIndex=${page*10}&maxResults=10`)
//       .then(res => {
//         if(res.data.items.length > 0){
//           setBooks(books => [...books, ...res.data.items]);
//           setPage(page => page + 1);
//         } else {
//           setHasMore(false);
//         }
//       })
//       .catch(err => console.log(err));
//   }
const fetchBooks = () => {
    if (books.length >= 20) {
      setHasMore(false);
      return;
    }
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=AIzaSyAeldNoTUwjHYAXBpMwAEO-fPHd26K7MxA&startIndex=${books.length}&maxResults=10`
      )
      .then((res) => {
        if (res.data.items.length > 0) {
          setBooks((books) => [...books, ...res.data.items]);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => console.log(err));
  };
  

  useEffect(() => {
    fetchBooks();
  }, );
  

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchBooks}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {books.map((book) => {
        const { id, volumeInfo } = book;
        const { title, authors, imageLinks } = volumeInfo;
        return (
            <div  key={id} style={{ margin: '20px', textAlign: 'center' }}>
            <img src={imageLinks?.thumbnail} alt={title} />
            <h2>{title}</h2>
            <p>{authors?.join(', ')}</p>
            </div>
        );
        })}

    </InfiniteScroll>
  );
}

export default BooksList;
