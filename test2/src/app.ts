import express, { Request, Response } from 'express';

import { fileQueue } from './queue.js';

const app = express();

app.post("/file-write", async (req: Request, res: Response) => {
   const result = await fileQueue.add("writeMessage", "test message");
});

app.get("/job-status/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await fileQueue.getJob(id);

  if (!job) {
    return res.status(404).json({ error: "Job bulunamadı" });
  }

  const state = await job.getState();
  const result = await job.returnvalue;
  const failedReason = job.failedReason; 

  res.json({
    id: job.id,
    state,
    result,
    failedReason,
  });
});

app.listen(3000, () => {
    console.log("Server 3000 portunda başlatıldı");
})