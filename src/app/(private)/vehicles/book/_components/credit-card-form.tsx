import React from "react";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, message, Modal } from "antd";

interface ICreditCardFormProps {
  openCreditCardForm: boolean;
  setOpenCreditCardForm: (value: boolean) => void;
  onPaymentSuccess: (value: string) => void;
}

function CreditCardForm({
  openCreditCardForm,
  setOpenCreditCardForm,
  onPaymentSuccess,
}: ICreditCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        onPaymentSuccess(result.paymentIntent.id);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={openCreditCardForm}
      onCancel={() => setOpenCreditCardForm(false)}
      centered
      title="COMPLETE YOUR BOOKING PAYMENT"
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            allowedCountries: ["US"],
            mode: "billing",
          }}
        />
        <div className="flex justify-end gap-5 mt-5">
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreditCardForm;
