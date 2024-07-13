# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# User Manual

## Firebase Installation

If you already have an online Firebase database connection, you can skip this step.

## Organizer Section

Upon visiting the main URL, you will have the option to either create an account (not yet implemented) or log in to an existing account in the template database. A test account is pre-configured with the following credentials:
- Email: admin1@mail.com
- Password: test

Once logged in, you can view and modify the test event, including adding NFTs, sponsors, and participants, or create a new event (not yet implemented).

## User Section

By scanning the QR code of the event or a sponsor for the first time, you can enter your email and the unique code received to validate that you are a participant in this event. A test account is pre-configured in the template database with the following credentials:
- Email: participant1@mail.com
- Password: test

After validation, you can connect your wallet. Your next login can be done with it. Note that you must be logged in to access internal event pages. On the event or sponsor page, you are free to retrieve free NFTs, bid on exclusives, etc. A QR code scanner is integrated on each page. You also have your profile tab to view all event NFTs and determine which ones you need to complete your collection 😉

You can also share your progress and acquired NFTs on social networks like Farcaster (not yet implemented).
