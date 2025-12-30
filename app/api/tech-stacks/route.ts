import {cookies} from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return Response.json(
      {success: false, message: '인증 정보가 없습니다'},
      {status: 401}
    );
  }

  const {searchParams} = new URL(request.url);
  const keyword = searchParams.get('keyword');

  const response = await fetch(
    `${process.env.API_URL}/api/tech-stacks?keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return Response.json(data);
}
