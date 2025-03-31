# Components Folder

This folder contains reusable React components for the frontend of the project. Each component is designed to be modular, customizable, and easy to integrate into the application.

## Structure

The components are organized into subfolders, with each folder representing a specific component. Each component typically includes:

- **Component File**: The main React component (e.g., `Button.jsx`).
- **Styles File**: A corresponding styled-components file or CSS/SCSS file (e.g., `Button.styles.js`).
- **Tests (Optional)**: Unit tests for the component (e.g., `Button.test.js`).

## Usage

To use a component, import it into your desired file. For example:

```javascript
import Button from "./components/button/Button";

<Button
  label="Click Me"
  bgColor="blue"
  textColor="white"
  hoverBgColor="darkblue"
  hoverTextColor="black"
  padding="1rem 2rem"
/>;