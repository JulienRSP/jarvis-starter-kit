import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { generateCoachPDF, type CoachPDFData } from '@/lib/pdf/templates';
import { calculateAge, formatDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const evalId = searchParams.get('evalId');
  if (!evalId) return NextResponse.json({ error: 'evalId required' }, { status: 400 });

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Fetch all evaluation data
  const { data: evaluation } = await supabase
    .from('evaluations')
    .select('*, participants(*)')
    .eq('id', evalId)
    .eq('coach_id', user.id)
    .single();

  if (!evaluation) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const [{ data: m1 }, { data: m2 }, { data: m3 }, { data: m4 }, { data: m5 }, { data: m7 }, { data: m8 }] = await Promise.all([
    supabase.from('evaluation_m1').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m2').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m3').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m4').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m5').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m7').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m8').select('*').eq('evaluation_id', evalId).single(),
  ]);

  const p = evaluation.participants as any;

  const data: CoachPDFData = {
    participantName: `${p.first_name} ${p.last_name}`,
    age: calculateAge(p.date_of_birth),
    sex: p.sex,
    evalDate: formatDate(evaluation.created_at),
    profile: m7?.final_profile ?? evaluation.final_profile ?? 'P3',
    profileLabel: m7?.final_profile ? profileLabel(m7.final_profile) : 'Fragile Fonctionnel',
    safetyLevel: m2?.safety_level ?? 'GREEN',
    m4Score: m4?.total_score ?? null,
    fesScore: m3?.fes_total ?? null,
    m5Results: buildM5Results(m5),
    strengths: m7?.strengths ?? ['Motivation élevée'],
    vigilancePoints: m7?.vigilance_points ?? ['À évaluer'],
    redFlags: m7?.red_flags ?? [],
    programContent: m8?.program_content ?? '',
    safetyPoints: m8?.safety_points ?? '',
    homeAdvice: m8?.home_advice ?? '',
    coachName: user.email ?? 'Coach',
    evalId,
  };

  const html = generateCoachPDF(data);

  try {
    const chromium = await import('@sparticuz/chromium-min');
    const puppeteer = await import('puppeteer-core');

    const browser = await puppeteer.default.launch({
      args: chromium.default.args,
      defaultViewport: chromium.default.defaultViewport,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="SeniorFit-Coach-${evalId.slice(0, 8)}.pdf"`,
      },
    });
  } catch {
    // Fallback: return HTML for printing
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function profileLabel(p: string) {
  const map: Record<string, string> = {
    P1: 'Actif maintenu', P2: 'Déconditionné', P3: 'Fragile Fonctionnel',
    P4: 'Risque chute', P5: 'Vigilance médicale',
  };
  return map[p] ?? p;
}

function buildM5Results(m5: any) {
  if (!m5) return [];
  const results = [];
  if (m5.chair_stand_count != null) results.push({
    test: 'Chair Stand 30s', result: `${m5.chair_stand_count} reps`,
    norm: '10-15 (F 70-74)', level: m5.chair_stand_level ?? 'normal',
  });
  if (m5.tug_seconds != null) results.push({
    test: 'TUG', result: `${m5.tug_seconds} s`,
    norm: '<10 normal', level: m5.tug_level === 'alert' ? 'alert' : m5.tug_level ?? 'normal',
  });
  if (m5.semi_tandem_seconds != null) results.push({
    test: 'Équilibre semi-tandem', result: `${m5.semi_tandem_seconds} s`,
    norm: '>10 normal', level: m5.balance_level ?? 'normal',
  });
  if (m5.step_test_count != null) results.push({
    test: 'Step Test', result: `${m5.step_test_count} pas`,
    norm: '68-101', level: m5.step_test_level ?? 'normal',
  });
  if (m5.sit_reach_cm != null) results.push({
    test: 'Sit & Reach', result: `${m5.sit_reach_cm} cm`,
    norm: '-1 à 14', level: m5.sit_reach_level ?? 'normal',
  });
  if (m5.back_scratch_cm != null) results.push({
    test: 'Back Scratch', result: `${m5.back_scratch_cm} cm`,
    norm: '-9 à 4 (F)', level: m5.back_scratch_level ?? 'normal',
  });
  if (m5.gait_speed_ms != null) results.push({
    test: 'Vitesse marche 4m', result: `${m5.gait_speed_ms} m/s`,
    norm: '>0,8 m/s', level: m5.gait_speed_level ?? 'normal',
  });
  return results;
}
