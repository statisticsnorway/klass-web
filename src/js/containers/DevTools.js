import { createDevTools } from "@redux-devtools/core";
import { DockMonitor } from "@redux-devtools/dock-monitor";

// Monitors are separate packages, and you can make a custom one
import { LogMonitor } from "@redux-devtools/log-monitor";
import React from "react";

// createDevTools takes a monitor and produces a DevTools component
export default createDevTools(
	<DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
		<LogMonitor theme="nicinabox" />
	</DockMonitor>,
);
