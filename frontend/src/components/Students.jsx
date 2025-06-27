import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  useEffect(() => {
    axios.get('https://numerical-e8za.onrender.com/api/member')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((num, index) => (
      <button
        key={index}
        onClick={() => typeof num === 'number' && handlePageChange(num)}
        className={`px-3 py-1 rounded text-sm transition 
          ${num === currentPage ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-purple-100'}
          ${num === '...' && 'cursor-default'}
          focus:outline-none focus:ring-2 focus:ring-purple-400`}
        disabled={num === '...'}
      >
        {num}
      </button>
    ));
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-white">

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page to 1 when searching
            }}
            className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm md:text-base"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentStudents.map((student) => (
          <div
            key={student._id}
            tabIndex={0}
            className="bg-white w-full max-w-sm mx-auto rounded-tl-[3rem] rounded-br-[3rem] p-8 shadow-xl text-center flex flex-col 
              transition duration-300 transform hover:scale-105 hover:shadow-2xl 
              focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            <div className="flex justify-center mb-3">
              <img
                src={`https://numerical-e8za.onrender.com/${student.photo.replace(/\\/g, '/')}`}
                alt={student.name}
                className="w-40 h-40 rounded-full border-8 border-purple-100 object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-black mb-2 capitalize break-words">
              {student.name}
            </h2>

            <p className="text-base text-gray-500 mb-6 overflow-hidden text-ellipsis h-20 leading-5 break-words">
              {student.bio}
            </p>

            <Link
              to={student._id}
              className="bg-purple-100 text-black text-base px-6 py-3 rounded-full font-semibold mt-auto 
                hover:bg-purple-200 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Profile
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center mt-10 gap-2 text-sm">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-purple-100 transition 
            focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Previous
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-purple-100 transition 
            focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Students;
