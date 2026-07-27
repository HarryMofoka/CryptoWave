export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Error</title>
  <style>
    body { background: #060606; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .wrap { text-align: center; max-width: 420px; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p { color: rgba(255,255,255,0.6); }
    a { color: #f6b03c; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Something went wrong</h1>
    <p>Please try refreshing the page or <a href="/">go home</a>.</p>
  </div>
</body>
</html>`;
}
