  var referrer = document.referrer,
    referrer_url = referrer ? new URL(referrer) : '',
    referrer_host = referrer_url ? referrer_url.host : '',
    referrer_organic = referrer_host.search(/google\.|bing\.|duckduckgo\.|yahoo\.|baidu\.|ecosia\.|\.aol\./gi) > -1,
    referrer_fb_ig = referrer_host.search(/facebook\.|instagram\./gi) > -1,
    ignore_referrer = document.location.host == referrer_host,
      
    utm_source = localStorage.getItem('utm_source'),
    utm_medium = localStorage.getItem('utm_medium'),
    utm_campaign = localStorage.getItem('utm_campaign'),
    utm_term = localStorage.getItem('utm_term'),
    utm_content = localStorage.getItem('utm_content'),
    gclid = localStorage.getItem('gclid'),
	utm_gclid = localStorage.getItem('utm_gclid'),
    
    utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'utm_gclid'],
    utmQuery = decodeURIComponent(window.location.search.substring(1)),
    utmVariables = utmQuery.split('&'),
    ParameterName;
  
  var getUTMValue = function(inputParameter) {
    for (var i = 0; i < utmVariables.length; i++) {
      ParameterName = utmVariables[i].split('=');
      if (ParameterName[0] === inputParameter) {
        return ParameterName[1] === null ? '(not set)' : ParameterName[1];
      }
    }
  };
  
  if (ignore_referrer == false) {
    if (referrer_host.search('tagassistant') > -1) {           //tagassistant
      localStorage.setItem('utm_source', 'tagassistant.google.com');
      localStorage.setItem('utm_medium', 'gtm_debug');
      localStorage.setItem('utm_campaign', 'gtm_debug');
      localStorage.setItem('utm_content', 'gtm_debug');
      localStorage.setItem('utm_term', 'gtm_debug');
      localStorage.setItem('gclid', 'gtm_debug');
	  localStorage.setItem('utm_gclid', 'gtm_debug');
    } else if (utmQuery.search(/^utm_|&utm_/g) > -1 || utmQuery.search('gclid=') > -1) {           //utms
      utmParams.forEach(function(param) {
        var pValue = getUTMValue(param);
        if (pValue) {
          localStorage.setItem(param, pValue);
        } else {
          localStorage.setItem(param, '(not set)');
        };
      });
    } else if (referrer_organic) {                                                //organic
      var match = referrer_host.match(/(?:www\.)?(?:search\.)?([^./]+)/);
      if (match) {
        localStorage.setItem('utm_source', match[1]);
      } else {
        localStorage.setItem('utm_source', referrer_host.replace('www.', ''));
      }
      localStorage.setItem('utm_medium', 'organic');
      localStorage.setItem('utm_campaign', '(organic)');
      localStorage.setItem('utm_content', '(none)');
      localStorage.setItem('utm_term', '(none)');
      localStorage.setItem('gclid', '(none)');
	  localStorage.setItem('utm_gclid', '(none)');
    } else if (referrer_fb_ig) {                                                  //fb ig subdomains
      var parts = referrer_host.split('.');
      var domain = parts[parts.length - 2] + '.' + parts[parts.length - 1]
      localStorage.setItem('utm_source', domain);
      localStorage.setItem('utm_medium', 'referral');
      localStorage.setItem('utm_campaign', '(referral)');
      localStorage.setItem('utm_content', '(none)');
      localStorage.setItem('utm_term', '(none)');
      localStorage.setItem('gclid', '(none)');
	  localStorage.setItem('utm_gclid', '(none)');
    } else if (referrer) {                                                       //other referrers
      localStorage.setItem('utm_source', referrer_host.replace('www.', ''));
      localStorage.setItem('utm_medium', 'referral');
      localStorage.setItem('utm_campaign', '(referral)');
      localStorage.setItem('utm_content', '(none)');
      localStorage.setItem('utm_term', '(none)');
      localStorage.setItem('gclid', '(none)');
	  localStorage.setItem('utm_gclid', '(none)');
    } else {                                                                     //last non direct or direct
      localStorage.setItem('utm_source', utm_source || '(direct)');
      localStorage.setItem('utm_medium', utm_medium || '(none)');
      localStorage.setItem('utm_campaign', utm_campaign || '(none)');
      localStorage.setItem('utm_content', utm_content || '(none)');
      localStorage.setItem('utm_term', utm_term || '(none)');
      localStorage.setItem('gclid', gclid || '(none)');
	  localStorage.setItem('utm_gclid', utm_gclid || '(none)');
    };
  };
