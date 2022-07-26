import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import crypto from 'crypto'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/**
 * You can verify the authentication and the integrity of the data received by comparing the received hash parameter with the hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string with the SHA256 hash of the bot's token used as a secret key.
 *
 * Data-check-string is a concatenation of all received fields, sorted in alphabetical order,
 * in the format key=<value> with a line feed character ('\n', 0x0A) used as separator – e.g.,
 * 'auth_date=<auth_date>\nfirst_name=<first_name>\nid=<id>\nusername=<username>'.
 * @param {*} params
 * @returns
 */
async function checkSignature(params) {
  const keys = ['id', 'username', 'first_name', 'last_name', 'photo_url', 'auth_date']
  const checkString = keys
    .sort()
    .map(key => [key, params[key]])
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  const secret = crypto.createHash('sha256')
    .update(process.env.TELEGRAM_BOT_SECRET)
    .digest()

  const hash = crypto.createHmac('sha256', secret)
    .update(checkString)
    .digest('hex')

  return hash === params['hash']
}

function tgAuthDateToDate(value) {
  const n = Number(value)

  return new Date(n * 1000)
}

async function findOrCreateUser(credentials) {
  const telegramId = Number(credentials.id)
  if (!telegramId) {
    return null
  }

  const user = await prisma.user.findFirst({
    where: {
      telegram: {
        id: telegramId,
      }
    },
    include: {
      telegram: true,
    }
  });
  if (user && !user.enabled) {
    return null
  }
  if (user) {
    return user
  }

  const name = `${credentials.first_name} ${credentials.last_name}`
  const newUser = await prisma.user.create({
    data: {
      name,
      image: credentials.photo_url,
      telegram: {
        connectOrCreate: {
          where: {
            id: telegramId,
          },
          create: {
            id: telegramId,
            username: credentials.username,
            authDate: tgAuthDateToDate(credentials.auth_date),
            firstName: credentials.first_name,
            lastName: credentials.last_name,
            photoUrl: credentials.photo_url,
          }
        }
      }
    },
    include: {
      telegram: true,
    }
  })
  return newUser
}

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('signIn callback');
    //   console.log(user);
    //   console.log(account);
    //   console.log(profile);
    //   console.log(email);
    //   console.log(credentials);
    //   //   const isAllowedToSignIn = true
    //   //   if (isAllowedToSignIn) {
    //   //     return true
    //   //   } else {
    //   //     // Return false to display a default error message
    //   //     return false
    //   //     // Or you can return a URL to redirect to:
    //   //     // return '/unauthorized'
    //   //   }
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async session({ session, user, token }) {
    //   console.log('session callback');
    //   console.log(user);
    //   console.log(token);

    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   console.log('token callback');
    //   console.log(user);
    //   console.log(account);
    //   console.log(profile);
    //   console.log(isNewUser);

    //   // token.picture = user.photo_url

    //   return token
    // },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'username', type: 'text' },
      },
      async authorize(credentials, req) {
        const pass = await checkSignature(credentials)
        if (!pass) {
          return null
        }

        const user = await findOrCreateUser(credentials)
        // If you return null then an error will be displayed advising the user to check their details.
        if (!user) {
          return null
        }

        // Any object returned will be saved in `user` property of the JWT
        return {
          id: user.id,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  events: {
    async signIn(message) {
      /* on successful sign in */
      console.log('event:signin', message);
    },
    async signOut(message) {
      /* on signout */
      console.log('event:signout', message);
    },
    async createUser(message) {
      /* user created */
      console.log('event:createUser', message);
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
      console.log('event:updateUser', message);
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
      console.log('event:linkAccount', message);
    },
    async session(message) {
      /* session is active */
      console.log('event:session', message);
    },
    async error(message) {
      console.log('event:error', message);
    },
  }
});
