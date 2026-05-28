import { createServerClient } from '@/lib/supabase/server';
import { DashboardClient } from './DashboardClient';
import { calculateAge } from '@/lib/utils';

export default async function DashboardPage() {
  const supabase = await createServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: participants } = await supabase
    .from('participants')
    .select(`
      id, first_name, last_name, date_of_birth, sex, email, created_at,
      evaluations(id, status, final_profile, created_at, completed_at)
    `)
    .eq('coach_id', user!.id)
    .order('created_at', { ascending: false });

  const coachInitials = user?.email?.charAt(0).toUpperCase() ?? 'C';

  const enriched = (participants ?? []).map(p => {
    const evals = (p.evaluations as any[]) ?? [];
    const lastEval = evals.sort((a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
    return {
      ...p,
      age: calculateAge(p.date_of_birth),
      lastEvalDate: lastEval?.created_at ?? null,
      lastProfile: lastEval?.final_profile ?? null,
      lastEvalId: lastEval?.id ?? null,
    };
  });

  return <DashboardClient participants={enriched} coachInitials={coachInitials} />;
}
