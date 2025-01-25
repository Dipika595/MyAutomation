const ExcelJs = require('exceljs');

async function excelTest() {
    let output={row:-1,column:-1}
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("c://Users//User//OneDrive//Documents//ExcelDownloadTest.xlsx")

        const worksheet = workbook.getWorksheet("Sheet1")
        worksheet.eachRow((row, rowNumber) => {

            row.eachCell((cell, colNumber) => {

                // console.log(cell.value)
                if(cell.value==="Apple"){
                    // console.log(rowNumber)
                    // console.log(colNumber)

                    output.row=rowNumber;
                    output.column=colNumber;
                }

            })
        })

        const cell=worksheet.getCell(output.row,output.column)
        cell.value="Iphone"
        await workbook.xlsx.writeFile("c://Users//User//OneDrive//Documents//ExcelDownloadTest.xlsx")
    

}

excelTest();
