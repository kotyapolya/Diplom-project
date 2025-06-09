// Этот код выполняется на сервере — CORS не мешает
export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch('https://openapi.keycrm.app/v1/buyer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer NThjZWZiMzRlYjJhNDBjODcxZmFjODY1ZDljYjRlZTQxZDkwNDk2NQ',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}
