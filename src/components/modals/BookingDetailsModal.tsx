import { BookingHistoryType } from "../../data/bookingHistoryData";

const BookingDetailsModal = ({
  showDetails,
}: {
  showDetails: BookingHistoryType | null;
}) => {
  return (
    <div className="p-6 rounded-lg mx-auto">
      {/* Header with Image */}
      <div className="flex justify-center gap-4 mb-4">
        <img
          src={showDetails?.houseImage}
          alt="Class Image"
          className="h-[200px]"
        />
      </div>

      {/* Content Grid */}
      <div className="flex gap-5 justify-between my-4">
        <div className="space-y-3 w-[100%]">
          <p className="flex justify-between">
            <span className="font-medium">Booking ID:</span>
            <span>{showDetails?.BookingId}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Check-in Date:</span>
            <span>{showDetails?.checkInDate}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Guest Name:</span>
            <span>{showDetails?.guestName}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Guest Email:</span>
            <span>{showDetails?.guestMail}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Host Name:</span>
            <span>{showDetails?.hostName}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Host Email:</span>
            <span>{showDetails?.hostMail}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{showDetails?.location}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span>${showDetails?.price}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{showDetails?.status}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;