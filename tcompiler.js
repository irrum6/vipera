// template compiler
const fs = require("fs");
const fsAsync = require("fs").promises;

let dir1 = "./components";
let tplnames = [`${dir1}/colorbox`, `${dir1}/radiobox`, `${dir1}/gwindow`];

async function main() {

    let indexFilename = "index3.html";
    let outputFilename = "index.html";

    let tplcompiled = "";

    for (const tplname of tplnames) {
        let filename = `${tplname}.html`;
        let tplcontent = await fsAsync.readFile(filename);
        tplcompiled = tplcompiled + tplcontent;
    }

    //is buffer
    let indexFileContent = await fsAsync.readFile(indexFilename);

    indexFileContent = indexFileContent.toString();

    let replacePattern = "<replace-content></replace-content>";

    let compiledContent = indexFileContent.replace(replacePattern, tplcompiled);

    await fsAsync.writeFile(outputFilename, compiledContent);
}

main();