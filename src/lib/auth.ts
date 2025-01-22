/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secretKey);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return null;
  }

  try {
    return await decrypt(session.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
