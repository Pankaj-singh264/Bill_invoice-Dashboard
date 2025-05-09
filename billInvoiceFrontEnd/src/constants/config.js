export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000/api';

export const PAGE_SIZES = [10, 25, 50, 100];

export const DATE_FORMATS = {
  display: 'DD MMM YYYY',
  api: 'YYYY-MM-DD',
};

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'netbanking', label: 'Net Banking' },
];

export const GST_RATES = [0, 5, 12, 18, 28];

export const INVOICE_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
};

export const THEME_COLORS = {
  primary: '#1E40AF', // blue-700
  secondary: '#6B7280', // gray-500
  success: '#059669', // green-600
  danger: '#DC2626', // red-600
  warning: '#D97706', // yellow-600
  info: '#2563EB', // blue-600
}; 