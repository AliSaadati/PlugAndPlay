import { useCallback } from "react";
import xlsx from 'xlsx'


export default function useExportExcel(allRows = null) {

    const exportData = useCallback(() => {
        if (allRows.length && allRows.length > 0) {

            let keys = Object.keys(allRows[0])
            let urlColumns = []

            for (let i = 0; i < keys.length; i++) {
                if (keys[i].includes('URL')) {
                    urlColumns.push(i)
                }
            }

            for (let i = 0; i < allRows.length; i++) {
                urlColumns.forEach((colIndex) => {

                    if (allRows[i][keys[colIndex]] !== null && allRows[i][keys[colIndex]].trim() !== '')
                        allRows[i][keys[colIndex]] = {
                            f: 'HYPERLINK("' + allRows[i][keys[colIndex]] + '","' + allRows[i][keys[colIndex]] + '")',
                            t: 's',
                            v: allRows[i][keys[colIndex]]
                        }
                })
            }
            var newWB = xlsx.utils.book_new();
            var newWS = xlsx.utils.json_to_sheet(allRows);
            xlsx.utils.book_append_sheet(newWB, newWS, "New Data");

            xlsx.writeFile(newWB, "Ali-Plug-Play-Reporting.xlsx");
        }
    },
        [allRows]
    )


    return { exportData };
}