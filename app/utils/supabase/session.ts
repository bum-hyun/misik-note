import { serverClient } from '~/utils/supabase/server';

export async function getUserFromRequest(request: Request) {
  const response = new Response(); // 쿠키 갱신용 (사용 안 할 수도 있음)
  const supabase = serverClient(request, response);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Supabase Auth Error:', error.message);
    return null;
  }

  return user;
}
