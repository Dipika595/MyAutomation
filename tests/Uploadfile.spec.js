const ExcelJs = require('exceljs');
const {test,expect} =require("@playwright/test");

async function writeExcelTest(searhText,replaceText,change,filePath) {
   
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)

        const worksheet = workbook.getWorksheet("Sheet1")
        const output=await readExcel(worksheet,searhText);
       

        const cell=worksheet.getCell(output.row,output.column+change.colChange)
        cell.value=replaceText
        await workbook.xlsx.writeFile(filePath)
    

}

async function readExcel(worksheet,searhText){

    let output={row:-1,column:-1}
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            // console.log(cell.value)
            if(cell.value===searhText){
                // console.log(rowNumber)
                // console.log(colNumber)

                output.row=rowNumber;
                output.column=colNumber;
            }

        })
    })
    return output;
}

// writeExcelTest("Apple",350,{rowChange:0,colChange:2},"c://Users//User//OneDrive//Documents//ExcelDownloadTest.xlsx");

test("Upload download excel validations",async({page})=>{
    const textSearch="Apple"
    const updateValue="350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise=page.waitForEvent("download");
    await page.getByRole('button',{name:'Download'}).click();
    await downloadPromise;
    writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"c://Users//User//OneDrive//Documents//ExcelDownloadTest.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("c://Users//User//OneDrive//Documents//ExcelDownloadTest.xlsx")

    const textLocator=page.getByText(textSearch);
    const desiredRow=await page.getByRole('row').filter({has: textLocator})
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue)
    // await expect(desiredRow.locator("#cell-4-undefined")).toHaveValue(updateValue)
})