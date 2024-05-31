import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = ({data, title, Year}) => {
    const doc = new jsPDF();

    doc.setTextColor("#000000");
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20);
    doc.text(title, 105, 15, { align: "center" });
  
    doc.setTextColor("#000000");
    autoTable(doc, {
      headStyles: { fillColor: "#ED5077" },
      head: [["Rank", "Name", "Milk Amount (ml)"]],
      body: data,
    //   body: data.map(({ barangay, milkAmount }) => [barangay, milkAmount]),
      startY: 40, // Adjust startY value to leave space for the title
    });
  
    // Check if the PDF is generated correctly
    console.log(doc.output("datauristring")); // Log the PDF data URI
  
    // Set the file name using the title
    doc.save(`${title.toLowerCase().replace(/\s/g, "_")}.pdf`);
};