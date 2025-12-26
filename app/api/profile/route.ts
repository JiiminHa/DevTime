import {cookies} from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return Response.json(
      {success: false, message: '인증 정보가 없습니다'},
      {status: 401}
    );
  }

  const body = await request.json();

  const response = await fetch(`${process.env.API_URL}/api/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data);
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return Response.json(
      {success: false, message: '인증 정보가 없습니다'},
      {status: 401}
    );
  }

  const response = await fetch(`${process.env.API_URL}/api/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return Response.json(data);
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return Response.json(
      {success: false, message: '인증 정보가 없습니다'},
      {status: 401}
    );
  }

  const body = await request.json();

  const response = await fetch(`${process.env.API_URL}/api/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data);
}
