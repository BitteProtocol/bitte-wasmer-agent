# Python Code Runner Bitte Agent

A Bitte agent that provides secure Python code execution using Wasmer sandboxing technology. This agent allows running Python code snippets in an isolated environment with restricted access to system resources.

## Features

- Secure Python code execution in Wasmer sandbox
- Network access restrictions
- Limited file system access 
- Memory usage bounds
- Standard Python library support

## Installation

To install dependencies:

```bash
bun install
```

## Running the agent

To run the agent:

```bash
bun run dev:make-agent
``` 

To run the server:

```bash
bun run dev:server
``` 