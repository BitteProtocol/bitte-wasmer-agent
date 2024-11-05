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
        console.log("Wasmer found");
        console.log(wasmer);
        if (!wasmer) throw new Error("Wasmer not found");

        const manifest: PackageManifest = createPythonManifest(code);
        console.log("Manifest created");
        console.log(manifest);
        const pkg = await wasmer.createPackage(manifest);
        console.log("Package created");
        console.log(pkg);
        const instance = await pkg.commands.myCommand.run();
        console.log("Instance created");
        console.log(instance);
        console.log("Waiting for instance to complete...");
        const { stdout, stderr } = await instance.wait();
        console.log("Instance completed");
        console.log("stdout:", stdout);
        console.log("stderr:", stderr);
        
        if (stderr) {
            console.log("Error detected in stderr");
            throw new Error(stderr);
        }
        
        console.log("Returning stdout");
        return stdout;
    } catch (error) {
        console.log("Caught error:", error);
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