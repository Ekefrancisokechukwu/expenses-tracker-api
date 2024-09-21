import { Request, Response } from "express";

const notfound = (req: Request, res: Response) =>
  res.status(404).send(`Route ${req.url} Not Found! `);

export default notfound;
