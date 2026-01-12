import type { LogEvent, LogLevel } from '../types/LogEvent';

interface LogDetailsProps {
  log: LogEvent;
  onClose: () => void;
}

const levelColors: Record<LogLevel, string> = {
  TRACE: 'bg-gray-100 text-gray-800 border-gray-300',
  DEBUG: 'bg-gray-200 text-gray-800 border-gray-400',
  INFO: 'bg-blue-100 text-blue-800 border-blue-300',
  WARN: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  ERROR: 'bg-red-100 text-red-800 border-red-300',
};

function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    });
  } catch {
    return timestamp;
  }
}

function formatJson(obj: unknown): string {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

export function LogDetails({ log, onClose }: LogDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Detalhes do Log</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Level Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${levelColors[log.level]}`}
            >
              {log.level}
            </span>
            <span className="text-gray-500 text-sm">{formatTimestamp(log.timestamp)}</span>
          </div>

          {/* Application & Environment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Application
              </label>
              <p className="text-gray-900 font-medium">{log.application}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Environment
              </label>
              <p className="text-gray-900">{log.environment}</p>
            </div>
          </div>

          {/* Trace ID */}
          {log.traceId && (
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Trace ID
              </label>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-800 break-all">
                {log.traceId}
              </code>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Mensagem
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap break-words">{log.message}</p>
            </div>
          </div>

          {/* SDK Info */}
          {log.sdk && (
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                SDK
              </label>
              <p className="text-gray-700">
                {log.sdk.language} v{log.sdk.version}
              </p>
            </div>
          )}

          {/* Metadata */}
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Metadata
              </label>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
                {formatJson(log.metadata)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
