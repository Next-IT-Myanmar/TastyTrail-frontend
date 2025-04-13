import React, { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort, FaStar, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import Restaurant1 from '../assets/images/restaurants/restaurant1.jpg';
import RestaurantView from './RestaurantView';
import RestaurantCreate from './RestaurantCreate';
import RestaurantUpdate from './RestaurantUpdate';

const Restaurants = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const [socialLinksCount, setSocialLinksCount] = useState(1);


  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Golden Myanmar Restaurant',
      description: 'Traditional Myanmar cuisine in a modern setting',
      phoneNumber: '123-456-7890',
      categories: [{
        id: 1,
        name:'Thai'
      }],
      countries: [{
        id: 1,
        name:'Myanmar'
      }],
      image: Restaurant1,
      map: 'https://goo.gl/maps/xyz123',
      address: '123 Yangon Street, Myanmar',
      socialLinks: [
        {
          name: 'Facebook',
          url: 'https://facebook.com/goldenMyanmar',
          image: 'https://facebook.com/logo.png'
        },
        {
          name: 'Instagram',
          url: 'https://instagram.com/goldenMyanmar',
          image: 'https://instagram.com/logo.png'
        }
      ],
      rank: 4,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ]);

  // Add this state near other useState declarations
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Add this function before the return statement
  const StarRating = ({ value, onChange, readOnly }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-2xl cursor-pointer ${
              (hoverRating || value) >= star
                ? 'text-yellow-400'
                : 'text-gray-300'
            } ${readOnly ? 'cursor-default' : 'hover:text-yellow-400'}`}
            onClick={() => !readOnly && onChange(star)}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
          />
        ))}
        <span className="ml-2 text-gray-600">{value || hoverRating || 0}</span>
      </div>
    );
  };

  const handleModal = (mode, restaurant = null) => {
    setModalMode(mode);
    setSelectedRestaurant(restaurant);
    setSocialLinksCount(restaurant ? restaurant.socialLinks.length : 1);
    setRating(restaurant ? restaurant.rank : 0);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setRestaurantToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantToDelete));
    setIsDeleteModalOpen(false);
    setRestaurantToDelete(null);
  };

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Image',
        accessorKey: 'image',
        cell: ({ row }) => (
          <img 
            src={row.original.image} 
            alt={row.original.name} 
            className="h-16 w-24 object-cover rounded-lg"
          />
        ),
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: ({ row }) => (
          <div className="w-[200px] truncate" title={row.original.description}>
            {row.original.description}
          </div>
        ),
      },
      {
        header: 'Rank',
        accessorKey: 'rank',
        cell: ({ row }) => (
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            {row.original.rank}
          </div>
        ),
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
      },
      {
        header: 'Updated At',
        accessorKey: 'updatedAt',
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleModal('view', row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEye />
            </button>
            <button
              onClick={() => handleModal('edit', row.original)}
              className="text-yellow-500 hover:text-yellow-700"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: restaurants,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-6">
      {modalMode === 'view' && isModalOpen ? (
        <RestaurantView
          restaurant={selectedRestaurant} 
          onClose={() => {
            setIsModalOpen(false);
            setModalMode('');
          }}
        />
      ) : modalMode === 'create' && isModalOpen ? (
        <RestaurantCreate
          onClose={() => {
            setIsModalOpen(false);
            setModalMode('');
          }}
        />
      ) : modalMode === 'edit' && isModalOpen ? (
        <RestaurantUpdate
          restaurant={selectedRestaurant}
          onClose={() => {
            setIsModalOpen(false);
            setModalMode('');
          }}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Restaurants</h1>
            <div className="flex gap-4">
              <input
                type="text"
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search restaurants..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={() => handleModal('create')}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
              >
                <FaPlus /> Add Restaurant
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && <FaSort />}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="px-2 py-1 border rounded-lg"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-gray-600">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              
              {/* Numbered Pagination with Ellipsis */}
              {(() => {
                const currentPage = table.getState().pagination.pageIndex + 1;
                const totalPages = table.getPageCount();
                const pageNumbers = [];
                
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                  }
                } else {
                  pageNumbers.push(1);
                  
                  if (currentPage > 3) {
                    pageNumbers.push('...');
                  }
                  
                  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                    pageNumbers.push(i);
                  }
                  
                  if (currentPage < totalPages - 2) {
                    pageNumbers.push('...');
                  }
                  
                  pageNumbers.push(totalPages);
                }
                
                return pageNumbers.map((pageNumber, index) => (
                  pageNumber === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                  ) : (
                    <button
                      key={pageNumber}
                      onClick={() => table.setPageIndex(pageNumber - 1)}
                      className={`px-3 py-1 border rounded-lg ${
                        currentPage === pageNumber
                          ? 'bg-yellow-500 text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                ));
              })()}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div 
              className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setIsModalOpen(false)} // Close on outside click
            >
              <div 
                className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl relative"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking modal content
              >
                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-xl font-bold mb-4 pr-8">
                  {modalMode === 'create' ? 'Add New Restaurant' : 
                   modalMode === 'edit' ? 'Edit Restaurant' : 'Restaurant Details'}
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                        defaultValue={selectedRestaurant?.name}
                        readOnly={modalMode === 'view'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rank</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                        defaultValue={selectedRestaurant?.rank}
                        readOnly={modalMode === 'view'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      rows="3"
                      defaultValue={selectedRestaurant?.description}
                      readOnly={modalMode === 'view'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      rows="2"
                      defaultValue={selectedRestaurant?.address}
                      readOnly={modalMode === 'view'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Map URL</label>
                    <input
                      type="url"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      defaultValue={selectedRestaurant?.map}
                      readOnly={modalMode === 'view'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Restaurant Image</label>
                    <input
                      type="file"
                      className="mt-1 block w-full"
                      accept="image/*"
                      disabled={modalMode === 'view'}
                    />
                    {selectedRestaurant?.image && (
                      <img
                        src={selectedRestaurant.image}
                        alt="Preview"
                        className="mt-2 h-32 w-48 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Social Links */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Social Links</label>
                      {modalMode !== 'view' && (
                        <button
                          type="button"
                          onClick={() => setSocialLinksCount(prev => prev + 1)}
                          className="text-sm text-yellow-500 hover:text-yellow-600"
                        >
                          + Add More
                        </button>
                      )}
                    </div>
                    {Array.from({ length: socialLinksCount }).map((_, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Platform Name"
                          className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                          defaultValue={selectedRestaurant?.socialLinks[index]?.name}
                          readOnly={modalMode === 'view'}
                        />
                        <input
                          type="url"
                          placeholder="URL"
                          className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                          defaultValue={selectedRestaurant?.socialLinks[index]?.url}
                          readOnly={modalMode === 'view'}
                        />
                        <input
                          type="url"
                          placeholder="Icon URL"
                          className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                          defaultValue={selectedRestaurant?.socialLinks[index]?.image}
                          readOnly={modalMode === 'view'}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    {modalMode !== 'view' && (
                      <button
                        type="submit"
                        className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                      >
                        {modalMode === 'create' ? 'Create' : 'Update'}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div 
              className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              <div 
                className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-xl font-bold mb-4 pr-8">Delete Confirmation</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this restaurant? This action cannot be undone.</p>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Restaurants;