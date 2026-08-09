/**
 * The nine checks, exactly as `mcpscan list-checks` prints them on the
 * published 0.1.0. Values are transcribed from that output, not from any
 * document describing it.
 */
const CHECKS = [
  ["MCP-001", "Tool description prompt injection", "high", "prompt_anomaly", "MCP03"],
  ["MCP-002", "Tool definition drift", "high", "surface_drift", "MCP03"],
  ["MCP-010", "Dangerous capability exposure", "high", "other", "MCP02"],
  ["MCP-020", "Secret exposure in metadata", "critical", "credential_access", "MCP01"],
  ["MCP-021", "Sensitive data or file exposure", "high", "data_exposure", "MCP10"],
  ["MCP-030", "Command or code injection surface", "high", "shell_exec", "MCP05"],
  ["MCP-040", "Unauthenticated remote server", "high", "transport_security", "MCP07"],
  ["MCP-041", "Missing TLS", "high", "transport_security", "MCP07"],
  ["MCP-050", "Static known-name lookalike check", "medium", "identity_spoof", "MCP09"],
] as const;

export function ChecksTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <caption className="sr-only">
          The nine checks mcpscan 0.1.0 runs, with severity, capability and
          OWASP MCP class.
        </caption>
        <thead>
          <tr className="border-b-2 border-ink">
            <th scope="col" className="py-2 pr-4 text-left font-mono uppercase tracking-label text-grey-1">
              ID
            </th>
            <th scope="col" className="py-2 pr-4 text-left font-mono uppercase tracking-label text-grey-1">
              Title
            </th>
            <th scope="col" className="py-2 pr-4 text-left font-mono uppercase tracking-label text-grey-1">
              Severity
            </th>
            <th scope="col" className="py-2 pr-4 text-left font-mono uppercase tracking-label text-grey-1">
              Capability
            </th>
            <th scope="col" className="py-2 text-left font-mono uppercase tracking-label text-grey-1">
              OWASP
            </th>
          </tr>
        </thead>
        <tbody>
          {CHECKS.map(([id, title, severity, capability, owasp]) => (
            <tr key={id} className="border-b border-grey-3">
              <th scope="row" className="py-3 pr-4 text-left font-mono font-normal text-ink">
                {id}
              </th>
              <td className="py-3 pr-4 text-ink">{title}</td>
              <td className="py-3 pr-4 font-mono text-ink">{severity}</td>
              <td className="py-3 pr-4 font-mono text-ink">{capability}</td>
              <td className="py-3 font-mono text-ink">{owasp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
