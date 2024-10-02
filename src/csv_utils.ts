
import { json2csv } from 'json-2-csv';

function downloadFile(content: string, fileName: string, contentType: string) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

export function downloadCSV(filename: string, data: object[]) {
    const s = json2csv(data);

    downloadFile(s, filename, "text/csv");
}

