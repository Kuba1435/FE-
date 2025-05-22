// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Useful command for file upload testing
Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
  return cy.get(selector).then(subject => {
    return cy.fixture(fileUrl, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileUrl, { type });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        return subject;
    });
  });
});

// Command to check if an element is visible and contains text
Cypress.Commands.add('containsAndVisible', (selector, text) => {
  return cy.get(selector).should('be.visible').and('contain', text);
});

// Command to wait for Angular to be ready
Cypress.Commands.add('waitForAngular', () => {
  cy.window().should('have.property', 'ng');
  return cy.window().its('ng').should('exist');
});
