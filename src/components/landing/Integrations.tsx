"use client";

const ROW1 = [
  {name:'Cambridge',bg:'#a31f34'},{name:'British Council',bg:'#003366'},{name:'IDP',bg:'#ef4135'},
  {name:'Oxford',bg:'#002147'},{name:'Pearson',bg:'#003057'},{name:'Grammarly',bg:'#11ac6a'},
  {name:'Anki',bg:'#242424'},{name:'Quizlet',bg:'#4257b2'},{name:'Notion',bg:'#000'},
  {name:'DeepL',bg:'#002e3b'},{name:'Otter.ai',bg:'#00a3e0'},{name:'Hemingway',bg:'#f1c40f'},
];

const ROW2 = [
  {name:'Slack',bg:'#611f69'},{name:'Discord',bg:'#5865f2'},{name:'Zoom',bg:'#2d8cff'},
  {name:'Google Drive',bg:'#4285f4'},{name:'OneDrive',bg:'#0078d4'},{name:'Evernote',bg:'#00a82d'},
  {name:'Zotero',bg:'#cc0000'},{name:'Mendeley',bg:'#9d162e'},{name:'ChatGPT',bg:'#10a37f'},
  {name:'Claude',bg:'#d97757'},{name:'Perplexity',bg:'#191919'},{name:'WolframAlpha',bg:'#da0e0e'},
];

export default function LandingIntegrations() {
  return (
    <section id="integrations">
      <div className="int-header-wrap landing-container fade">
        <div className="label" style={{justifyContent:'center'}}>Resources</div>
        <h2 className="int-h">Works with the tools<br/>you already use.</h2>
        <p className="int-sub">Connect your favorite study resources and AI tools in minutes.</p>
      </div>
      <div className="int-row-wrap">
        <div className="int-marquee">
          {[...ROW1, ...ROW1, ...ROW1].map((it, i) => (
            <div key={i} className="int-pill">
              <div className="int-ico" style={{background:it.bg}}>{it.name[0]}</div>
              {it.name}
            </div>
          ))}
        </div>
        <div className="int-marquee rev">
          {[...ROW2, ...ROW2, ...ROW2].map((it, i) => (
            <div key={i} className="int-pill">
              <div className="int-ico" style={{background:it.bg}}>{it.name[0]}</div>
              {it.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
