import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try{
    const booking = await bookingService.getBooking(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  }catch(error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try{
    const createBooking = await bookingService.postBooking(Number(userId), Number(roomId));
    // eslint-disable-next-line no-console
    console.log(createBooking);
    return res.status(httpStatus.OK).send(createBooking);
  }catch(error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "forbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    // eslint-disable-next-line no-console
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function uptadeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try{
    const uptadeBooking = await bookingService.uptadeBooking(Number(userId), Number(roomId), Number(bookingId));
    return res.status(httpStatus.OK).send(uptadeBooking.id);
  }catch(error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
