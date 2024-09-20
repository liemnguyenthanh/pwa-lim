// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

const DYNAMIC_ENV_ID = "a3e6a1b9-12f7-4be0-baca-979b48bc22ce";
const jwksUrl = `https://app.dynamic.xyz/api/v0/sdk/${DYNAMIC_ENV_ID}/.well-known/jwks`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const encodedJwt = req.body.token;
    const client = new JwksClient({
      jwksUri: jwksUrl,
      rateLimit: true,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000,
    });

    const signingKey = await client.getSigningKey();
    const publicKey = signingKey.getPublicKey();

    const decodedToken: JwtPayload = jwt.verify(encodedJwt, publicKey, {
      ignoreExpiration: false,
    }) as JwtPayload;
    if (!decodedToken) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }

    if (decodedToken) {
      return res.status(201).json({
        message: "Authentication Success",
        data: decodedToken?.verified_credentials ?? [],
      });
    }
  }
  return res.status(201).json({
    message: "alo",
  });
}
