import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user.constant";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(USER_ROLE).optional(),
  status: z.nativeEnum(USER_STATUS).optional(),
});



export const UserValidations = {
  userValidationSchema,
  updateUserValidationSchema,
};
