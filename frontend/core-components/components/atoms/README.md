# Atoms

_This directory contains all the lowest-level component_

## Which component will fit as an atom component?

-   It is **NOT** depending on any other atom components.
-   It is used for composing other container and widget components.

## How to create atom component structure?

-   The component logic will reside under `atoms\Component` folder.
-   All the logic, styles, enums, constants and tests which are specific to that atom component resided in the component folder.

### Naming conventions

-   Main component logic: `Component.tsx`
-   Styles: `Component.style.ts`
-   Enum (specific to this component): `Component.enum.ts`
-   Constant (specific to this component): `Component.const.ts`
-   Tests: `Component.test.ts`
-   Interfaces: `Component.interface.ts`

_Example_:

`DatePicker` component is an Atom component. Its folder structure should look as below:

```
atoms
|_DatePicker
|___DatePicker.tsx
|___DatePicker.style.ts
|___DatePicker.interface.ts
|___DatePicker.test.ts
|___DatePicker.enum.ts
|___DatePicker.const.ts
```
