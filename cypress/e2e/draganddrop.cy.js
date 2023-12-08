describe('drag and drop a file', () => {

    it('should drag and drop a file', () => {
       const file = "C:/Users/epsi/Desktop/Vannaly/Module6/Code/Cypress/cypress/fixtures/Capture_ecran.png"

       cy.visit('https://css-tricks.com/examples/DragAndDropFileUploading/?submit-on-demand')

       cy.get('form').selectFile(file, { action: 'drag-drop' })
       cy.get('button[type="submit"]').click() 
    })
    

})
