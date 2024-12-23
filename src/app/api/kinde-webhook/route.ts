import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const header = jwt.decode(token, { complete: true })?.header;
    const kid = header?.kid;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = await jwt.verify(token, signingKey);

    // Handle various events
    switch (event) {
      case "user.updated":
        // handle user updated event
        // e.g update database with event.data
        console.log(event);
        break;
      case "user.created":
        // handle user created event
        // e.g add user to database with event.data
        console.log(event);
        break;
      case "user.authenticated":
        // handle user created event
        // e.g add user to database with event.data
        console.log(event, "webhook event");
        break;
      default:
        // other events that we don't handle
        break;
    }

  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}