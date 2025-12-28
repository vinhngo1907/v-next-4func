import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db";

export const getSelf = async () => {
	const self = await currentUser();
	if (!self || !self.username) {
		throw new Error("Unauthorized");
	}

	const user = await db.user.findUnique({
		where: { externalUserId: self.id }
	});

	if (!user) throw new Error("User not found or not authorized!!!");

	return user;
}

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.firstName) {
    throw new Error("Unauthorized");
  }

  const selfUsername =
    self.username ??
    `${self.firstName}${self.lastName ?? ""}`.toLowerCase().trim();

  if (selfUsername !== username) {
    throw new Error("Forbidden");
  }
  
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
