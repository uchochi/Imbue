import { createServer } from 'node:http';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = process.env.PORT || 3001;

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
let supabase;
if (supabaseUrl && supabaseKey) supabase = createClient(supabaseUrl, supabaseKey);

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

function json(res, s, d) {
  res.writeHead(s, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
  res.end(JSON.stringify(d));
}

function readBody(req) {
  return new Promise(r => { let b = ''; req.on('data', c => b += c); req.on('end', () => r(b ? JSON.parse(b) : {})); });
}

function serveFile(res, p) {
  const fp = join(DIST, p);
  if (existsSync(fp) && statSync(fp).isFile()) {
    const ext = extname(fp);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(readFileSync(fp));
    return true;
  }
  return false;
}

function spa(res) {
  const fp = join(DIST, 'index.html');
  if (existsSync(fp)) { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(readFileSync(fp)); }
  else { res.writeHead(500); res.end('Build not found.'); }
}

const f = r => ({ id: r.id, title: r.title, department: r.department, location: r.location, type: r.type, salaryRange: r.salary_range, description: r.description, requirements: r.requirements||[], responsibilities: r.responsibilities||[], howToApply: r.how_to_apply, applyLink: r.apply_link||'', status: r.status, createdAt: r.created_at, updatedAt: r.updated_at });

createServer(async (req, res) => {
  const { method, url } = req;
  const p = url.split('?')[0];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  try {
    if (p === '/api/jobs') {
      if (method === 'GET') {
        const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
        return error ? json(res, 500, { error: error.message }) : json(res, 200, (data||[]).map(f));
      }
      if (method === 'POST') {
        const d = await readBody(req);
        const { data, error } = await supabase.from('jobs').insert({
          title: d.title, department: d.department, location: d.location,
          type: d.type, salary_range: d.salaryRange||d.salary_range,
          description: d.description, requirements: d.requirements||[], responsibilities: d.responsibilities||[],
          how_to_apply: d.howToApply||d.how_to_apply, apply_link: d.applyLink||d.apply_link||'',
          status: d.status||'open',
        }).select().single();
        return error ? json(res, 500, { error: error.message }) : json(res, 201, f(data));
      }
    }

    const m = p.match(/^\/api\/jobs\/([^/]+)$/);
    if (m) {
      if (method === 'GET') {
        const { data, error } = await supabase.from('jobs').select('*').eq('id', m[1]).maybeSingle();
        return (error||!data) ? json(res, 404, { error: 'Not found' }) : json(res, 200, f(data));
      }
      if (method === 'PUT') {
        const d = await readBody(req);
        const r = {};
        if (d.title!==undefined) r.title = d.title;
        if (d.department!==undefined) r.department = d.department;
        if (d.location!==undefined) r.location = d.location;
        if (d.type!==undefined) r.type = d.type;
        if (d.salaryRange!==undefined) r.salary_range = d.salaryRange;
        if (d.description!==undefined) r.description = d.description;
        if (d.requirements!==undefined) r.requirements = d.requirements;
        if (d.responsibilities!==undefined) r.responsibilities = d.responsibilities;
        if (d.howToApply!==undefined) r.how_to_apply = d.howToApply;
        if (d.applyLink!==undefined) r.apply_link = d.applyLink;
        if (d.status!==undefined) r.status = d.status;
        if (d.salary_range!==undefined) r.salary_range = d.salary_range;
        if (d.how_to_apply!==undefined) r.how_to_apply = d.how_to_apply;
        if (d.apply_link!==undefined) r.apply_link = d.apply_link;
        r.updated_at = new Date().toISOString();
        const { data, error } = await supabase.from('jobs').update(r).eq('id', m[1]).select().single();
        return error ? json(res, 404, { error: 'Not found' }) : json(res, 200, f(data));
      }
      if (method === 'DELETE') {
        const { data: o, error: e } = await supabase.from('jobs').select('*').eq('id', m[1]).maybeSingle();
        if (e||!o) return json(res, 404, { error: 'Not found' });
        await supabase.from('jobs').delete().eq('id', m[1]);
        return json(res, 200, { ok: true });
      }
    }
  } catch (e) { return json(res, 500, { error: e.message }); }

  if (p !== '/' && serveFile(res, p)) return;
  spa(res);
}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
