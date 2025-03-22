import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Column } from '@tanstack/react-table';
import { useMemo } from 'react';
import { TableData } from '../types/table-data-types';

interface CountryFilterProps {
  column: Column<TableData, unknown> | undefined;
  data: TableData[];
}

function CountryFilter({ column, data }: CountryFilterProps) {
  const filterValue = column?.getFilterValue() as string;

  // Extract unique countries from data
  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(data.map(item => item.country)));
  }, [data]);

  // Handle filter change
  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      column?.setFilterValue(undefined);
    } else {
      column?.setFilterValue(value);
    }
  };

  return (
    <Select value={filterValue || 'all'} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-[180px] mx-2">
        <SelectValue placeholder="Filter by country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Countries</SelectItem>
        {uniqueCountries.map((country) => (
          <SelectItem key={country} value={country}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CountryFilter;
