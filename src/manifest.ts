import { NAME, DESCRIPTION, VERSION, OPENAPI_VERSION, INSTRUCTIONS } from "./config";
import { getConfig } from "./config";

const { url, accountId } = getConfig();

export const pluginData = () => ({
    openapi: OPENAPI_VERSION,
    info: {
        title: NAME,
        description: DESCRIPTION,
        version: VERSION,
    },
    servers: [
        {
            url,
        },
    ],
    "x-mb": {
        "account-id": accountId,
        assistant: {
            name: NAME,
            description: DESCRIPTION,
            instructions: INSTRUCTIONS,
        }
    },
    paths: {
        "/code": {
            get: {
                summary: "Execute Python code",
                operationId: "executePythonCode",
                description: "Execute Python code",
                parameters: [
                    {
                        name: "code",
                        in: "query",
                        description: "Python code to execute",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Successful execution",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean"
                                        },
                                        output: {
                                            type: "string",
                                            description: "The output of the code execution"
                                        },
                                        error: {
                                            type: "string",
                                            description: "Error message if execution failed"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})