/* eslint-disable @next/next/no-img-element */
export const Analytics = () => {
  const tracker = `
    <script>
      var _paq = window._paq = window._paq || [];
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="https://matomo.endquote.com/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '2']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    </script>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: tracker }}></div>
      <noscript>
        <img
          alt=""
          src="//matomo.endquote.com/matomo.php?rec=1&amp;idsite=1&amp;rec=1"
          style={{ border: 0 }}
        />
      </noscript>
    </>
  );
};

// https://developer.matomo.org/api-reference/tracking-javascript
export function trackEvent(
  category: string,
  action: string,
  name?: string,
  value?: number
): void {
  // @ts-ignore
  const _paq = window._paq || [];
  // console.log("trackEvent", { category, action, name, value });
  _paq.push(["trackEvent", category, action, name, value]);
}

// https://developer.matomo.org/guides/spa-tracking
export function trackPageView(url?: string): void {
  // @ts-ignore
  const _paq = window._paq || [];
  // console.log("trackPageView", url || "");
  _paq.push(["setGenerationTimeMs", 0]);
  if (url) {
    _paq.push(["setCustomUrl", url]);
  }
  _paq.push(["trackPageView"]);
}
