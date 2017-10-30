import { toBlob, toPng } from 'dom-to-image';
import { saveAs } from 'file-saver';
import PDF from 'jspdf';


const paper = {
  width: 8.27,
  height: 11.69,
};


export async function downloadAsPNG(node, title) {
  const blob = await toBlob(node);
  saveAs(blob, `${title}.png`);
}


export async function downloadAsPDF(nodes, title, onProgress) {
  const pdf = new PDF({ unit: 'in' });
  const paperWidth = paper.width;
  const paperHeight = paper.height;
  const imageWidth = nodes[0].clientWidth / 96;
  const imageHeight = nodes[0].clientHeight / 96;
  const columns = Math.floor(paperWidth / imageWidth);
  const rows = Math.floor(paperHeight / imageHeight);
  const cardsPerPage = columns * rows;
  const horizontalMargin = (paperWidth - (columns * imageWidth)) / 2;
  const verticalMargin = (paperHeight - (rows * imageHeight)) / 2;
  await Array.prototype.reduce.call(nodes, async (previous, node, index) => {
    await previous;
    if (index % cardsPerPage === 0 && index !== 0) {
      pdf.addPage();
    }
    const blob = await toPng(node);
    const column = index % columns;
    const row = Math.floor(index / columns) % rows;
    const x = horizontalMargin + (column * imageWidth);
    const y = verticalMargin + (row * imageHeight);
    pdf.addImage(blob, 'PNG', x, y, imageWidth, imageHeight);
    onProgress(index);
  }, null);
  pdf.save(`${title}.pdf`);
}
