import { DollarSign, Plus, Trash2 } from 'lucide-react';
import { PaymentSummary as PaymentSummaryType } from '../types/PaymentTypes';

interface PaymentSummaryProps {
  data: PaymentSummaryType;
}

export default function PaymentSummary({ data }: PaymentSummaryProps) {
  const renderChargeLine = (title: string, charges: { description: string; amount: number }[], onRemove?: (id: string) => void) => (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</h4>
      {charges.map((charge) => (
        <div key={charge.id} className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-700">{charge.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium">${charge.amount.toFixed(2)}</span>
            {onRemove && (
              <button onClick={() => onRemove(charge.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>

      <div className="space-y-4">
        {renderChargeLine('Consultation Charges', data.consultationCharges)}
        {renderChargeLine('Treatment Charges', data.treatmentCharges)}
        {renderChargeLine('Medibridges Service Fees', data.serviceFees)}
        {renderChargeLine('Third-Party Charges', data.thirdPartyCharges)}

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">${data.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900 font-medium">${data.tax.toFixed(2)}</span>
          </div>
          {data.discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600 font-medium">-${data.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-xl text-teal-600">${data.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <DollarSign className="w-4 h-4" />
          Payment Method: <span className="font-medium capitalize">{data.paymentMethod.replace('_', ' ')}</span>
        </div>

        <button
          disabled={data.status === 'processing' || data.status === 'completed'}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {data.status === 'processing' ? 'Processing...' : data.status === 'completed' ? 'Paid' : 'Complete Payment'}
        </button>
      </div>
    </div>
  );
}
