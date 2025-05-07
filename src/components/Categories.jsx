import React, { useState, useMemo, useEffect} from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort } from 'react-icons/fa';
import {createCategory, getCategories, getCategoryDetail, updateCategory, deleteCategory} from '../services/categoryService';
import categoryImage from '../assets/images/bibimbap.png';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const Categories = () => {
  //Add loading state
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [sorting, setSorting] = useState([
    {id: 'id', desc: true} // Sort by ID in descending order by default
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null, 
  });
  // Update initial pageInfo state
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  

   // Update fetchCategories function
   const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories(pageInfo.currentPage, pageInfo.limit);
      
      if (response && response.data) {
        const sortedData = [...response.data].sort((a, b) => b.id - a.id);
        setCategories(sortedData);
        
        // Update pagination info with the values from response.pagination
        setPageInfo(prev => ({
          ...prev,
          total: response.pagination.total,
          currentPage: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: Math.ceil(response.pagination.total / response.pagination.limit)
        }));
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage({
        text: error.response?.message || 'Failed to fetch categories',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Update handlePageChange function
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(pageInfo.total / pageInfo.limit);
    if (newPage >= 1 && newPage <= totalPages) {
      setPageInfo(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  // Update handleLimitChange function
  const handleLimitChange = (newLimit) => {
    setPageInfo(prev => ({
      ...prev,
      limit: newLimit,
      currentPage: 1,
      totalPages: Math.ceil(prev.total / newLimit)
    }));
  };

  // Add this function to handle form input changes
  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, img: file }));
      handleImageChange(e);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
   
  // let response = [];

  // the form submission in the modal

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.img instanceof File) {
        formDataToSend.append('img', formData.img);
      }

      let response;
      if (modalMode === 'edit') {
        response = await updateCategory(selectedCategory.id, formDataToSend);
        console.log("Update response", response)
        // Update the categories list with the updated item
        setCategories(prev => prev.map(cat => 
          cat.id === selectedCategory.id ? response : cat
        ));
      } else {
        response = await createCategory(formDataToSend);
        setCategories(prev => [...prev, response]);
      }

      // Refresh the list to get updated data including new image paths
      fetchCategories();
      
      setMessage({ 
        text: response.message || `Category ${modalMode === 'edit' ? 'updated' : 'created'} successfully`, 
        type: 'success' 
      });
      
      setIsModalOpen(false);
      setFormData({ name: '', description: '', img: null });
      setPreviewImage(null);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error(`Error ${modalMode === 'edit' ? 'updating' : 'creating'} category:`, error);
      setMessage({ 
        text: error.response?.message || `Failed to ${modalMode === 'edit' ? 'update' : 'create'} category`, 
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
    }
  };

  const handleModal = async (mode, category = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
    
    if (mode === 'view') {
      try {
        const categoryDetail = await getCategoryDetail(category.id);
        setFormData({
          name: categoryDetail.name || '',
          description: categoryDetail.description || '',
          img: categoryDetail.img ? `${import.meta.env.VITE_API_BASE_URL}/${categoryDetail.img}` : ''
        });
      } catch (error) {
        console.error('Error fetching category details:', error);
        setMessage({
          text: error.response?.data?.message || 'Failed to fetch category details',
          type: 'error'
        });
      }
    } else if (mode === 'edit') {
      setFormData({
        name: category?.name || '',
        description: category?.description || '',
        img: `${import.meta.env.VITE_API_BASE_URL}/${category?.img}` || ''
      });
    } else {
      setFormData({ name: '', description: '', img: null });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(categoryToDelete);
      setCategories(categories.filter(category => category.id !== categoryToDelete));
      setMessage({
        text: 'Category deleted successfully',
        type: 'success'
      });
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to delete category',
        type: 'error'
      });
    } finally {
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  // Fetch categories function
  // const fetchCategories = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getCategories(pageInfo.currentPage, pageInfo.limit);
      
  //     if (Array.isArray(response.data)) {
  //       // Sort the array in descending order by id
  //       const sortedData = [...response.data].sort((a, b) => b.id - a.id);
  //       setCategories(sortedData);
        
  //       // Update pagination info with the total count from the API
  //       const totalCount = response.total || response.data.length;
  //       setPageInfo(prev => ({
  //         ...prev,
  //         total: totalCount,
  //         totalPages: Math.ceil(totalCount / prev.limit),
  //         currentPage: prev.currentPage > Math.ceil(totalCount / prev.limit)
  //           ? Math.ceil(totalCount / prev.limit) 
  //           : prev.currentPage
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //     setMessage({
  //       text: error.response?.message || 'Failed to fetch categories',
  //       type: 'error'
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Add useEffect for auto-dismissing notifications
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Update useEffect to refetch when page changes
  useEffect(() => {
    fetchCategories();
  }, [pageInfo.limit, pageInfo.currentPage]); // Add dependencies to trigger refetch

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'No',
        cell: ({ row }) => {
          return ((pageInfo.currentPage - 1) * pageInfo.limit) + row.index + 1;
        },
      },
      {
        header: 'IMAGE',
        accessorKey: 'img',
        cell: ({ row }) => {
          const imageUrl = row.original.img || row.original.image;
          // console.log("image url", import.meta.env.VITE_API_BASE_URL+"/"+imageUrl);
          
          
          return (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${imageUrl}`}
              alt={row.original.name}
              className="h-16 w-16 object-cover rounded-lg"
            />
          );
        },
      },
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Description',
        accessorKey: 'description',
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

  // Fix the table configuration
  const table = useReactTable({
    data: categories || [],
    columns,
    state: {
      sorting,
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
    pageCount: Math.ceil(pageInfo.total / pageInfo.limit), // Fix the page count calculation
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search categories..."
            className="px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#f99109]"
          />
          <button
            onClick={() => handleModal('create')}
            className="bg-[#f99109] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
          >
            <FaPlus /> Add Category
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
          
          {/* Numbered Pagination */}
          {/* {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => table.setPageIndex(pageNumber - 1)}
              className={`px-3 py-1 border rounded-lg ${
                table.getState().pagination.pageIndex === pageNumber - 1
                  ? 'bg-yellow-500 text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          ))} */}

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
              {modalMode === 'create' ? 'Add New Category' : 
               modalMode === 'edit' ? 'Edit Category' : 'Category Details'}
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
                  defaultValue={selectedCategory?.name}
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
                  defaultValue={selectedCategory?.description}
                  readOnly={modalMode === 'view'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Image
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 space-y-2">
                  <input
                    type="file"
                    name="img"
                    onChange={handleFormChange}
                    className="mt-1 block w-full"
                    accept="img/*"
                    disabled={modalMode === 'view'}
                    required={modalMode === 'create'}
                  />
                  {(modalMode === 'view' || modalMode === 'edit') && selectedCategory?.img && (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/${selectedCategory.img}`}
                      alt="Category"
                      className="mt-2 h-32 w-full object-cover rounded-lg"
                    />
                  )}
                  {previewImage && modalMode === 'create' && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="mt-2 h-32 w-full object-cover rounded-lg"
                    />
                  )}
                </div>
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
            <p className="text-gray-600 mb-6">Are you sure you want to delete this category? This action cannot be undone.</p>

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

export default Categories;