import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NewEvaluationPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: evaluation, error } = await supabase
    .from('evaluations')
    .insert({
      participant_id: id,
      coach_id: user.id,
      status: 'draft',
      current_module: 1,
    })
    .select()
    .single();

  if (error || !evaluation) redirect('/dashboard');

  redirect(`/participants/${id}/evaluations/${evaluation.id}/m1`);
}
