import { useState } from 'react';
import type { LogFilters, LogLevel } from '../types/LogEvent';

interface LogFiltersProps {
  onFilter: (filters: LogFilters) => void;
  isLoading?: boolean;
}

const LOG_LEVELS: LogLevel[] = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'];

export function LogFiltersComponent({ onFilter, isLoading }: LogFiltersProps) {
  const [filters, setFilters] = useState<LogFilters>({
    application: '',
    environment: '',
    level: '',
    from: '',
    to: '',
  });

  const handleChange = (field: keyof LogFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleClear = () => {
    const clearedFilters: LogFilters = {
      application: '',
      environment: '',
      level: '',
      from: '',
      to: '',
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label htmlFor="application" className="block text-sm font-medium text-gray-700 mb-1">
            Application
          </label>
          <input
            type="text"
            id="application"
            value={filters.application}
            onChange={(e) => handleChange('application', e.target.value)}
            placeholder="Nome da aplicação"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="environment" className="block text-sm font-medium text-gray-700 mb-1">
            Environment
          </label>
          <input
            type="text"
            id="environment"
            value={filters.environment}
            onChange={(e) => handleChange('environment', e.target.value)}
            placeholder="Ex: production, staging"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <select
            id="level"
            value={filters.level}
            onChange={(e) => handleChange('level', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os níveis</option>
            {LOG_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
            De
          </label>
          <input
            type="datetime-local"
            id="from"
            value={filters.from}
            onChange={(e) => handleChange('from', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
            Até
          </label>
          <input
            type="datetime-local"
            id="to"
            value={filters.to}
            onChange={(e) => handleChange('to', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
