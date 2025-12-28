import { Stream } from "@prisma/client";

export const updateStream = async (values: Partial<Stream>) => {
    try {

    } catch (error) {
        console.error("updateStream", error);
        throw new Error("Internal server error");
    }
}