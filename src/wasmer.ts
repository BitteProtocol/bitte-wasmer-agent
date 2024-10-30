import type { PackageManifest } from "@wasmer/sdk";

export const getWasmer = async () => {
    const { Wasmer, init } = await import("@wasmer/sdk/node");

    await init();
    return Wasmer;
}

export const runPythonWithManifest = async (code: string) => {
    const wasmer = await getWasmer();
    if (!wasmer) throw new Error("Wasmer not found");

    const manifest: PackageManifest = createPythonManifest(code);
    const pkg = await wasmer.createPackage(manifest);
    const instance = await pkg.commands.myCommand.run();
    const { stdout } = await instance.wait();
    return stdout;
}

const createPythonManifest = (code: string): PackageManifest => ({
    command: [{
        module: "wasmer/python:python",
        name: "myCommand",
        runner: "https://webc.org/runner/wasi",
        annotations: {
            wasi: {
                "main-args": ["/app/myapp.py"],
            },
        },
    }],
    dependencies: {
        "wasmer/python": "3.12.5+build.7",
    },
    fs: {
        app: {
            "myapp.py": code,
        },
    },
});