import { Box, Image, Text, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function CustomerLandingPage({ customerId }) {
  const [books, setBooks] = useState([]);

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
    <>
      <div className="flex flex-col">
        <div className="mt-11 mx-11 h-10 bg-gray-100">
          <Navbar />
        </div>

        <div className='mt-8 mx-11'>
          {books.length > 0 ? (
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
              {books.map((book) => (
                <Box key={book.id} borderWidth='1px' borderRadius='lg' overflow='hidden' mb='4'>
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
                        {book.book_genre + ' | ' + book.book_author}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>No books available</Text>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerLandingPage;