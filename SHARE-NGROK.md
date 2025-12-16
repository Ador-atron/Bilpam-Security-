# Share Your Bilpam Shield Website with ngrok

This guide walks you through setting up a public shareable link for your website using **ngrok**.

## Step 1: Install ngrok (one-time)

Visit [ngrok.com](https://ngrok.com) and download for Windows, or use Chocolatey:

```powershell
choco install ngrok
```

If you don't have Chocolatey, install it first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iex "& { $(irm https://community.chocolatey.org/install.ps1) }"
```

## Step 2: Start the Local Server

Open **PowerShell** and run:

```powershell
Set-Location -Path "C:\Users\home\Desktop\DemoWeb"
node server.js
```

You should see:
```
Server running at http://localhost:8000
Press Ctrl+C to stop the server.
```

## Step 3: Create an ngrok Tunnel

Open a **new PowerShell window** and run:

```powershell
ngrok http 8000
```

You'll see output like:
```
Forwarding    https://abc123-def456.ngrok.io -> http://localhost:8000
```

## Step 4: Share the Link

Copy the **https** URL (e.g., `https://abc123-def456.ngrok.io`) and send it to anyone. They can visit it on any device (phone, tablet, desktop) from anywhere in the world.

**Note:** The link is active only while ngrok is running. When you stop ngrok, the link expires.

## Quick Reference

- **Local preview**: `http://localhost:8000`
- **Public link**: `https://[generated-id].ngrok.io`
- **Stop server**: Press `Ctrl+C` in the PowerShell window running `node server.js`
- **Stop ngrok**: Press `Ctrl+C` in the PowerShell window running `ngrok http 8000`

## Tips

- Free ngrok accounts get a new URL each session. For a static URL, upgrade your ngrok account.
- The tunnel is HTTPS by default (secure).
- Test on mobile before sharing by opening the ngrok URL in your phone's browser.

Enjoy sharing your site!
