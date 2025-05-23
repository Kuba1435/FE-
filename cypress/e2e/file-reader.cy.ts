describe('File Reader', () => {
  beforeEach(() => {
    cy.log('Přihlašuji uživatele a přecházím na /home');
    cy.visit('/');
    cy.get('form').within(() => {
      cy.get('input').first().type('test');
      cy.root().submit();
    });
    cy.visit('/home');
  });

  it('should handle all CSV features in one flow', () => {
    cy.log('Nahrávám CSV soubor');
    cy.fixture('example.csv').as('csvFile');
    cy.get('[data-testid="file-upload-input"]').selectFile('@csvFile', { force: true });
    cy.wait(500);
    cy.log('Ověřuji zobrazení CSV modalu a tabulky');
    cy.get('[data-testid="csv-modal"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="csv-table"]', { timeout: 10000 }).should('be.visible');
    cy.log('Edituji první buňku v CSV tabulce');
    cy.get('[data-testid="csv-table-cell"] input', { timeout: 10000 }).first().clear({ force: true }).type('New Value', { force: true });
    cy.get('[data-testid="csv-table-cell"] input', { timeout: 10000 }).first().should('have.value', 'New Value');
    cy.log('Testuji stránkování v CSV tabulce');
    cy.get('[data-testid="next-page-button"]', { timeout: 10000 }).click();
    cy.get('[data-testid="page-indicator"]', { timeout: 10000 }).should('contain', 'Page 2');
  });

  it('should handle PDF file upload', () => {
    cy.log('Zavírám CSV modal (pokud je otevřený) a nahrávám PDF soubor');
    cy.get('body').then($body => {
      if ($body.find('[data-testid="csv-modal"]').length) {
        cy.get('[data-testid="csv-modal"] .close-button').click();
      }
    });
    cy.fixture('example.pdf').as('pdfFile');
    cy.get('[data-testid="file-upload-input"]').selectFile('@pdfFile', { force: true });
    cy.log('Ověřuji zobrazení PDF vieweru');
    cy.get('[data-testid="pdf-viewer"]', { timeout: 10000 }).should('be.visible');
  });
});
