# Google Calendar MCP setup

VC Brain is configured to use the `@cocal/google-calendar-mcp` server locally through VS Code's MCP support. The MCP server gives the AI calendar tools such as free/busy lookup, event creation, update, and cancellation.

## One-time Google setup

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project.
2. Enable the **Google Calendar API**.
3. Configure the OAuth consent screen and add yourself as a test user.
4. Create an OAuth client ID of type **Desktop app**.
5. Download the OAuth JSON file and save it locally as:

   ```text
   .secrets/google-oauth-desktop.json
   ```

   This directory is ignored by Git. Do not commit or paste the contents of this file into chat.

## Authenticate once

After saving the file, restart VS Code or reload MCP servers. Ask the calendar MCP server to authenticate with Google Calendar. It will open a Google consent page in your browser; approve the requested Calendar access with the intended Google account.

The server stores its local OAuth token after you approve access. If your Google OAuth app remains in test mode, Google may require re-authorization after seven days.

## Tools to use

Use the MCP server only for narrow calendar operations:

- List calendars
- Check free/busy availability
- Create an event only after a founder confirms a slot
- Update or cancel an event

For the VC Brain workflow, use free/busy data to propose times without exposing the names or details of existing calendar events.

## Important

This local MCP setup makes calendar tools available to your AI environment. It does not by itself grant the deployed web app permission to create calendar events. The web app must later use a backend MCP bridge or direct Google OAuth connection with the same approval and policy checks.