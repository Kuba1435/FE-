import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

interface CsvRow {
  [key: string]: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, PdfViewerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  fileType: 'none' | 'csv' | 'pdf' | 'unsupported' = 'none';
  csvData: CsvRow[] = [];
  displayedRows: CsvRow[] = [];
  pdfSrc: string | null = null;
  unsupportedFileName = '';
  scale: number = 1;
  showCsvModal: boolean = false;
  csvHeaders: string[] = [];
  
  // Pagination parameters
  pageSize = 100;
  currentPage = 0;
  totalPages = 0;

  editingCell: { row: any, header: string } | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.calculateScale();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateScale();
  }

  calculateScale() {
    const width = window.innerWidth;
    if (width <= 300) {
      this.scale = 0.4;
    } else if (width <= 500) {
      this.scale = 0.5;
    } else if (width >= 1200) {
      this.scale = 1;
    } else {
      this.scale = 0.5 + (width - 500) * 0.5 / 700;
    }
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.handleFile(file);
  }

  handleFile(file: File) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv') {
      this.showCsvModal = true;
      const reader = new FileReader();
      reader.onload = () => {
        this.ngZone.run(() => {
          try {
            const text = reader.result as string;
            const rows = text.trim().split('\n');
            if (rows.length > 0) {
              // Parse headers from the first row
              this.csvHeaders = rows[0].split(',').map(header => header.trim());
              
              // Parse data rows into objects
              this.csvData = rows.slice(1).map(row => {
                const values = row.split(',').map(cell => cell.trim());
                const rowData: CsvRow = {};
                this.csvHeaders.forEach((header, index) => {
                  rowData[header] = values[index] || '';
                });
                return rowData;
              });
              
              if (this.csvData.length === 0) {
                this.initializeEmptyCSV();
              }
              
              // Initialize pagination
              this.totalPages = Math.ceil(this.csvData.length / this.pageSize);
              this.currentPage = 0;
              this.updateDisplayedData();
              
              this.fileType = 'csv';
            } else {
              this.initializeEmptyCSV();
            }
          } catch (error) {
            console.error('Error processing CSV:', error);
            this.initializeEmptyCSV();
          }
        });
      };
      reader.onerror = () => {
        console.error('Error reading file');
        this.initializeEmptyCSV();
      };
      reader.readAsText(file);
    } else if (ext === 'pdf') {
      this.fileType = 'pdf';
      const reader = new FileReader();
      reader.onload = () => {
        this.pdfSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.fileType = 'unsupported';
      this.unsupportedFileName = file.name;
    }
  }

  private initializeEmptyCSV() {
    this.csvHeaders = ['Column 1'];
    const emptyRow: CsvRow = { 'Column 1': '' };
    this.csvData = [emptyRow];
    this.displayedRows = this.csvData;
    this.fileType = 'csv';
    this.showCsvModal = true;
    this.totalPages = 1;
    this.currentPage = 0;
  }

  updateDisplayedData() {
    const start = this.currentPage * this.pageSize;
    const end = Math.min(start + this.pageSize, this.csvData.length);
    this.displayedRows = this.csvData.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updateDisplayedData();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedData();
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  closeModal() {
    this.fileType = 'none';
    this.showCsvModal = false;
    this.csvData = [];
    this.pdfSrc = null;
  }

  closeCsvModal() {
    this.showCsvModal = false;
    this.csvData = [];
    this.displayedRows = [];
    this.csvHeaders = [];
  }

  onCellEdit() {
    // This method is called when a cell is edited
    // You can add validation or other logic here
  }

  removeRow(index: number) {
    this.csvData.splice(index, 1);
    this.totalPages = Math.ceil(this.csvData.length / this.pageSize);
    // Adjust current page if we removed the last row on the last page
    if (this.currentPage >= this.totalPages) {
      this.currentPage = Math.max(0, this.totalPages - 1);
    }
    this.updateDisplayedData();
  }

  addRow() {
    const newRow: CsvRow = {};
    this.csvHeaders.forEach(header => {
      newRow[header] = '';
    });
    this.csvData.push(newRow);
    this.totalPages = Math.ceil(this.csvData.length / this.pageSize);
    this.updateDisplayedData();
  }

  saveChanges() {
    try {
      // Convert data back to CSV format
      const csvRows = [
        this.csvHeaders.join(','),
        ...this.csvData.map(row => 
          this.csvHeaders.map(header => row[header]).join(',')
        )
      ];
      const csv = csvRows.join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  }

  // Helper methods for template
  getDisplayedRowRange(): string {
    const start = this.currentPage * this.pageSize + 1;
    const end = Math.min((this.currentPage + 1) * this.pageSize, this.csvData.length);
    return `${start}-${end}`;
  }

  getTotalRows(): number {
    return this.csvData.length;
  }

  startEditing(row: any, header: string) {
    this.editingCell = { row, header };
  }

  isEditing(row: any, header: string) {
    return this.editingCell && this.editingCell.row === row && this.editingCell.header === header;
  }

  finishEditing(row: any, header: string) {
    this.editingCell = null;
    this.onCellEdit();
  }
}
