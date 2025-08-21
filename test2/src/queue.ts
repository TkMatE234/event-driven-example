import {Queue, Worker} from 'bullmq';

import { fileWrite } from './proc.js';

export const fileQueue = new Queue("fileQueue",{
    connection : {host : "127.0.0.1",port : 6379}
});

const worker = new Worker(
  "fileQueue",
  async job => {
    console.log(`${job.id} - id'li job işleme alındı`);
    const num = Math.round(Math.random() * 10);
    if(num>=0 && num <=7)
    {
        await fileWrite(job.data);
        return `${job.id} - id'li job işlemi başarıyla tamamlandı`;
    }
    throw new Error("Zararlı işlem tespit edildi");
  },
  { connection: { host: "127.0.0.1", port: 6379 }, concurrency: 10 }
);