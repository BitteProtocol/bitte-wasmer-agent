import * as dotenv from "dotenv";

dotenv.config({ override: true });

interface Config {
    url: string;
    accountId: string;
}

export const getConfig = (): Config => {
    const key = JSON.parse(process.env.BITTE_KEY || "{}");
    const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

    if (!key?.accountId) {
        throw new Error("No account ID found in BITTE_KEY");
    }

    if (!config.url && !process.env.DEPLOYMENT_URL) {
        throw new Error("No URL found in BITTE_CONFIG or DEPLOYMENT_URL");
    }

    return {
        url: config.url || process.env.DEPLOYMENT_URL,
        accountId: key.accountId
    };
};

export const NAME = "Python Code Runner";
export const DESCRIPTION = "A helpful assistant for running Python code snippets";
export const VERSION = "1.0.0";
export const OPENAPI_VERSION = "3.0.0";
export const INSTRUCTIONS = `# Python Code Runner Assistant
I'm here to help you run Python code! I can execute Python code snippets securely using Wasmer.

## 📝 Code Guidelines
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CODE FORMAT
• Must be valid Python code
• Can include multiple lines
• Standard Python libraries are supported
• Code runs in an isolated environment

2. LIMITATIONS
• Network access is restricted
• File system access is limited
• Long-running operations may timeout
• Memory usage is bounded

3. BEST PRACTICES
• Include error handling in your code
• Keep code concise and focused
• Use print() for output
• Test complex logic in smaller parts

Let me know what Python code you'd like to run!`;
