import { createClient } from '@supabase/supabase-js';
const URL = process.env.VITE_SUPABASE_URL;
const sKey = process.env.VITE_SUPABASE_ANON_KEY;

let supabase;
if (URL && sKey) {
  supabase || (supabase = createClient(URL, sKey));
}

const f = r => ({ id: r.id, title: r.title, department: r.department, location: r.location, type: r.type, salaryRange: r.salary_range, description: r.description, requirements: r.requirements||[], responsibilities: r.responsibilities||[], howToApply: r.how_to_apply, applyLink: r.apply_link||'', status: r.status, createdAt: r.created_at, updatedAt: r.updated_at });

function json(res, status, data) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.status(status).json(data);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (!supabase) {
    return json(res, 500, { error: 'Supabase not configured: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars required' });
  }

  const slug = req.query.slug || [];
  const id = slug.length > 1 ? slug[1] : null;

  try {
    if (!id) {
      if (req.method === 'GET') {
        const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
        if (error) return json(res, 500, { error: error.message });
        return json(res, 200, (data || []).map(f));
      }
      if (req.method === 'POST') {
        const d = req.body;
        const { data, error } = await supabase.from('jobs').insert({
          title: d.title, department: d.department, location: d.location,
          type: d.type, salary_range: d.salaryRange || d.salary_range,
          description: d.description, requirements: d.requirements || [],
          responsibilities: d.responsibilities || [],
          how_to_apply: d.howToApply || d.how_to_apply,
          apply_link: d.applyLink || d.apply_link || '',
          status: d.status || 'open',
        }).select().single();
        if (error) return json(res, 500, { error: error.message });
        return json(res, 201, f(data));
      }
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase.from('jobs').select('*').eq('id', id).maybeSingle();
      if (error || !data) return json(res, 404, { error: 'Not found' });
      return json(res, 200, f(data));
    }

    if (req.method === 'PUT') {
      const d = req.body;
      const r = {};
      if (d.title !== undefined) r.title = d.title;
      if (d.department !== undefined) r.department = d.department;
      if (d.location !== undefined) r.location = d.location;
      if (d.type !== undefined) r.type = d.type;
      if (d.salaryRange !== undefined) r.salary_range = d.salaryRange;
      if (d.description !== undefined) r.description = d.description;
      if (d.requirements !== undefined) r.requirements = d.requirements;
      if (d.responsibilities !== undefined) r.responsibilities = d.responsibilities;
      if (d.howToApply !== undefined) r.how_to_apply = d.howToApply;
      if (d.applyLink !== undefined) r.apply_link = d.applyLink;
      if (d.status !== undefined) r.status = d.status;
      if (d.salary_range !== undefined) r.salary_range = d.salary_range;
      if (d.how_to_apply !== undefined) r.how_to_apply = d.how_to_apply;
      if (d.apply_link !== undefined) r.apply_link = d.apply_link;
      r.updated_at = new Date().toISOString();
      const { data, error } = await supabase.from('jobs').update(r).eq('id', id).select().single();
      if (error) return json(res, 404, { error: 'Not found' });
      return json(res, 200, f(data));
    }

    if (req.method === 'DELETE') {
      const { data: old, error: errOld } = await supabase.from('jobs').select('*').eq('id', id).maybeSingle();
      if (errOld || !old) return json(res, 404, { error: 'Not found' });
      await supabase.from('jobs').delete().eq('id', id);
      return json(res, 200, { ok: true });
    }

    return res.status(405).json({ error: 'Not allowed' });
  } catch (e) {
    return json(res, 500, { error: e.message });
  }
}
