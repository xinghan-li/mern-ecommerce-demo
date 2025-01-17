import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
    getAnalyticsData,
    getDailySalesData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date(); // Add 1 day to the current date
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days from the current date in milliseconds

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json({ analyticsData, dailySalesData });
    } catch (error) {
        console.error("Error fetching analytics data:", error.message);
        res.status(500).json({ message: "Error fetching analytics data" });
    }
});

export default router;
