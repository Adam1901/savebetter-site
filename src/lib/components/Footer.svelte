<script>
  import { fmt } from '$lib/i18n/config.js'

  // Resources-column guide labels stay hardcoded English (the pages are EN-only);
  // `prefix` handles './' at root vs '../' on the localized pages.
  let { t, year, prefix, onCookieSettings } = $props()
  const f = t.footer
</script>

<footer class="bot" role="contentinfo">
  <div class="wrap">
    <div class="inner">
      <div class="col1">
        <div class="brand">CHECKPOINT64</div>
        <p class="blurb">{f.blurb}</p>
        <p class="sign">{f.sign} <span aria-hidden="true">✦</span></p>
      </div>
      <nav aria-label={f.ariaProduct}>
        <h2 class="footer-h">{f.product}</h2>
        <ul>
          <li><a href="#how">{f.links.how}</a></li>
          <li><a href="#features">{f.links.features}</a></li>
          <li><a href="#pricing">{f.links.pricing}</a></li>
          <li><a href="#download">{f.links.joinList}</a></li>
          <li><a href="https://github.com/checkpoint64/checkpoint64/releases" target="_blank" rel="noopener noreferrer" aria-label={f.changelogAria}>{f.links.changelog}</a></li>
        </ul>
      </nav>
      <nav aria-label={f.ariaResources}>
        <h2 class="footer-h">{f.resources}</h2>
        <ul>
          <li><a href="{prefix}blog/">{f.links.blog}</a></li>
          <li><a href="{prefix}games/">Game save backup guides</a></li>
          <li><a href="{prefix}saves/">Save locations</a></li>
          <li><a href="{prefix}compare/">Compare vs alternatives</a></li>
          <li><a href="{prefix}steam-cloud-alternative/">Steam Cloud alternative</a></li>
          <li><a href="{prefix}dedicated-server-alternative/">Dedicated server alternative</a></li>
          <li><a href="{prefix}modded-game-save-backup/">Modded save backup</a></li>
          <li><a href="{prefix}emulator-save-backup/">Emulator save backup</a></li>
        </ul>
      </nav>
      <nav aria-label={f.ariaCompany}>
        <h2 class="footer-h">{f.company}</h2>
        <ul>
          <li><a href="https://discord.gg/kxeYwuuHEn" target="_blank" rel="noopener noreferrer" aria-label={f.discordAria}>{f.links.discord}</a></li>
          <li><a href="{prefix}terms/">{f.links.terms}</a></li>
          <li><a href="{prefix}privacy/">{f.links.privacy}</a></li>
          <li><button type="button" class="footer-linkbtn" onclick={onCookieSettings}>{f.links.cookies}</button></li>
        </ul>
      </nav>
    </div>
    <div class="copyline">
      <span>{fmt(f.copyTpl, year)}</span>
      <span style="opacity:.6">{f.notAffiliated}</span>
    </div>
  </div>
</footer>
