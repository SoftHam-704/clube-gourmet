import XLSX from 'xlsx';

try {
    const workbook = XLSX.readFile('E:/Sistemas_ia/SalesMasters/data/cidades.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Pegar apenas as primeiras 5 linhas para ver o cabeçalho
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log('ESTRUTURA DO EXCEL:');
    console.log('Cabeçalho:', data[0]);
    console.log('Exemplo Linha 1:', data[1]);
} catch (e) {
    console.error('Erro ao ler Excel:', e.message);
}
