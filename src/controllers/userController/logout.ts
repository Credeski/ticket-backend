import { type Request, type Response } from "express";

export async function logout(
  req: Request,
  res: Response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<void | Response<object, Record<string, any>>> {
  const cookies = req.cookies;
  // Token was never there anyway lol
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("ticket-refresh", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  }); // secure: true = only serves on http
  res.sendStatus(204);
}
