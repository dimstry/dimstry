// Tulis ulang bagian Featured Projects di README.md (di antara penanda PROJECTS:START/END)
// dari data proyek unggulan di website portofolio.
import { readFileSync, writeFileSync } from "node:fs";

const url = process.env.PROJECTS_URL ?? "https://dims-dev.vercel.app/projects.json";
const res = await fetch(url);
if (!res.ok) throw new Error(`${url} → ${res.status}`);
const projects = await res.json();

const md = projects
  .map((p) =>
    [
      `### [${p.title}](${p.url}) — ${p.subtitle}`,
      "",
      p.meta,
      "",
      ...p.points.map((x) => `- ${x}`),
      "",
      p.tech.map((t) => `\`${t}\``).join(" "),
    ].join("\n"),
  )
  .join("\n\n");

const readme = readFileSync("README.md", "utf8");
if (!readme.includes("<!-- PROJECTS:START -->")) throw new Error("Penanda <!-- PROJECTS:START --> tidak ada di README.md");
writeFileSync("README.md", readme.replace(/(<!-- PROJECTS:START -->)[\s\S]*?(<!-- PROJECTS:END -->)/, `$1\n\n${md}\n\n$2`));
console.log(`${projects.length} proyek ditulis ke README.md`);
