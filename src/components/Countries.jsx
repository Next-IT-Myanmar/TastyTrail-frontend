import React, { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort } from 'react-icons/fa';
import MyanmarFlag from '../assets/images/MyanmarFlag.jpg';
import ThailandFlag from '../assets/images/ThaiFlag.jpg';
import VietnamFlag from '../assets/images/VietnamFlag.jpg';
import CambodiaFlag from '../assets/images/CambodiaFlag.jpg';
import LaosFlag from '../assets/images/LaosFlag.jpg';
import KoreanFlag from '../assets/images/KoreanFlag.jpg';
import JapanFlag from '../assets/images/JapanFlag.jpg';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const Countries = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // create, edit, view
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryToDelete, setCountryToDelete] = useState(null);

  // Sample data - replace with your actual data
  const [countries, setCountries] = useState([
    {
      id: 1,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 3,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 4,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 5,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 8,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 9,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 10,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 11,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 12,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 13,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 14,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 15,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 16,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 17,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 18,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 19,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 20,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 21,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 22,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 23,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 24,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 25,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 26,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 27,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 28,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 29,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 30,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 31,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 32,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 34,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 35,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 36,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 37,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 38,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 39,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 40,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 41,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 42,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 43,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 1,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 3,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 4,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 5,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 8,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 9,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 10,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 11,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 12,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 13,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 14,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 15,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 16,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 17,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 18,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 19,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 20,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 21,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 22,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 23,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 24,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 25,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 26,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 27,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 28,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 29,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 30,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 31,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 32,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 34,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 35,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 36,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 37,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 38,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 39,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 40,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 41,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 42,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 43,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 1,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 3,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 4,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 5,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 8,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 9,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 10,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 11,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 12,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 13,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 14,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 15,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 16,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 17,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 18,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 19,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 20,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 21,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 22,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 23,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 24,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 25,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 26,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 27,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 28,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 29,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 30,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 31,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 32,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 34,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 35,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 36,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 37,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 38,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 39,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 40,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 41,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 42,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 43,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 1,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 3,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 4,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 5,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 8,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 9,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 10,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 11,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 12,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 13,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 14,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 15,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 16,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 17,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 18,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 19,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 20,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 21,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 22,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 23,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 24,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 25,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 26,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 27,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 28,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 29,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 30,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 31,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 32,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 34,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 35,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 36,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 37,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 38,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 39,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 40,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 41,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 42,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 43,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 1,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 3,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 4,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 5,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 8,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 9,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 10,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 11,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 12,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 13,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 14,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 15,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 16,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 17,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 18,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 19,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 20,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 21,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 22,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 23,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 24,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 25,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 26,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 27,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 28,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 29,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 30,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 31,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 32,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 34,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 35,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 36,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 37,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 38,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 39,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 40,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 41,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 42,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 43,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 1,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 3,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 4,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 5,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 8,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 9,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 10,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 11,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 12,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 13,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 14,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 15,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 16,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 17,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 18,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 19,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 20,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 21,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 22,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 23,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 24,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 25,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 26,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 27,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 28,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 29,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 30,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 31,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 32,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 34,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 35,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 36,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 37,
      name: 'Myanmar',
      description: 'Land of Golden Pagodas',
      flag: MyanmarFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 38,
      name: 'Thailand',
      description: 'Land of Golden Pagodas',
      flag: ThailandFlag,
      createdAt: '2024-03-12',
      updatedAt: '2024-05-15'
    },
    {
      id: 39,
      name: 'Combodia',
      description: 'Land of Golden Pagodas',
      flag: CambodiaFlag,
      createdAt: '2024-03-1',
      updatedAt: '2024-04-5'
    },
    {
      id: 40,
      name: 'Vietnam',
      description: 'Land of Golden Pagodas',
      flag: VietnamFlag,
      createdAt: '2024-06-1',
      updatedAt: '2024-10-15'
    },
    {
      id: 41,
      name: 'Laos',
      description: 'Land of Golden Pagodas',
      flag: LaosFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 42,
      name: 'Korean',
      description: 'Land of Golden Pagodas',
      flag: KoreanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 43,
      name: 'Japan',
      description: 'Land of Golden Pagodas',
      flag: JapanFlag,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    // Add more sample data
  ]);

  const handleModal = (mode, country = null) => {
    setModalMode(mode);
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCountryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setCountries(countries.filter(country => country.id !== countryToDelete));
    setIsDeleteModalOpen(false);
    setCountryToDelete(null);
  };

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Flag',
        accessorKey: 'flag',
        cell: ({ row }) => (
          <img 
            src={row.original.flag} 
            alt={row.original.name} 
            className="h-8 w-8 rounded-full"
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
    data: countries,
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Countries</h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={() => handleModal('create')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
          >
            <FaPlus /> Add Country
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
            const currentPage = table.getState().pagination.pageIndex + 1;
            const totalPages = table.getPageCount();
            const pageNumbers = [];
            
            if (totalPages <= 7) {
              // Show all pages if total pages are 7 or less
              for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
              }
            } else {
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
              
              // Always show last page
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
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  defaultValue={selectedCountry?.name}
                  readOnly={modalMode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  defaultValue={selectedCountry?.description}
                  readOnly={modalMode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Flag</label>
                <input
                  type="file"
                  className="mt-1 block w-full"
                  accept="image/*"
                  disabled={modalMode === 'view'}
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