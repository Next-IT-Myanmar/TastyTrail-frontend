import React, { useState, useMemo, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort } from 'react-icons/fa';
import { createCountry, getCountries, updateCountry, getCountryDetail, deleteCountry } from '../services/countryService';
import { formatToLocalDateTime } from '../utils/utils';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const Countries = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  // const [sorting, setSorting] = useState([
  //   {
  //     id: 'createdAt',
  //     desc: true
  //   }
  // ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // create, edit, view
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [countryToDelete, setCountryToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    flag: null
  });
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });


  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await getCountries(pageInfo.currentPage, pageInfo.limit);
      
      if (response && response.data) {
        const sortedData = [...response.data].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setCountries(sortedData);
        
        setPageInfo(prev => ({
          ...prev,
          total: response.pagination.total,
          currentPage: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: Math.ceil(response.pagination.total / response.pagination.limit)
        }));
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to fetch countries',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Add pagination handlers
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(pageInfo.total / pageInfo.limit);
    if (newPage >= 1 && newPage <= totalPages) {
      setPageInfo(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleLimitChange = (newLimit) => {
    setPageInfo(prev => ({
      ...prev,
      limit: newLimit,
      currentPage: 1,
      totalPages: Math.ceil(prev.total / newLimit)
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleFormChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   if (type === 'file') {
  //     const file = files[0];
  //     setFormData(prev => ({ ...prev, flag: file }));  // Changed from img to flag
  //     handleImageChange(e);
  //   } else {
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //   }
  // };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.flag instanceof File) {
        formDataToSend.append('flag', formData.flag);
      }
  
      let response;
      if (modalMode === 'create') {
        response = await createCountry(formDataToSend);
      } else if (modalMode === 'edit' && selectedCountry) {
        response = await updateCountry(selectedCountry.id, formDataToSend);
      }
      
      setMessage({ 
        text: `Country ${modalMode === 'create' ? 'created' : 'updated'} successfully`,
        type: 'success'
      });
      
      setIsModalOpen(false);
      setFormData({ name: '', description: '', flag: null });
      setPreviewImage(null);
      
      setTimeout(() => {
        fetchCountries();
      }, 500);
  
    } catch (error) {
      console.error(`Error ${modalMode === 'create' ? 'creating' : 'updating'} country:`, error);
      setMessage({
        text: error.response?.data?.message || `Failed to ${modalMode === 'create' ? 'create' : 'update'} country`,
        type: 'error'
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, flag: file }));
    }
  };

  const handleModal = async (mode, country = null) => {
    setModalMode(mode);
    setPreviewImage(null); // Reset preview image
    
    if (mode === 'view' && country) {
      try {
        setLoading(true);
        const response = await getCountryDetail(country.id);
        if (response && response.data) {
          const flagUrl = `${import.meta.env.VITE_API_BASE_URL}/${response.data.flag}`;
          setSelectedCountry({
            ...response.data,
            flag: flagUrl
          });
          setFormData({
            name: response.data.name,
            description: response.data.description,
            flag: response.data.flag
          });
        }
      } catch (error) {
        console.error('Error fetching country details:', error);
        setMessage({
          text: error.response?.data?.message || 'Failed to fetch country details',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedCountry(country);
      if (country) {
        const flagUrl = `${import.meta.env.VITE_API_BASE_URL}/${country.flag}`;
        setFormData({
          name: country.name,
          description: country.description,
          flag: country.flag
        });
        setPreviewImage(flagUrl); // Set preview image for edit mode
      } else {
        setFormData({
          name: '',
          description: '',
          flag: null
        });
      }
    }
    
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCountryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteCountry(countryToDelete);
      if (response) {
        setMessage({
          text: 'Country deleted successfully',
          type: 'success'
        });
        fetchCountries(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting country:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to delete country',
        type: 'error'
      });
    } finally {
      setIsDeleteModalOpen(false);
      setCountryToDelete(null);
    }
  };

  const columns = useMemo(
    () => [
      // {
      //   header: 'No',
      //   cell: ({ row }) => {
      //     const startIndex = (pageInfo.currentPage - 1) * pageInfo.limit;
      //     return startIndex + row.index + 1;
      //   },
      // },
      {
        header: 'ID',
        accessorKey: 'id',
        cell: ({ row }) => (
          <span title={row.original.id}>
            {row.original.id.length > 8 
              ? `${row.original.id.substring(0, 8)}...` 
              : row.original.id}
          </span>
        ),
      },
      {
        header: 'Flag',
        accessorKey: 'flag',
        cell: ({ row }) => (
          <img 
            src={`${import.meta.env.VITE_API_BASE_URL}/${row.original.flag}`}
            alt={row.original.name} 
            className='w-15'
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
          <span title={row.original.description}>
            {row.original.description.length > 8 
              ? `${row.original.description.substring(0, 8)}...` 
              : row.original.description}
          </span>
        ),
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
        cell: ({ row }) => formatToLocalDateTime(row.original.createdAt)
      },
      {
        header: 'Updated At',
        accessorKey: 'updatedAt',
        cell: ({ row }) => formatToLocalDateTime(row.original.updatedAt)
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

    // Update table configuration
    const table = useReactTable({
      data: countries,
      columns,
      state: {
        // sorting,
        globalFilter,
        pagination: {
          pageIndex: pageInfo.currentPage - 1,
          pageSize: pageInfo.limit,
        },
      },
      onPaginationChange: (updater) => {
        if (typeof updater === 'function') {
          const nextState = updater({
            pageIndex: pageInfo.currentPage - 1,
            pageSize: pageInfo.limit,
          });
          handlePageChange(nextState.pageIndex + 1);
        } else {
          handlePageChange(updater.pageIndex + 1);
        }
      },
      manualPagination: true,
      pageCount: Math.ceil(pageInfo.total / pageInfo.limit),
      // onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });

    // Add useEffect for auto-dismissing notifications
    useEffect(() => {
      if (message.text) {
        const timer = setTimeout(() => {
          setMessage({ text: '', type: '' });
        }, 4000); // 5 seconds
  
        return () => clearTimeout(timer);
      }
    }, [message]);

  // Add useEffect to refetch when pagination changes
  useEffect(() => {
    fetchCountries();
  }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize]);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="p-6">
      {/* Notification */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transform transition-all duration-300 ${
          message.type === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' 
          : 'bg-red-100 text-red-700 border-l-4 border-red-500'
        }`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {message.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Countries</h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109]"
          />
          <button
            onClick={() => handleModal('create')}
            className="bg-[#f99109] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
          >
            <FaPlus /> Add Country
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f99109]"></div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Update Pagination section */}
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
          Page {pageInfo.currentPage} of {Math.ceil(pageInfo.total / pageInfo.limit)}
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
            const totalItems = pageInfo.total ?? 0;
            const itemsPerPage = pageInfo.limit ?? 1;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const currentPage = pageInfo.currentPage ?? 1;
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
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl relative"
            onClick={e => e.stopPropagation()}
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
              {modalMode === 'create' ? 'Add New Country' : 
               modalMode === 'edit' ? 'Edit Country' : 'Country Details'}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  readOnly={modalMode === 'view'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  readOnly={modalMode === 'view'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Flag
                  <span className="text-red-500">*</span>
                </label>
                {(selectedCountry?.flag || previewImage) && (
                  <div className="mt-2 mb-4">
                    <img 
                      src={previewImage || selectedCountry?.flag} 
                      alt={`${selectedCountry?.name || 'New'} flag`} 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="flag"
                  className="mt-1 block w-full"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={modalMode === 'view'}
                  required={modalMode === 'create'}
                />
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
            <p className="text-gray-600 mb-6">Are you sure you want to delete this country? This action cannot be undone.</p>

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
    </div>
  );
};

export default Countries;
