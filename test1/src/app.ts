import { createClient } from "redis";
import inquirer from "inquirer";

const publisher = createClient({ url: "redis://localhost:6379" });
const subscriber = createClient({ url: "redis://localhost:6379" });
const subscriber2 = createClient({ url: "redis://localhost:6379" });
const subscriber3 = createClient({ url: "redis://localhost:6379" });
const subscriber4 = createClient({ url: "redis://localhost:6379" });

await publisher.connect();
await subscriber.connect();
await subscriber2.connect();
await subscriber3.connect();
await subscriber4.connect();

if (publisher.isOpen)
    console.log("Publisher Sunucu bağlantısı başarılı");
else
    console.log("Publisher Sunucuya bağlanırken bir hata oluştu");

if (subscriber.isOpen)
    console.log("Subscriber Sunucu bağlantısı başarılı");
else
    console.log("Subscriber Sunucuya bağlanırken bir hata oluştu");

const channels : string[]= ["deneme","test","selam","admin","user"];

await subscriber.subscribe("deneme", (message, channel) => {
    console.log(`subscriber - ${channel} - adlı kanaldan gelen mesaj : ${message}`);
})

await subscriber2.subscribe(channels[2], (message, channel) => {
    console.log(`subscriber2 - ${channel} - adlı kanaldan gelen mesaj : ${message}`);
})

await subscriber3.subscribe(channels.slice(0,3), (message, channel) => {
    console.log(`subscriber3 - ${channel} - adlı kanaldan gelen mesaj : ${message}`);
})

await subscriber4.subscribe(channels[4], (message, channel) => {
    console.log(`subscriber4 - ${channel} - adlı kanaldan gelen mesaj : ${message}`);
})


while (true) {
    console.log("------------------------------");
    const answers = await inquirer.prompt([
        {
            type: "input",     
            name: "channel",      
            message: "Kanal Adı giriniz?",  
        },
        {
            type: "input",         
            name: "message",      
            message: "Mesajını yazınız?",  
        }
    ]);
    publisher.publish(answers.channel, answers.message);
}
