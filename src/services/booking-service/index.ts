import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError, forbiddenError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository"; 
import roomRepository from "@/repositories/room-repository";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingByuserId(userId);
  if(!booking) {
    throw notFoundError();
  }
  return { bookingId: booking.id, Room: booking.Room };
}

async function postBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }

  const room = await roomRepository.findRoomById(roomId);
  if(!room) {
    throw notFoundError();
  }

  if(room.capacity <= 0) {
    throw forbiddenError();
  }

  const newBooking = await bookingRepository.createBooking(userId, roomId);
  return { bookingId: newBooking.id };
}

async function uptadeBooking(userId: number, roomId: number, bookingId: number) {
  const room = await roomRepository.findRoomById(roomId);
  if(!room) {
    throw notFoundError();
  }

  if(room.capacity === 0) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.findBookingByuserId(userId);
  if(!booking) {
    throw notFoundError();
  }

  const uptadeBooking = await bookingRepository.uptadeBooking(roomId, bookingId);
  return uptadeBooking;
}

const bookingService = {
  getBooking,
  postBooking,
  uptadeBooking
};

export default bookingService;
