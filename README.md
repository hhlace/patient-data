This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Separation of Concerns with Classes:

Patient and Patients Classes: The Patient class models the structure of an individual patient, while the Patients class manages an array of patient objects. This separation allows the business logic related to patient management (adding, editing, fetching) to be encapsulated within the Patients class. This design adheres to the principles of Object-Oriented Programming, enhancing modularity and maintainability.
Plain Object Conversion: The classes are used to model and encapsulate patient behavior, but plain objects are passed between server and client components to meet Next.js’s serialization requirements.
CSS/SCSS for Styling: SCSS was chosen to manage styles in a structured way while leveraging nesting and other Sass features. This approach provides flexibility and scalability for more complex styling requirements.

## State Management:

Local State for Simplicity: Given the project’s requirements, local state within the container component (PatientsContainer) was chosen to manage patient data. This approach keeps the code simple and performant for smaller-scale applications.
Option for Future Scaling: While the current implementation uses local state, the project design leaves room for potential refactoring into a global state management solution (like Redux or Zustand) if the app’s complexity grows in the future.
Libraries and Tools Used
Next.js: Used as the primary framework for its server-side rendering, dynamic routing, and support for static site generation. Its new /app directory and server components feature offer a clean architecture for server-side data fetching.

TypeScript: Employed to ensure type safety and improve code reliability. This helps catch errors at compile time and enhances development speed with better autocompletion and type inference.

SCSS: Chosen for styling due to its powerful features like nesting, variables, and mixins, making CSS easier to organize and maintain.

React Icons: Used to display icons in a consistent and scalable manner. The react-icons library provides a wide range of icons that are easy to customize and lightweight.

## Future Considerations

Persistent Storage: For larger-scale applications or those requiring data persistence, integrating a database and an API backend would be a logical next step.
Global State Management: If the application grows or requires more complex interactions between components, adopting a state management library like Zustand or Redux would improve scalability and state consistency.
Accessibility Improvements: Additional ARIA labels and focus management can be added to ensure that the application meets accessibility standards.
