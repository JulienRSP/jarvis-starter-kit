import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { generateClientPDF, type ClientPDFData } from '@/lib/pdf/templates';
import { formatDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const evalId = searchParams.get('evalId');
  if (!evalId) return NextResponse.json({ error: 'evalId required' }, { status: 400 });

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: evaluation } = await supabase
    .from('evaluations')
    .select('*, participants(*)')
    .eq('id', evalId)
    .eq('coach_id', user.id)
    .single();

  if (!evaluation) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const [{ data: m1 }, { data: m7 }, { data: m8 }] = await Promise.all([
    supabase.from('evaluation_m1').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m7').select('*').eq('evaluation_id', evalId).single(),
    supabase.from('evaluation_m8').select('*').eq('evaluation_id', evalId).single(),
  ]);

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const p = evaluation.participants as any;

  const data: ClientPDFData = {
    participantFirstName: p.first_name,
    coachName: profile?.full_name ?? user.email ?? 'Votre coach',
    coachEmail: user.email ?? '',
    evalDate: formatDate(evaluation.created_at),
    clientGoal: m1?.client_goal ?? '',
    strengths: m7?.strengths ?? ['Votre motivation est un vrai atout pour progresser.'],
    frequency: m8?.frequency_per_week ?? '2×/semaine',
    programSummary: m8?.program_content?.split('\n').slice(0, 6).join('\n') ?? '',
    homeAdvice: m8?.home_advice ?? '',
  };

  const html = generateClientPDF(data);

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

    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="SeniorFit-Client-${evalId.slice(0, 8)}.pdf"`,
      },
    });
  } catch {
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
