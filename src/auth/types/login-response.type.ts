import { User } from '@prisma/client';

export type LoginResponseType = Readonly<{
  token: string;
  user: User;
}>;
