import fse from 'fs-extra';

export const fileWrite = async (message : string) => {
    await fse.createFile("message.txt");
    await fse.appendFile("message.txt",message,{encoding:'utf-8'});
}

