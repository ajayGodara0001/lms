import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const response = await clerkClient.users.getUser(userId);
    if (!response || !response.publicMetadata) {
      return res.status(404).json({ success: false, message: "User not found or missing metadata" });
    }

    if (response.publicMetadata.role !== "educator") {
      return res.status(403).json({ success: false, message: "Unauthorized Access: Educator role required" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
