describe('File Reader', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('should display the file upload area', () => {
    cy.get('[data-testid="file-upload-area"]').should('exist');
  });

  it('should handle CSV file upload', () => {
    cy.fixture('example.csv').as('csvFile');
    cy.get('[data-testid="file-upload-input"]').selectFile('@csvFile', { force: true });
    cy.get('[data-testid="csv-table"]').should('be.visible');
  });

  it('should handle PDF file upload', () => {
    cy.fixture('example.pdf').as('pdfFile');
    cy.get('[data-testid="file-upload-input"]').selectFile('@pdfFile', { force: true });
    cy.get('[data-testid="pdf-viewer"]').should('be.visible');
  });

  it('should allow CSV editing', () => {
    cy.fixture('example.csv').as('csvFile');
    cy.get('[data-testid="file-upload-input"]').selectFile('@csvFile', { force: true });
    cy.get('[data-testid="csv-table-cell"]').first().dblclick().type('New Value{enter}');
    cy.get('[data-testid="csv-table-cell"]').first().should('contain', 'New Value');
  });

  it('should support pagination in CSV view', () => {
    cy.fixture('example.csv').as('csvFile');
    cy.get('[data-testid="file-upload-input"]').selectFile('@csvFile', { force: true });
    cy.get('[data-testid="next-page-button"]').click();
    cy.get('[data-testid="page-indicator"]').should('contain', 'Page 2');
  });
});
