import { spawn } from "child_process";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {

  // start the MCP server process
  const serverProcess = spawn("node", ["server.js"], {
    stdio: ["pipe", "pipe", "inherit"]
  });

  const transport = new StdioClientTransport({
    stdin: serverProcess.stdin,
    stdout: serverProcess.stdout
  });

  const client = new Client(
    {
      name: "example-client",
      version: "1.0.0"
    },
    {
      capabilities: {}
    }
  );

  await client.connect(transport);

  console.log("Connected to MCP server");

  // list available tools
  const tools = await client.listTools();
  console.log("Available tools:", tools);

  // call tool
  const result = await client.callTool({
    name: "get_time",
    arguments: {}
  });

  console.log("Tool result:");
  console.log(result.content[0].text);

  process.exit(0);
}

main();