import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort, FaStar } from 'react-icons/fa';
import { getRestaurantLists, deleteRestaurant } from '../services/restaurantService';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import RestaurantView from './restaurantview';
import RestaurantCreate from './RestaurantCreate';
import RestaurantUpdate from './RestaurantUpdate';

const Restaurants = () => {
  const [loading, setLoading] = useState(false);
  const message = useSelector((state) => state.message);
  const [restaurants, setRestaurants] = useState([]);
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const [additionalImagesCount, setAdditionalImagesCount] = useState(1);
  const [socialLinksCount, setSocialLinksCount] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  })

  //Fetch restaurants function
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await getRestaurantLists(pageInfo.currentPage, pageInfo.limit);
      console.log("response",response)

      if(response && response.data) {
        // Map the response data to include the image URL
        const formattedData = response.data.map(restaurant => ({
          ...restaurant,
          img: `${import.meta.env.VITE_API_BASE_URL}/${restaurant.img}`,
          otherPhoto: restaurant.otherPhoto.map(photo => `${import.meta.env.VITE_API_BASE_URL}/${photo}`),
          createdAt: new Date(restaurant.createdAt).toLocaleDateString(),
          updatedAt: new Date(restaurant.updatedAt).toLocaleDateString()
        }));

        setRestaurants(formattedData);

        // Update pagination info
        setPageInfo(prev => ({
          ...prev,
          total: response.total || formattedData.length,
          totalPages: Math.ceil((response.total || formattedData.length) / prev.limit)
        }));
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setMessage({
        text: error.response?.message || 'Failed to fetch restaurants',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Add this function before the return statement
  const StarRating = ({ value, onChange, readOnly }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-2xl cursor-pointer ${
              (hoverRating || value) >= star
                ? 'text-[#f99109]'
                : 'text-gray-300'
            } ${readOnly ? 'cursor-default' : 'hover:text-[#f99109]'}`}
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
    
    if (mode === 'edit' || mode === 'view') {
      // Handle social links parsing
      let socialLinksArray = [];
      if (restaurant?.socialLink) {
        try {
          // Handle if socialLink is already an array or needs parsing
          socialLinksArray = Array.isArray(restaurant.socialLink) 
            ? restaurant.socialLink 
            : JSON.parse(restaurant.socialLink);
        } catch (error) {
          console.error('Error parsing social links:', error);
          socialLinksArray = [];
        }
      }

      const formattedRestaurant = {
        ...restaurant,
        socialLinks: socialLinksArray,
        otherPhoto: restaurant?.otherPhoto || []
      };
      setSelectedRestaurant(formattedRestaurant);
      setSocialLinksCount(socialLinksArray.length || 1);
      setAdditionalImagesCount(formattedRestaurant.otherPhoto.length || 1);
    } else {
      setSelectedRestaurant(null);
      setSocialLinksCount(1);
      setAdditionalImagesCount(1);
    }
    
    setRating(restaurant?.rank || 0);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setRestaurantToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRestaurant(restaurantToDelete);
      await fetchRestaurants(); // Refresh the list after successful deletion
      setIsDeleteModalOpen(false);
      setRestaurantToDelete(null);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleDeleteAdditionalImage = (index) => {
    if (selectedRestaurant && selectedRestaurant.otherPhoto) {
      const updatedPhotos = [...selectedRestaurant.otherPhoto];
      updatedPhotos.splice(index, 1);
      setSelectedRestaurant({
        ...selectedRestaurant,
        otherPhoto: updatedPhotos
      });
      setAdditionalImagesCount(prev => Math.max(1, prev - 1));
    }
  };

  const handleLimitChange = (newLimit) => {
    setPageInfo( prev => ({
      ...prev,
      limit: newLimit,
      currentPage: 1,
      totalPages: Math.ceil(prev.total / newLimit)
    }));
  };

  const handlePageChange = (page) => {
    setPageInfo(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  const handleAdditionalImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPhotos = [...(selectedRestaurant?.otherPhoto || [])];
        updatedPhotos[index] = reader.result;
        setSelectedRestaurant({
          ...selectedRestaurant,
          otherPhoto: updatedPhotos
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateModalClose = async () => {
    // Fetch the updated list after creation
    await fetchRestaurants();
    setIsModalOpen(false);
    setModalMode('');
  };

  const handleUpdateModalClose = async () => {
    // Fetch the updated list after update
    await fetchRestaurants();
    setSelectedRestaurant(null);
    setIsModalOpen(false);
    setModalMode('');
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [pageInfo.limit, pageInfo.currentPage] );


  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Image',
        accessorKey: 'img',
        cell: ({ row }) => (
          <img 
            src={row.original.img} 
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
            <FaStar className="text-[#f99109] mr-1" />
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
              className="text-[#f99109] hover:text-yellow-700"
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
      pagination: {
        pageIndex: pageInfo.currentPage - 1,
        pageSize: pageInfo.limit
      }
    },

    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const nextState = updater({
          pageIndex: pageInfo.currentPage -1,
          pageSize: pageInfo.limit
        });
        handlePageChange(nextState.pageIndex + 1);
      } else {
        handlePageChange(updater.pageIndex + 1);
      }
    },
    manualPagination: true,
    pageCount: pageInfo.totalPages,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-6">
      {message && (
        <div className={`p-4 mb-4 ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        } rounded-lg`}>
          {message.text}
        </div>
      )}
      {modalMode === 'view' && isModalOpen ? (
        <RestaurantView
          restaurant={selectedRestaurant} 
          onClose={handleUpdateModalClose}
        />
      ) : modalMode === 'create' && isModalOpen ? (
        <RestaurantCreate
          onClose={handleCreateModalClose}
        />
      ) : modalMode === 'edit' && isModalOpen ? (
        <RestaurantUpdate
          restaurant={selectedRestaurant}
          onClose={handleUpdateModalClose}
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
                className="px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#f99109]"
              />
              <button
                onClick={() => handleModal('create')}
                className="bg-[#f99109] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
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
                value={pageInfo.limit}
                onChange={e => handleLimitChange(Number(e.target.value))}
                className="px-2 py-1 border rounded-lg"
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-gray-600">
                Page {pageInfo.currentPage} of{pageInfo.totalPages}
              </span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handlePageChange(pageInfo.currentPage - 1)}
                disabled={pageInfo.currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              
              {/* Numbered Pagination with Ellipsis */}
          {(() => {
            // Calculate totalPages based on total items and limit
            const totalItems = pageInfo.total ?? 0;
            const itemsPerPage = pageInfo.limit ?? 1;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const currentPage = pageInfo.currentPage ?? 1;
            const pageNumbers = [];

            if (totalPages === 0) return null; // Nothing to render

            console.log("totalItems", totalItems);
            console.log("itemsPerPage", itemsPerPage);
            console.log("totalPages", totalPages);
            console.log("currentPage", currentPage);
            console.log("pageNumbers", pageNumbers);
            
            if (totalPages <= 7) {
              // Show all pages if total pages are 7 or less
              for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
              }
            } else {
              // Rest of the pagination logic remains the same
              // Always show first page
              pageNumbers.push(1);
              
              if (currentPage > 3) {
                pageNumbers.push('...');
              }
              
              // Show pages around current page
              for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pageNumbers.push(i);
              }
              
              if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
              }
              
              // Always show last page if there's more than one page
              if (totalPages > 1) {
                pageNumbers.push(totalPages);
              }
            }
            
            return pageNumbers.map((pageNumber, index) => (
              pageNumber === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
              ) : (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-[#f99109] text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            ));
          })()}

              <button
                onClick={() => handlePageChange(pageInfo.currentPage + 1)}
                disabled={pageInfo.currentPage === Math.ceil(pageInfo.total / pageInfo.limit)}
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
                        defaultValue={selectedRestaurant?.rank}
                        readOnly={modalMode === 'view'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
                      rows="3"
                      defaultValue={selectedRestaurant?.description}
                      readOnly={modalMode === 'view'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
                      rows="2"
                      defaultValue={selectedRestaurant?.address}
                      readOnly={modalMode === 'view'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Map URL</label>
                    <input
                      type="url"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
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

                  {/* Additional Images Section */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">Additional Images</label>
                      {modalMode !== 'view' && (
                        <button
                          type="button"
                          onClick={() => setAdditionalImagesCount(prev => prev + 1)}
                          className="text-sm text-[#f99109] hover:text-yellow-600"
                        >
                          + Add More Images
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                      {modalMode === 'view' ? (
                        // View mode - just display images
                        selectedRestaurant?.otherPhoto?.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Additional ${index + 1}`}
                            className="h-32 w-48 object-cover rounded-lg"
                          />
                        ))
                      ) : (
                        // Edit/Create mode - allow updates
                        Array.from({ length: additionalImagesCount }).map((_, index) => (
                          <div key={index} className="relative">
                            {selectedRestaurant?.otherPhoto?.[index] ? (
                              <div className="relative">
                                <img
                                  src={selectedRestaurant.otherPhoto[index]}
                                  alt={`Additional ${index + 1}`}
                                  className="h-32 w-48 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAdditionalImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <FaTimes className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <input
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-48"
                                onChange={(e) => handleAdditionalImageChange(e, index)}
                              />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Social Links</label>
                      {modalMode !== 'view' && (
                        <button
                          type="button"
                          onClick={() => setSocialLinksCount(prev => prev + 1)}
                          className="text-sm text-[#f99109] hover:text-yellow-600"
                        >
                          + Add More
                        </button>
                      )}
                    </div>
                    {modalMode === 'view' ? (
                      // View mode - display social links as read-only
                      <div className="space-y-2">
                        {selectedRestaurant?.socialLinks?.map((link, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <span className="font-medium">{link.platform}:</span>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-600 hover:underline">
                              {link.url}
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Edit/Create mode
                      Array.from({ length: socialLinksCount }).map((_, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Platform Name"
                            className="rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
                            defaultValue={selectedRestaurant?.socialLinks?.[index]?.platform}
                          />
                          <input
                            type="url"
                            placeholder="URL"
                            className="rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
                            defaultValue={selectedRestaurant?.socialLinks?.[index]?.url}
                          />
                        </div>
                      ))
                    )}
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
                        className="px-4 py-2 text-white bg-[#f99109] rounded-md hover:bg-yellow-600"
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