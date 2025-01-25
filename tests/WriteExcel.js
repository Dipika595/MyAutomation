const ExcelJs = require('exceljs');

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

writeExcelTest("Apple",350,{rowChange:0,colChange:2},"c://Users//User//OneDrive//Documents//ExcelDownloadTest.xlsx");
