import React, { useState } from 'react';
import { Calendar, Users, Building2, Star } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { stripePaymentService } from '../../services/payment/StripePaymentService';

export function SubscriptionPage() {
  const { user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    try {
      if (!user) {
        throw new Error('Please log in to subscribe');
      }

      const paymentUrl = stripePaymentService.getPaymentLink(plan);
      if (!paymentUrl) {
        throw new Error('Failed to generate payment link');
      }

      console.log('Redirecting to payment:', paymentUrl);
      window.location.href = paymentUrl;
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process subscription');
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-8">
        {error}
      </div>
    );
  }

  // ... rest of the component stays the same
}