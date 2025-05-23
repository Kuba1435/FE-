## File Reader Application (Angular)

A file reader application built with Angular that supports PDF and CSV file formats with editing capabilities.  
The user is first prompted to log in – without logging in, they will not be able to access the application.  
When uploading files for viewing, they can choose between drag and drop or selecting a file from the file manager.  
The application only supports PDF and CSV file types.

---

### Features

- **Angular Project Setup**
  - Creation of the Angular project and installation of necessary dependencies

- **Login System**
  - A simple login window secured with `AuthGuard` to prevent unauthorized access
  - Login state is stored in `LocalStorage`

- **File Upload and Display**
  - A modal window appears when a file is uploaded to ensure a modern and clear display
  - Only `.pdf` and `.csv` files are allowed
  - If an unsupported file type is uploaded, an error message is shown

- **PDF Handling**
  - If a PDF is uploaded, it is read using the `FileReader` method, which converts the file data into a `dataURL`, and then rendered in the modal window using the `ng2-pdf-viewer` library

- **CSV Handling**
  - If a CSV file is uploaded, it is read as plain text using the `FileReader` method
  - The first row is used as the table header
  - The remaining rows are parsed into objects and rendered into a table using `<td><input></td>` elements to allow inline editing

- **Pagination for Large Files**
  - If the CSV has many rows, pagination is used in the modal window
  - Only 100 rows are rendered per page to optimize performance
  - Navigation loads the next set of 100 rows (e.g., 101–201, etc.)

- **Row Management**
  - Users can add an empty row at the end of the table via a button

- **Saving Files**
  - Users can save the modified file back to their computer



## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later
- Docker (optional)

### Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
ng serve
```


### Docker Deployment

1. Build the image:
```bash
docker build -t file-reader .
```

2. Run the container:
```bash
docker run -p 8080:80 file-reader
```

## Mobile Support

The application is optimized for mobile devices with:
- Responsive layout
- Touch-friendly controls
- Mobile-specific UI adjustments

## Testing

End-to-end tests are implemented using Cypress. Run them with:
```bash
npx cypress run
```

## Project Structure

```
src/
├── app/
│   ├── home/           # Main file reader component
│   ├── login/          # Login component 
│   ├── shared          # Shared components and services
├── assets/             # Static assets
```



