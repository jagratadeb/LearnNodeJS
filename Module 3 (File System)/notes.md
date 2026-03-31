# Module 3 - File System Notes

## Overview
This module demonstrates how to use Node.js File System APIs through the built-in fs module.

## Imported Module
- fs: Used for creating, reading, appending, copying, deleting, and inspecting files.

## Synchronous vs Asynchronous Methods
- Synchronous methods (ending with Sync) block the event loop until the task completes.
- Asynchronous methods do not block execution and return results later via callback.

## Operations Covered in file.js

### 1. Write File
- writeFileSync(path, data): Writes content immediately (blocking).
- writeFile(path, data, callback): Writes content asynchronously (non-blocking).

### 2. Read File
- readFileSync(path, encoding): Returns file content directly.
- readFile(path, encoding, callback): Returns content in callback.
- Always handle errors in async callbacks.

### 3. Append Data
- appendFileSync(path, data): Adds content at the end of a file.
- Example use: Appending current date in DD-MM-YYYY format.

### 4. Copy File
- cpSync(source, destination): Copies file content from source to destination.

### 5. Delete File
- unlinkSync(path): Deletes a file permanently.

### 6. File Metadata (Stats)
- statSync(path): Returns stats object with size, timestamps, type details, etc.

## Important Learning
- Use async APIs in real servers to avoid blocking requests.
- Sync methods are useful for scripts, setup tasks, or quick demos.
- Prefer consistent error handling for reliability.
