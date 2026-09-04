import{a as e,i as t,n,r,t as i}from"./vafVCnXX.js";import{n as a}from"./CNF1Z5jn.js";var o=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),s=`4790820`,c=`https://store.steampowered.com/app/${s}/`;`${s}`,`${s}`;function l(e){let t=Number(e);if(!Number.isFinite(t)||t<=0)return``;let n=Math.round(t/60);return n<1?`<1 hr`:`${n.toLocaleString(`en-US`)} ${n===1?`hr`:`hrs`}`}var u=`checkpoint64/checkpoint64`,d=`https://github.com/${u}/releases`,f=`https://api.github.com/repos/${u}/releases?per_page=1`,p=[{key:`windows`,label:`WINDOWS`,prefer:[/\.msi$/i,/\.exe$/i],placeholderHint:`.msi`},{key:`macos-arm`,label:`MACOS · APPLE SILICON`,prefer:[/(?:^|[-_.])(aarch64|arm64|apple[-_]silicon)(?=[-_.]).*\.(dmg|pkg)$/i],placeholderHint:`.dmg · arm64`},{key:`linux`,label:`LINUX`,prefer:[/\.AppImage$/i,/\.deb$/i,/\.rpm$/i],placeholderHint:`.deb / .rpm`}];function m(e){if(!e||!Array.isArray(e.assets))return null;let t={};for(let n of p){let r=null;for(let t of n.prefer)if(r=e.assets.find(e=>t.test(e.name)),r)break;r&&(t[n.key]={url:r.browser_download_url,size:r.size,name:r.name})}return{tag:e.tag_name||``,name:e.name||``,url:e.html_url||d,publishedAt:e.published_at||``,platforms:t}}async function h(e=globalThis.fetch){if(typeof e!=`function`)return null;try{let t=await e(f,{headers:{Accept:`application/vnd.github+json`}});if(!t.ok)return null;let n=await t.json();return m(Array.isArray(n)?n[0]:n)}catch{return null}}function g(e){return!e||e<0?``:e<1024*1024?`${Math.max(1,Math.round(e/1024))} KB`:`${(e/(1024*1024)).toFixed(1)} MB`}function _(e){if(!e)return``;let t=e.match(/\.(tar\.gz|tar\.bz2)$/i);if(t)return t[1].toLowerCase();let n=e.lastIndexOf(`.`);return n>=0?e.slice(n+1).toLowerCase():``}var v=`https://checkpoint64.com`,y=`${v}/#organization`,b=(e,t,n)=>({"@type":`ContactPoint`,contactType:e,email:t,...n?{url:n}:{},availableLanguage:[`English`]});function x({description:e}={}){return{"@type":`Organization`,"@id":y,name:`Checkpoint64`,alternateName:`Checkpoint 64`,url:`${v}/`,logo:{"@type":`ImageObject`,url:`${v}/retro_save_icon.svg`},description:e,email:`support@checkpoint64.com`,founder:{"@type":`Person`,name:`Adam Meadows`},address:{"@type":`PostalAddress`,addressCountry:`GB`},contactPoint:[b(`customer service`,`support@checkpoint64.com`,`${v}/contact/`),b(`technical support`,`support@checkpoint64.com`,`${v}/contact/`),b(`press`,`press@checkpoint64.com`,`${v}/press/`),b(`privacy`,`privacy@checkpoint64.com`,`${v}/privacy/`),b(`security`,`security@checkpoint64.com`,`${v}/contact/`),b(`legal`,`legal@checkpoint64.com`,`${v}/terms/`)],sameAs:[`https://discord.gg/kxeYwuuHEn`,`https://github.com/${u.split(`/`)[0]}`,c]}}var S=`https://checkpoint64.com`,C=`game save backup, cloud save sync, save file versioning, rollback save game, minecraft world backup, modded minecraft save backup, stardew valley save sync, skyrim save backup, palworld save backup, valheim world backup, factorio save backup, satisfactory save backup, elden ring save backup, project zomboid save backup, enshrouded save backup, co-op save sharing, dedicated server alternative, emulator save sync, retroarch save backup, save state history, PC game save cloud, automatic save backup, game save manager, game progress backup, save game transfer, cloud save manager`,w=`G-Z6QH00W8CG`,T=`    <script src="https://analytics.ahrefs.com/analytics.js" data-key="n2SnzJRiCEhdWzHYmrw/Yg" async><\/script>

    <!-- Google Analytics (GA4) — consent-gated, see CookieBanner.svelte -->
    <script>
        (function () {
            var loaded = false;
            window.cp64LoadGA = function () {
                if (loaded) return;
                loaded = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${w}';
                document.head.appendChild(s);
                window.dataLayer = window.dataLayer || [];
                window.gtag = function () { window.dataLayer.push(arguments); };
                window.gtag('js', new Date());
                window.gtag('config', '${w}');
            };
            try {
                if (localStorage.getItem('cp64-consent') === 'granted') window.cp64LoadGA();
            } catch (e) { /* storage blocked — stay opted out */ }
        })();
    <\/script>`,E=`    <script>
        (function () {
            try {
                if (location.pathname !== '/') return;
                if (localStorage.getItem('cp64-lang')) return;
                if (/bot|crawl|spider|slurp|bingpreview/i.test(navigator.userAgent || '')) return;
                var supported = ${JSON.stringify(n)};
                var langs = (navigator.languages && navigator.languages.length)
                    ? navigator.languages : [navigator.language || ''];
                for (var i = 0; i < langs.length; i++) {
                    var code = String(langs[i]).slice(0, 2).toLowerCase();
                    if (code === 'en') return;
                    if (supported.indexOf(code) !== -1) { location.replace('./' + code + '/'); return; }
                }
            } catch (e) { /* leave on the English page */ }
        })();
    <\/script>`,D=`    <script>
        (function () {
            try {
                var saved = localStorage.getItem('cp64-theme');
                var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
            } catch (e) { /* localStorage blocked — fall through to default dark theme */
            }
        })();
    <\/script>`;function O(t=``){return[...i.map(n=>`    <link rel="alternate" hreflang="${n.code}" href="${S}${e(n.code,t)}"/>`),`    <link rel="alternate" hreflang="x-default" href="${S}${e(`en`,t)}"/>`].join(`
`)}function k(e=`en`){let n=t(e);return`${a(120,`EUR`,n.intl)}–${a(240,`EUR`,n.intl)}${n.t.money.aYear}`}var A=`1.0`;function j({code:e,t,version:n}){let r=t.jsonld,i=y,a=`${S}/#website`,o=`${S}/#software`;return P([{"@context":`https://schema.org`,...x({description:r.orgDescription})},{"@context":`https://schema.org`,"@type":`WebSite`,"@id":a,name:`Checkpoint64`,url:`${S}/`,inLanguage:e,publisher:{"@id":i},about:{"@id":o}},{"@context":`https://schema.org`,"@type":`SoftwareApplication`,"@id":o,name:`Checkpoint64`,alternateName:`Checkpoint 64`,applicationCategory:`UtilitiesApplication`,applicationSubCategory:`Backup Software`,operatingSystem:`Windows, macOS, Linux`,url:`${S}/`,description:r.softwareDescription,image:`${S}/og-image.png`,softwareVersion:n,downloadUrl:`${S}/download/`,isAccessibleForFree:!0,sameAs:[c,`https://github.com/${u}`],publisher:{"@id":i},offers:{"@type":`Offer`,price:`0`,priceCurrency:`USD`,availability:`https://schema.org/InStock`,url:`${S}/pricing/`},featureList:r.featureList}])}function M(n=`en`){let r=t(n),i=r.t.jsonld,a=`${S}${e(r.code,`how-it-works`)}`;return{"@context":`https://schema.org`,"@type":`HowTo`,name:i.howToName,description:i.howToDescription,totalTime:`PT2M`,supply:i.howToSupply.map(e=>({"@type":`HowToSupply`,name:e})),tool:[{"@type":`HowToTool`,name:i.howToTool}],step:i.howToSteps.map((e,t)=>({"@type":`HowToStep`,position:t+1,name:e.name,text:e.text,url:a}))}}function N(e=`en`){let n=t(e),i=k(e);return n.t.jsonld.faq.map(e=>({q:e.q,a:r(e.a,i)}))}function P(e){return e.filter(Boolean).map(e=>`    <script type="application/ld+json">\n${JSON.stringify(e,null,8).replace(/^/gm,`    `)}\n    <\/script>`).join(`
`)}function F({slug:t=``,code:n,ogLocale:r,prefix:i,includeAnalytics:a,includeLangRedirect:s=!1,title:c,description:l,ogTitle:u,ogDescription:d,ogImageAlt:f,twitterTitle:p,twitterDescription:m,twitterImageAlt:h,jsonLd:g=``}){let _=`${S}${e(n,t)}`;return`    <meta name="msvalidate.01" content="91385F5B3EAE099308DBAAF85B0EF115"/>
${a?`${T}\n`:``}    <title>${o(c)}</title>
    <meta name="description" content="${o(l)}"/>
    <meta name="keywords" content="${o(C)}"/>
    <meta name="author" content="Checkpoint64"/>
    <meta name="publisher" content="Checkpoint64"/>
    <meta name="application-name" content="Checkpoint64"/>
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
    <meta name="googlebot" content="index, follow"/>
    <meta name="bingbot" content="index, follow"/>
    <meta name="referrer" content="strict-origin-when-cross-origin"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="theme-color" content="#f5efe1" media="(prefers-color-scheme: light)"/>
    <meta name="theme-color" content="#1a1814" media="(prefers-color-scheme: dark)"/>
    <meta name="color-scheme" content="light dark"/>
    <link rel="canonical" href="${_}"/>
${O(t)}
${s?`${E}\n`:``}${D}
    <link rel="icon" type="image/svg+xml" href="${i}retro_save_icon.svg"/>
    <link rel="alternate icon" href="${i}retro_save_icon.svg"/>
    <link rel="mask-icon" href="${i}retro_save_icon.svg" color="#ff5f4e"/>
    <link rel="apple-touch-icon" href="${i}retro_save_icon.svg"/>
    <link rel="alternate" type="application/rss+xml" title="Checkpoint64 Logbook" href="${i}rss.xml"/>
    <meta name="apple-mobile-web-app-title" content="Checkpoint64"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Checkpoint64"/>
    <meta property="og:title" content="${o(u)}"/>
    <meta property="og:description" content="${o(d)}"/>
    <meta property="og:url" content="${_}"/>
    <meta property="og:image" content="${S}/og-image.png"/>
    <meta property="og:image:type" content="image/png"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:alt" content="${o(f)}"/>
    <meta property="og:locale" content="${r}"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${o(p)}"/>
    <meta name="twitter:description" content="${o(m)}"/>
    <meta name="twitter:image" content="${S}/og-image.png"/>
    <meta name="twitter:image:alt" content="${o(h)}"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=Caveat&family=JetBrains+Mono:wght@400;500;700&display=swap" onload="this.onload=null;this.rel='stylesheet'"/>
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=Caveat&family=JetBrains+Mono:wght@400;500;700&display=swap"/></noscript>
${g}`}function I({locale:e=`en`,includeAnalytics:n=!0,releaseTag:r=null}={}){let i=t(e),a=i.t,o=String(r||``).replace(/^v/,``)||A;return F({slug:``,code:i.code,ogLocale:i.ogLocale,prefix:i.code===`en`?`./`:`../`,includeAnalytics:n,includeLangRedirect:!0,title:a.meta.title,description:a.meta.description,ogTitle:a.meta.ogTitle,ogDescription:a.meta.ogDescription,ogImageAlt:a.meta.ogImageAlt,twitterTitle:a.meta.twitterTitle,twitterDescription:a.meta.twitterDescription,twitterImageAlt:a.meta.twitterImageAlt,jsonLd:j({code:i.code,t:a,version:o})})}function L({slug:n,locale:r=`en`,prefix:i=`../`,includeAnalytics:a=!0,faq:o=[],extraNodes:s=[]}={}){let c=t(r),l=c.t,u=l.pages?.[n];if(!u)throw Error(`pageHead: no copy for page "${n}" — add it to t.pages in en.js`);let d=`${S}${e(c.code,n)}`,f=[{"@context":`https://schema.org`,...x()},{"@context":`https://schema.org`,"@type":`BreadcrumbList`,itemListElement:[{"@type":`ListItem`,position:1,name:`Home`,item:`${S}${e(c.code)}`},{"@type":`ListItem`,position:2,name:u.breadcrumb,item:d}]},o.length?{"@context":`https://schema.org`,"@type":`FAQPage`,mainEntity:o.map(e=>({"@type":`Question`,name:e.q,acceptedAnswer:{"@type":`Answer`,text:e.a}}))}:null,...s];return F({slug:n,code:c.code,ogLocale:c.ogLocale,prefix:i,includeAnalytics:a,title:u.title,description:u.description,ogTitle:u.ogTitle||u.title,ogDescription:u.ogDescription||u.description,ogImageAlt:l.meta.ogImageAlt,twitterTitle:u.ogTitle||u.title,twitterDescription:u.ogDescription||u.description,twitterImageAlt:l.meta.twitterImageAlt,jsonLd:P(f)})}function R(e=`en`){let n=t(e).t;return`<noscript>
    <p style="max-width:60ch;margin:1.5rem auto;padding:1rem;border:2px dashed #a82828;font-family:ui-monospace,monospace;text-align:center">
        ${o(n.meta.noscriptHtml)}
    </p>
</noscript>`}export{L as a,_ as c,c as d,l as f,R as i,h as l,I as n,p as o,o as p,M as r,d as s,N as t,g as u};