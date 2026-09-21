import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import PaymentSummary from '../components/PaymentSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { PaymentSummary as PaymentSummaryType, PaymentMethod } from '../types/PaymentTypes';

export default function PaymentPage() {
  const [paymentData, setPaymentData] = useState<PaymentSummaryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentData({
        id: 'pay_001',
        consultationCharges: [
          { id: 'cc_001', consultationId: 'con_001', doctorName: 'Dr. Sarah Johnson', description: 'Cardiology Consultation', amount: 200 },
          { id: 'cc_002', consultationId: 'con_002', doctorName: 'Dr. Emily Watson', description: 'Oncology Follow-up', amount: 170 },
        ],
        treatmentCharges: [
          { id: 'tc_001', treatmentName: 'Blood Panel', description: 'Comprehensive blood test', amount: 85 },
          { id: 'tc_002', treatmentName: 'ECG', description: 'Electrocardiogram', amount: 60 },
        ],
        serviceFees: [
          { id: 'sf_001', description: 'Medibridges Platform Fee', amount: 25 },
          { id: 'sf_002', description: 'Document Processing Fee', amount: 15 },
        ],
        thirdPartyCharges: [
          { id: 'tp_001', category: 'travel', provider: 'Booking.com', description: 'Hotel - 2 nights', amount: 280 },
          { id: 'tp_002', category: 'transportation', provider: 'Uber', description: 'Airport transfer', amount: 45 },
        ],
        subtotal: 880,
        tax: 70.4,
        discount: 0,
        total: 950.4,
        paymentMethod: 'credit_card',
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    if (!paymentData) return;
    setProcessing(true);
    setError('');
    await new Promise((r) => setTimeout(r, 2000));
    setPaymentData({ ...paymentData, status: 'completed', paymentMethod });
    setProcessing(false);
    setSuccess(true);
  };

  if (loading) return <LoadingSpinner size="lg" text="Loading payment details..." />;
  if (!paymentData) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        <p className="text-sm text-gray-500 mt-1">Review and complete your payment</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-medium text-green-800">Payment Successful!</p>
            <p className="text-sm text-green-600">Your payment has been processed.</p>
          </div>
        </div>
      )}

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Summary */}
        <div className="lg:col-span-2">
          <PaymentSummary data={paymentData} />
        </div>

        {/* Payment Method */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              {[
                { value: 'credit_card', label: 'Credit Card', icon: CreditCard },
                { value: 'debit_card', label: 'Debit Card', icon: CreditCard },
                { value: 'bank_transfer', label: 'Bank Transfer', icon: CreditCard },
                { value: 'insurance', label: 'Insurance', icon: AlertCircle },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value as PaymentMethod)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      paymentMethod === method.value ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${paymentMethod === method.value ? 'text-teal-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${paymentMethod === method.value ? 'text-gray-900' : 'text-gray-600'}`}>
                      {method.label}
                    </span>
                    {paymentMethod === method.value && <CheckCircle className="w-4 h-4 text-teal-600 ml-auto" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handlePayment}
              disabled={processing || paymentData.status === 'completed'}
              className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : paymentData.status === 'completed' ? (
                'Paid'
              ) : (
                <>
                  <DollarSign className="w-4 h-4" />
                  Pay ${paymentData.total.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
