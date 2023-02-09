import { prisma } from "@/config";

async function findBookingByuserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    },
    include: {
      Room: true
    }
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
}

async function uptadeBooking(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId: roomId
    }
  });
}

const bookingRepository = {
  findBookingByuserId,
  createBooking,
  uptadeBooking
};

export default bookingRepository;
