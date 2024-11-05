import type { PackageManifest } from "@wasmer/sdk";

export const getWasmer = async () => {
    const { Wasmer, init } = await import("@wasmer/sdk/node");

    await init();
    return Wasmer;
}

export const runPythonWithManifest = async (code: string) => {

    console.log("Running Python code with manifest");
    console.log(code);
    try {
        const wasmer = await getWasmer();
        if (!wasmer) throw new Error("Wasmer not found");

        const manifest: PackageManifest = createPythonManifest(code);
        const pkg = await wasmer.createPackage(manifest);
        const instance = await pkg.commands.myCommand.run();
        const { stdout, stderr } = await instance.wait();
        
        if (stderr) {
            throw new Error(stderr);
        }
        
        return stdout;
    } catch (error) {
        return {
            error: true,
            message: error instanceof Error ? error.message : "An unknown error occurred"
        };
    }
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