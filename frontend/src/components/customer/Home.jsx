import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react'; // Assuming you are using Chakra UI
import axios from 'axios';
import React, { useEffect, useState } from "react";

import useHover from './utils/useHover';
function BookItem({ book }) {
  const [hoverRef, isHovered] = useHover(); return (
    <Box
      key={book.id}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      mb='4'
      ref={hoverRef}
      bg={isHovered ? 'gray.100' : 'white'}
      transition='background-color 0.3s'
    >
      <Image src={book.imageUrl} alt='Book_Image' />
      <Box p='6'>
        <Box d='flex' alignItems='baseline'>
          <Text fontWeight='bold' as='h4' lineHeight='tight' isTruncated>
            {book.book_title}
          </Text>
        </Box>
        <Box>
          {'Rs ' + book.book_price + '/-'}
        </Box>
        <Box>
          <Text as='h4' lineHeight='tight' isTruncated>
            {book.book_genre + ' | ' + book.book_author + ' | ' + book.book_publication}
          </Text>
        </Box>
        <Box>
          <Text as='h3' lineHeight='tight' isTruncated>
            {'In stock -> '+ book.book_availability}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function Home() {
  const [books, setBooks] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const allBookFetch = () => {
    axios.post('http://localhost:7777/getAllBooks', {})
      .then((response) => {
        console.log('Books fetched successfully');
        setBooks(response.data);
        console.log('Books:', response.data);
      })
      .catch((error) => {
        console.log('Error fetching books', error);
      });
  };

  useEffect(() => {
    allBookFetch();
  }, []);

  return (
    <div className='mt-8 mx-11'>
      {books.length > 0 ? (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>No books available</Text>
      )}
    </div>
  );
}

export default Home;