# CuDep: A Simple Dependency Resolver for CUDA and its buddies.

cudep-web is a simple web application that helps you resolve dependencies for CUDA and its buddies -- GPUs, drivers, libraries, etc.

[Try it now! 🚀](https://mashi6n.github.io/cudep-web/)

## Features

### Discover the right CUDA versions for your GPU and NVIDIA Driver

- Enter your GPU model and the NVIDIA driver version, and CuDep will tell you the compatible CUDA versions.

## To Do

- [ ] Add available versions of CUDA related library (e.g. torch, flash-attn, etc.) and docker image (e.g. nvidia/cuda, pytorch/pytorch, etc.).
- [ ] Add new feature which allows you to select CUDA, PyTorch version and get the compatible GPU and NVIDIA driver.
- [ ] Add ubuntu version compatibility for NVIDIA Driver.
- [ ] Add copy to clipboard button for the output (CUDA, docker image name, etc.).
- [ ] Add a rich search feature for the GPU list. (It should show `A100`, `A10`, `A16`, `AXX`, ... for query `A100`)
- [ ] Support shared link.
- Brush up the UI.
  - [x] Restrict GPU list length to show.
  - [x] Add mouse hover effect for the GPU list.
  - [ ] Add mouse hover effect for the CUDA version list. (Show popup with related information like docker image name, library compatibility, etc.)
  - [x] Change how CUDA list displayed. e.g. 2D list.
- [ ] SEO optimization.
- [ ] Add documents for version resolution logic and evidence.
- [ ] Support for vertical screens such as smartphones.

# For Developers

## Prerequisites

- Node.js (v23.5.0 or later)
- pnpm (10.9.0 or later)

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Fetch dependency data for CUDA. Following command will export json data to `public/dependency.json`.

```bash
pnpm gen
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to which is shown in the terminal (usually `http://localhost:5173`).

Please see `package.json` for more commands.

## Format, Lint and Type Check

```bash
pnpm fmt
pnpm lint
pnpm tsc:check
```

## Contributing

Contributions are **super** welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.
