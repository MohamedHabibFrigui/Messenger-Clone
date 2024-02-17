import prisma from "@/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUer = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUer) {
      return null;
    }

    return currentUer;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
