import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        // Aquí debes implementar la lógica para verificar si las credenciales son válidas
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user || user.password !== credentials.password) {
          throw new Error('Invalid email or password');
        }

        // Si las credenciales son válidas, devolvemos el objeto de usuario
        return user;
      },
    }),
    // Aquí puedes agregar otros proveedores de autenticación (por ejemplo, Google, Facebook, etc.)
  ],
  database: {
    type: 'sqlite',
    database: './prisma/tmp/db.sqlite',
  },
  adapter: PrismaAdapter(prisma),
});