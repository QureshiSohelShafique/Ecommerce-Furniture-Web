import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
const app = express();
import colors from "colors";
import cookieParser from "cookie-parser";
import helmet from "helmet";


// import { corsOptions } from "./config/corsOptions.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRouter.js";

//connect mongoDB
import connectDB from "./config/db.js";

connectDB();

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(helmet());

app.use("/api/users", userRoutes);

app.use("/api/products", productsRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`.bgBlue));
