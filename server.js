import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "time-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.tool(
  "get_time",
  "Return the current server time",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: new Date().toString(),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);