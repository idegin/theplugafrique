import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  const { slug } = req.params;
  return {
    data: {
      
    }
  };
}
