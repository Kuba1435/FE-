import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.css'],
  standalone: true,
  imports: [CommonModule, PdfViewerModule]
})
export class FileLoaderComponent {
  isCSV = false;
  isPDF = false;
  pdfSrc: string | ArrayBuffer | null = null;
  csvHeaders: string[] = [];
  csvData: string[][] = [];
  currentPage = 1;
  readonly pageSize = 10;
  editingCell: { row: string[], index: number } | null = null;

  get hasNextPage(): boolean {
    return this.currentPage * this.pageSize < this.csvData.length;
  }

  async onFileSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.resetState();

    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      await this.handleCSV(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      await this.handlePDF(file);
    }
  }

  private async handleCSV(file: File): Promise<void> {
    const text = await file.text();
    const rows = text.split('\n').map(row => row.split(','));
    this.csvHeaders = rows[0];
    this.csvData = rows.slice(1);
    this.isCSV = true;
  }

  private async handlePDF(file: File): Promise<void> {
    this.pdfSrc = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsArrayBuffer(file);
    });
    this.isPDF = true;
  }

  getVisibleRows(): string[][] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.csvData.slice(start, end);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
    }
  }

  startEditing(event: MouseEvent, row: string[], index: number): void {
    this.editingCell = { row, index };
    // Focus the input element after rendering
    setTimeout(() => {
      const inputElement = (event.target as HTMLElement).querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    });
  }

  isEditing(row: string[], index: number): boolean {
    return this.editingCell?.row === row && this.editingCell?.index === index;
  }

  finishEditing(row: string[], index: number, newValue: string): void {
    row[index] = newValue;
    this.editingCell = null;
  }

  private resetState(): void {
    this.isCSV = false;
    this.isPDF = false;
    this.pdfSrc = null;
    this.csvHeaders = [];
    this.csvData = [];
    this.currentPage = 1;
    this.editingCell = null;
  }
}