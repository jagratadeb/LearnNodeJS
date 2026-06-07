# Module 13 — Server Side Rendering with EJS — Revision Notes

Purpose: concise reference for key concepts, code patterns, and common commands used in this module (URL shortener with EJS, Express, Mongoose).

---

## Project structure (important files)

- `index.js` — app entry, Express setup, route wiring, redirect handler
- `connect.js` — MongoDB connection helper
- `controllers/url.js` — controller logic: create, list, delete
- `routes/url.js` — URL creation route
- `routes/delete.js` — delete route (POST)
- `routes/staticRouter.js` — renders `home.ejs` with URL list
- `models/url.js` — Mongoose schema/model for short URLs
- `views/home.ejs` — EJS template for UI

---

## Quick start / run

```bash
cd "Module 13 (Server Side Rendering with EJS)"
npm install
node index.js
# open http://localhost:8000/
```

If using nodemon:

```bash
npx nodemon index.js
```

---

## Express basics used

Setup:

```js
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

Routes wiring example:

```js
const urlRoute = require('./routes/url');
const deleteRoute = require('./routes/delete');
const staticRoute = require('./routes/staticRouter');

app.use('/', staticRoute); // renders home view
app.use('/url', urlRoute);  // create short URL (POST /url)
app.use('/delete', deleteRoute); // delete short URL (POST /delete)

// redirect handler (GET /:shortId)
app.use('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: Date.now() } } });
  if (!entry || !entry.redirectUrl) return res.status(404).send('Short URL not found');
  return res.redirect(entry.redirectUrl);
});
```

File: [Module 13 (Server Side Rendering with EJS)/index.js](./index.js)

Notes:
- Use `express.urlencoded()` to parse HTML form POSTs.
- Use `res.render('home', { urls })` to pass data to EJS templates.

---

## Mongoose model (`models/url.js`)

Schema essentials:

```js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  redirectUrl: { type: String, required: true },
  visitHistory: [ { timestamp: { type: Date, default: Date.now } } ],
}, { timestamps: true });

module.exports = mongoose.model('URL', urlSchema);
```

File: [Module 13 (Server Side Rendering with EJS)/models/url.js](./models/url.js)

Common operations:
- Create: `await URL.create({ shortId, redirectUrl, visitHistory: [] })`
- Find all: `await URL.find().sort({ createdAt: -1 })`
- Find one & delete: `await URL.findOneAndDelete({ shortId })`
- Find one & update: `await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: Date.now() } } })`

---

## Controller patterns (`controllers/url.js`)

Create new short URL:

```js
const { nanoid } = require('nanoid');
const shortId = nanoid(8);
const created = await URL.create({ shortId, redirectUrl: url, visitHistory: [] });
return res.status(201).render('home', { id: shortId });
```

Get all (render or return HTML):

```js
const urls = await URL.find().sort({ createdAt: -1 });
return res.render('home', { urls });
```

Delete handler (supports browser forms and API callers):

```js
async function deleteUrl(req, res) {
  const { shortId } = req.body || {};
  if (!shortId) return res.status(400).json({ error: 'Missing shortId' });
  const deletedUrl = await URL.findOneAndDelete({ shortId });
  if (!deletedUrl) {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(404).json({ error: 'URL not found' });
    }
    return res.redirect('/');
  }
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({ message: 'URL deleted successfully' });
  }
  return res.redirect('/');
}
```

File: [Module 13 (Server Side Rendering with EJS)/controllers/url.js](./controllers/url.js

Notes:
- Use JSON responses for API requests; use redirects or `res.render()` for browser flows.
- Check `req.headers.accept` to differentiate client types.

---

## EJS template notes (`views/home.ejs`)

Pass variables from `res.render('home', { urls, id, deleteMessage })`.

Conditionals and locals:

```ejs
<% if (locals.id) { %>
  <p>URL Generated: http://localhost:8000/<%= id %></p>
<% } %>
```

File: [Module 13 (Server Side Rendering with EJS)/views/home.ejs](./views/home.ejs)

Looping over arrays:

```ejs
<% if (locals.urls && locals.urls.length > 0) { %>
  <% locals.urls.forEach(url => { %>
    <tr>
      <td><%= url.shortId %></td>
      <td><a href="<%= url.redirectUrl %>"><%= url.redirectUrl %></a></td>
    </tr>
  <% }) %>
<% } %>
```

Forms (HTML -> Express):

```html
<form method="POST" action="/url">
  <input type="text" name="url" placeholder="https://example.com">
  <button type="submit">Generate</button>
</form>

<!-- Delete form -->
<form method="POST" action="/delete">
  <input type="hidden" name="shortId" value="SOMEID">
  <button type="submit">Delete</button>
</form>
```

Important: HTML forms only support GET and POST. To send DELETE/PUT from forms, use JavaScript (fetch/AJAX) or method-override middleware.

---

## Useful curl examples (API-style)

Create (if API expects JSON):

```bash
curl -X POST http://localhost:8000/url \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

Delete (JSON API):

```bash
curl -X POST http://localhost:8000/delete \
  -H "Content-Type: application/json" \
  -d '{"shortId":"abc12345"}'
```

Delete (form submission via curl):

```bash
curl -X POST http://localhost:8000/delete \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'shortId=abc12345'
```

---

## Debugging checklist

- If new short URLs are missing: ensure MongoDB is running and `connect.js` URL is correct.
- Unique index failure when creating duplicate `shortId` — catch errors and regenerate `nanoid()`.
- If redirect returns 404: check `/:shortId` route ordering (it should be after other specific routes) and verify DB document exists.
- If forms don't send body: ensure `app.use(express.urlencoded({ extended: false }))` is present.
- If JSON API returns HTML or vice versa: check `req.headers.accept` and how you render/redirect in controller.

---

## Common syntaxes & patterns to remember

- EJS interpolation: `<%= variable %>` (escaped), `<%- variable %>` (unescaped)
- EJS scriptlet: `<% if (cond) { %> ... <% } %>`
- Express render: `res.render('viewName', { key: value })`
- Redirect: `res.redirect('/path')`
- Mongoose create: `Model.create(obj)`
- Mongoose findOneAndDelete: `Model.findOneAndDelete({ field: value })`
- Mongoose findOneAndUpdate with $push: `Model.findOneAndUpdate({ q }, { $push: { arr: newVal } })`
- Generate id: `const { nanoid } = require('nanoid'); const id = nanoid(8);`

---

## Testing / manual flow to verify delete behavior

1. Start server: `node index.js`
2. Open home page: `http://localhost:8000/`
3. Create a new short URL using the form; note the generated shortId shown on page.
4. Confirm it appears in the table.
5. Click the table Delete button (POST form) — the server will redirect back to `/`.
6. Verify the entry is gone and visiting `http://localhost:8000/<shortId>` returns 404.
7. Optionally test API delete with `curl` JSON request.

---

## Extra tips

- Keep the redirect route (`/:shortId`) last so it doesn't shadow other routes.
- Use `console.error` in catch blocks to get stack traces in the terminal.
- Consider adding flash messages (connect-flash) or query params to show user-friendly success messages after redirects.

---

If you want, I can also add a short README or playbook with one-click commands to run a create+delete test automatically and report results.

---

## Reference code files

The following example/reference files contain the code snippets shown in these notes. Use them as quick-start examples or copy them into your project for experimentation.

- [Module 13 (Server Side Rendering with EJS)/index.js](./index.js)
- [Module 13 (Server Side Rendering with EJS)/models/url.js](./models/url.js)
- [Module 13 (Server Side Rendering with EJS)/controllers/url.js](./controllers/url.js)
- [Module 13 (Server Side Rendering with EJS)/routes/url.js](./routes/url.js)
- [Module 13 (Server Side Rendering with EJS)/routes/delete.js](./routes/delete.js)
- [Module 13 (Server Side Rendering with EJS)/routes/staticRouter.js](./routes/staticRouter.js)
- [Module 13 (Server Side Rendering with EJS)/connect.js](./connect.js)
- [Module 13 (Server Side Rendering with EJS)/views/home.ejs](./views/home.ejs)

