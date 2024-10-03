// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt, { JwtPayload } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import type { NextApiRequest, NextApiResponse } from "next";
const DYNAMIC_ENV_ID = "a3e6a1b9-12f7-4be0-baca-979b48bc22ce";
const jwksUrl = `https://app.dynamic.xyz/api/v0/sdk/${DYNAMIC_ENV_ID}/.well-known/jwks`;
import { verifyMessage } from "ethers";
// In your backend, you verify the signature:

function verifySignature(
  message: string,
  signature: string,
  expectedAddress: string
) {
  const recoveredAddress = verifyMessage("0x8e8410580E651ca9845bACeb2B1e9Db90847B6b7 - 0x67FA1cFA8f93", signature);
  console.log({ recoveredAddress });
  return recoveredAddress === expectedAddress;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const encodedJwt = req.body.token;
    const message = req.body?.message ?? "";
    const signature = req.body?.signature ?? "";
    const smAddress = req.body?.smAddress ?? "";

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
      let smAddress: string = "";
      const isCorrectSm = verifySignature(message, signature, "");
      try {
      } catch (error) {}
      return res.status(201).json({
        message: "Authentication Success",
        smAddress,
        isCorrectSm,
        data: decodedToken?.verified_credentials ?? [],
      });
    }
  }
  return res.status(201).json({
    message: "alo",
  });
}
