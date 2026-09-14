# ChatBuddy

A small Gemini-powered chat app with a Flask backend and browser frontend.

## Run locally

1. Create or activate the virtual environment.
2. Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

3. Set `GEMINI_API_KEY` in `.env`.
4. Start the app:

```powershell
python app.py
```

Open `http://localhost:5000`.

## Deploy

Use a Python service with this start command:

```text
gunicorn app:app
```

Set `GEMINI_API_KEY` as a platform environment variable. Do not commit `.env` or paste the key into frontend code. `GEMINI_MODEL` is optional and defaults to `gemini-3.6-flash`.
