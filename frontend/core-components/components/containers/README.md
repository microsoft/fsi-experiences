# Containers

_This directory contains all the middle-level components_

## Which component will fit as a container component?

-   It **is composed by** other atom components.
-   It is **NOT** a widget.

## How to create container component structure?

-   The component logic will reside under `containers\Component` folder.
-   All the logic, styles, enums, constants and tests which are specific to that atom component resided in the component folder.

### Naming conventions

-   Main component logic: `Component.tsx`
-   Styles: `Component.style.ts`
-   Enum (specific to this component): `Component.enum.ts`
-   Constant (specific to this component): `Component.const.ts`
-   Tests: `Component.test.ts`
-   Interfaces: `Component.interface.ts`

_Example_:

`Wizard` component is an Container component, since it is composed by `WizardStep`. Its folder structure should look as below:

```md
atoms
|\_Wizard
|**_Wizard.tsx
|_**Wizard.style.ts
|**_Wizard.interface.ts
|_**Wizard.test.ts
|**_Wizard.enum.ts
|_**Wizard.const.ts
```
