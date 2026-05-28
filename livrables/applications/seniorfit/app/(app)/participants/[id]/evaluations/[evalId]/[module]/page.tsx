import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import type { ModuleSlug } from '@/lib/types';
import { MODULE_ORDER } from '@/lib/types';
import M1Form from '@/components/modules/M1Form';
import M2Form from '@/components/modules/M2Form';
import M3Form from '@/components/modules/M3Form';
import M4Form from '@/components/modules/M4Form';
import M5Form from '@/components/modules/M5Form';
import M6Form from '@/components/modules/M6Form';
import M7Form from '@/components/modules/M7Form';
import M8Form from '@/components/modules/M8Form';
import M9Form from '@/components/modules/M9Form';

interface Props {
  params: Promise<{ id: string; evalId: string; module: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { id, evalId, module: moduleSlug } = await params;

  if (!MODULE_ORDER.includes(moduleSlug as ModuleSlug)) notFound();

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch participant
  const { data: participant } = await supabase
    .from('participants')
    .select('id, first_name, last_name, date_of_birth, sex')
    .eq('id', id)
    .single();

  if (!participant) notFound();

  // Fetch evaluation
  const { data: evaluation } = await supabase
    .from('evaluations')
    .select('*')
    .eq('id', evalId)
    .single();

  if (!evaluation) notFound();

  const fullName = `${participant.first_name} ${participant.last_name}`;
  const slug = moduleSlug as ModuleSlug;

  const commonProps = {
    participantId: id,
    evalId,
    fullName,
    sex: participant.sex,
  };

  switch (slug) {
    case 'm1': return <M1Form {...commonProps} />;
    case 'm2': return <M2Form {...commonProps} />;
    case 'm3': return <M3Form {...commonProps} />;
    case 'm4': return <M4Form {...commonProps} />;
    case 'm5': return <M5Form {...commonProps} sex={participant.sex} />;
    case 'm6': return <M6Form {...commonProps} />;
    case 'm7': return <M7Form {...commonProps} />;
    case 'm8': return <M8Form {...commonProps} />;
    case 'm9': return <M9Form {...commonProps} />;
    default: notFound();
  }
}
