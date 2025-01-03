import type { AxiosInstance } from 'axios';
import { convertToSubCurrency } from '@utils';
import apiAxiosInstance from 'src/features/api-axios-instances/apiAxiosInstance';

class PaymentService {
  constructor(private client: AxiosInstance) {}

  async createPayment(amount: number) {
    const response = await this.client.post('/payment/create-payment', {
      amount: convertToSubCurrency(amount),
    });

    if (response.status !== 200) {
      return Promise.reject(
        new Error(
          `Wrong status code (expected 200, received: ${response.status})`
        )
      );
    }

    return response.data;
  }
}

const paymentService = new PaymentService(apiAxiosInstance);

export { paymentService };
