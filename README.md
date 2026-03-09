# SikritPad

SikritPad is a small browser-based encrypted notepad built as a learning project for the Web Crypto API.

All encryption happens in the browser, and notes are stored locally using LocalStorage.
The goal of this project is to experiment with client-side cryptography and build a modular JavaScript architecture.

![Demo](demo.gif)

## Key Features

- Client-side encryption using the Web Crypto API
- Notes stored locally in the browser (LocalStorage)
- Password-based key derivation with PBKDF2
- AES-GCM authenticated encryption

## Architecture Overview

The project follows a modular design pattern to ensure maintainability and testability.
The codebase is organized into specialized modules, each with a single responsibility.

### 1. State Management (`src/app/state.js`)
A simple centralized state object used to keep track of the current note,
derived keys, and application status.

Sensitive data such as encryption keys can be cleared from memory when needed.

### 2. Cryptographic Layer (`src/crypto/crypto.js`)
This module abstracts the complexity of the Web Crypto API. It handles:
- Key Derivation: Using PBKDF2 (SHA-256) with 200,000 iterations and a static salt to derive both a 128-bit Note ID and a 256-bit AES key.
- Encryption/Decryption: Implementing AES-GCM with a unique 128-bit Initialization Vector (IV) for every save operation to prevent replay attacks and pattern analysis.

### 3. Storage Abstraction (`src/storage/storage.js`)
A clean wrapper around the LocalStorage API. By decoupling storage from the core logic,
the application remains flexible for future migrations to other storage engines like IndexedDB or cloud-based providers.

### 4. UI Logic (`src/ui/ui.js`)
Handles all DOM manipulations and event bindings. It follows a "passive view" pattern,
where the UI does not contain business logic;
instead, it delegates actions to the application controller and updates its state based on the provided data.

### 5. Application Orchestrator (`src/app/app.js`)
Acts as the controller that wires the UI, Crypto, and Storage modules together.
it manages the high-level application flow, such as handling password submission and note persistence.

## Security Implementation

### Key Derivation Flow
1. User enters a password.
2. The password is fed into PBKDF2 with 200,000 iterations.
3. The resulting 384-bit output is split:
   - The first 128 bits are encoded as Base64 to serve as the Note ID (the key in LocalStorage).
   - The remaining 256 bits are used as the AES-GCM encryption key.

### Data Persistence
Notes are stored as JSON blobs containing:
- `iv`: A unique array of bytes for that specific save.
- `data`: The encrypted ciphertext.

This ensures that identical notes still produce different ciphertext.

## Tech Stack

- JavaScript: ES Modules (ESM) for modern dependency management.
- Web Crypto API: Native browser support for high-performance cryptography.
- CSS: Custom utility-based styling for a responsive and lightweight interface.
- HTML5: Semantic markup for accessibility.

## Running Locally

Clone the repository and open `index.html` in your browser.
No build step or server is required.

## License

MIT License - see [LICENSE](./LICENSE) file for details
