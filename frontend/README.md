# FSI Frontend workspace
A workspace which holds all the frontend libraries, apps, and controls


# Prereqs
- Need to have **pnpm** installed (https://pnpm.io/installation) For Windows use:
  ```
   (Invoke-WebRequest 'https://get.pnpm.io/v6.16.js' -UseBasicParsing).Content | node - add --global pnpm 
   ```

# Packages 
- [`core-components`](./core-components#readme)
- [`pcf-common`](./pcf-common#readme)
- [`pcf-controls`](./pcf-controls#readme) (parent folder of all pcf controls)
- [`portals`](./portals#readme) (parent folder of all react portals)

# Command 
- [Create a new component](./scripts/create-component#readme) from boilerplate
  ```
  pnpm component
  ```
- Delete node modules from all packages
  ```
  pnpm clean-modules
  ```
- Install only libs dependencies (core-components and pcf-common)
  ```
  pnpm install-libs
  ```
- Build only libs (core-components and pcf-common)
  ```
  pnpm build-libs
  ```
- Install all PCFs dependencies
  ```
  pnpm install-all-pcf
  ```
- Build all PCFs and their dependencies in release mode (and in parallel) 
  ```
  pnpm build-all-pcf
  ```
- Start single PCF and it's dependencies in watch mode
  ```
  pnpm start-pcf --pcf=PCF_FOLDER_NAME
  ```
- Start single PCF using wizard to select PCF
  ```
  pnpm start-pcf-wizard
  ```  