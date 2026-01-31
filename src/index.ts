import express from "express";
import AuthRouter from "./routes/AuthRouter";
import HotelRouter from "./routes/HotelRouter";
import BookingRouter from "./routes/BookingRouter";
import ReviewRouter from "./routes/ReviewRouter";
const app = express();
app.use(express.json())
app.use("/api/auth", AuthRouter);
app.use("/api/hotels", HotelRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api/reviews", ReviewRouter);

app.listen(process.env.PORT || 3000);