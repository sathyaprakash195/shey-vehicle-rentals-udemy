import { IBooking } from "@/interfaces";
import { cancelBooking } from "@/server-actions/bookings";
import { sendBookingCancellationEmail } from "@/server-actions/mails";
import { Alert, Button, message, Modal } from "antd";
import React from "react";

interface ICancelBookingModal {
  showCancelBookingModal: boolean;
  setShowCancelBookingModal: (value: boolean) => void;
  selectedBooking: IBooking;
}

function CancelBookingModal({
  showCancelBookingModal,
  setShowCancelBookingModal,
  selectedBooking,
}: ICancelBookingModal) {
  const [loading, setLoading] = React.useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      const { success } = await cancelBooking({
        bookingId: selectedBooking._id,
        paymentId: selectedBooking.paymentId,
      });

      if (success) {
        message.success("Booking cancelled successfully");
        sendBookingCancellationEmail(selectedBooking);
        setShowCancelBookingModal(false);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={showCancelBookingModal}
      onClose={() => setShowCancelBookingModal(false)}
      onCancel={() => setShowCancelBookingModal(false)}
      title="Cancel Booking"
      centered
      footer={null}
    >
      <Alert
        message="Are you sure you want to cancel this booking? This action cannot be undone. And this vehicle will be available for others to book."
        type="info"
      />

      <div className="flex justify-end mt-5">
        <Button type="primary" loading={loading} onClick={handleCancel}>
          Yes , Cancel Booking
        </Button>
      </div>
    </Modal>
  );
}

export default CancelBookingModal;
