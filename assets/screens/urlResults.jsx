import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, Alert, View, SafeAreaView, BackHandler } from 'react-native';
import { ComponentResultsContainer, ComponentButton, Title } from '../components/components'; 
import { useFocusEffect } from '@react-navigation/native';
import { btoa } from 'react-native-quick-base64';

export default function App({route, navigation}){

  const [urlInfo, setUrlInfo] = useState('');

  const goBack = () => {
    navigation.navigate('Scan Url')
  };

  useFocusEffect( React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress', () => {
          navigation.navigate('Scan Url');
          return true;
        }
      );

      return () => subscription.remove();
    }, [navigation])
  );

  useEffect( () => {

    const {url} = route.params
    const urlB64 = customBase64Encode(url);

    function customBase64Encode(str) {
      let base64Encoded = btoa(str);
      base64Encoded = base64Encoded.replace(/=+$/, '');
      return base64Encoded;
    }
  
    function formatResponse(data){
      if (data.hasOwnProperty('error')){
        return `${data.error.code}:\n${data.error.message}`
      }
  
      if (data.hasOwnProperty('data')){

        // Extracting relevant data
        const id = data.data.id;
        const url = data.data.attributes.url;
        const title = data.data.attributes.title;
        const reputation = data.data.attributes.reputation;
        const categories = data.data.attributes.categories;
        const tags = data.data.attributes.tags;
        const analysisStats = data.data.attributes.last_analysis_stats;
        const totalVotes = data.data.attributes.total_votes;

        // Formatting the text
        const formattedText = `URL ID: ${id}
        \nURL: ${url}
        \nTitle: ${title}
        \nReputation: ${reputation}
        \nCategories: ${Object.values(categories).join(", ")}
        \nTags: ${tags.join(", ")}
        \nAnalysis Stats:
          - Malicious: ${analysisStats.malicious}
          - Suspicious: ${analysisStats.suspicious}
          - Undetected: ${analysisStats.undetected}
          - Harmless: ${analysisStats.harmless}
          - Timeout: ${analysisStats.timeout}
        \nTotal Votes:
          - Harmless: ${totalVotes.harmless}
          - Malicious: ${totalVotes.malicious}`;

        return formattedText
      }
    }

    const fetchURL = async () => {

      try{
  
        // const response = await fetch(`http://127.0.0.1:8000/${urlB64}`);
        // const data = await response.json();
        setUrlInfo(formatResponse(
          {
            "data": {
              "id": "0b2df0f635584f42c895f1d7b9cd105d3106accd9804d30556da88ae1bb0d62c",
              "type": "url",
              "links": {
                "self": "https://www.virustotal.com/api/v3/urls/0b2df0f635584f42c895f1d7b9cd105d3106accd9804d30556da88ae1bb0d62c"
              },
              "attributes": {
                "first_submission_date": 1285026841,
                "last_final_url": "https://www.facebook.com/login/?next=https://www.facebook.com/&_fb_noscript=1",
                "last_modification_date": 1712005957,
                "tld": "com",
                "crowdsourced_context": [
                  {
                    "source": "ArcSight Threat Intelligence",
                    "timestamp": 1692389347,
                    "details": "Contextual Indicators: Domain is classified as Social Networking\n\nContextual Indicators: The domain is popular among websites with good reputation\n\nContextual Indicators: The domain’s Alexa rank is 5\n\nContextual Indicators: The domain is popular in the world\n\nContextual Indicators: The domain’s Cisco Umbrella rank is 22\n\nCreated On: 1997:03:29 00:00:00\n\nVirusTotal Link: https://www.virustotal.com/gui/domain/3e723b591bdb95ce8f5c9b7032dc572ca97351d0da5efc73459c1fbaf438e43b/detection\n\nClassification Description: Legitimate website which does not serve any malicious purpose.",
                    "severity": "low",
                    "title": "Crouching Yeti: Appendixes"
                  }
                ],
                "reputation": 142,
                "last_analysis_date": 1712005941,
                "url": "https://www.facebook.com/",
                "trackers": {
                  "Doubleclick": [
                    {
                      "url": "",
                      "timestamp": 1712005941
                    }
                  ]
                },
                "last_http_response_content_sha256": "e2569c98cd8e4778934b746f20b8611be7c4fa7568afe9f58529e1e86a784ea9",
                "last_http_response_content_length": 57671,
                "outgoing_links": [
                  "https://www.threads.net/",
                  "https://messenger.com/",
                  "https://about.meta.com/",
                  "https://www.meta.com/quest/",
                  "https://www.meta.com/"
                ],
                "tags": [
                  "multiple-redirects"
                ],
                "times_submitted": 98066,
                "redirection_chain": [
                  "https://www.facebook.com/",
                  "https://www.facebook.com/"
                ],
                "last_http_response_code": 200,
                "title": "Log into Facebook",
                "last_submission_date": 1712005941,
                "html_meta": {
                  "referrer": [
                    "default"
                  ],
                  "description": [
                    "Log into Facebook to start sharing and connecting with your friends, family, and people you know."
                  ],
                  "og:site_name": [
                    "Facebook"
                  ],
                  "og:url": [
                    "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F"
                  ],
                  "og:locale": [
                    "en_US"
                  ]
                },
                "categories": {
                  "alphaMountain.ai": "Social Networking",
                  "BitDefender": "socialnetworks",
                  "Xcitium Verdict Cloud": "social networking",
                  "Dr.Web": "social networks",
                  "Sophos": "social networks",
                  "Forcepoint ThreatSeeker": "social web - facebook"
                },
                "last_http_response_headers": {
                  "Vary": "Accept-Encoding",
                  "Content-Encoding": "br",
                  "Set-Cookie": "noscript=1; path=/; domain=.facebook.com; secure, fr=073juhKnKznrlAtel..BmCyM6..AAA.0.0.BmCyM6.AWV2V2CO2FY; expires=Sun, 30-Jun-2024 21:12:26 GMT; Max-Age=7776000; path=/; domain=.facebook.com; secure; httponly, sb=OiMLZtsnf0x95EKc2wBE7X9p; expires=Tue, 06-May-2025 21:12:26 GMT; Max-Age=34560000; path=/; domain=.facebook.com; secure; httponly",
                  "reporting-endpoints": "coop_report=\"https://www.facebook.com/browser_reporting/coop/?minimize=0\", coep_report=\"https://www.facebook.com/browser_reporting/coep/?minimize=0\", default=\"https://www.facebook.com/ajax/browser_error_reports/?device_level=unknown\", permissions_policy=\"https://www.facebook.com/ajax/browser_error_reports/\"",
                  "report-to": "{\"max_age\":2592000,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/browser_reporting\\/coop\\/?minimize=0\"}],\"group\":\"coop_report\",\"include_subdomains\":true}, {\"max_age\":86400,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/browser_reporting\\/coep\\/?minimize=0\"}],\"group\":\"coep_report\"}, {\"max_age\":259200,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/ajax\\/browser_error_reports\\/?device_level=unknown\"}]}, {\"max_age\":21600,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/ajax\\/browser_error_reports\\/\"}],\"group\":\"permissions_policy\"}",
                  "content-security-policy": "default-src data: blob: 'self' https://*.fbsbx.com 'unsafe-inline' *.facebook.com *.fbcdn.net 'unsafe-eval';script-src *.facebook.com *.fbcdn.net *.facebook.net *.google.com 127.0.0.1:* 'unsafe-inline' blob: data: 'self' connect.facebook.net 'unsafe-eval' https://*.google-analytics.com;style-src fonts.googleapis.com *.fbcdn.net data: *.facebook.com 'unsafe-inline';connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net wss://*.facebook.com:* wss://*.whatsapp.com:* wss://*.fbcdn.net attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' http://localhost:3103 wss://gateway.facebook.com wss://edge-chat.facebook.com wss://snaptu-d.facebook.com wss://kaios-d.facebook.com/ v.whatsapp.net *.fbsbx.com *.fb.com https://*.google-analytics.com;font-src data: *.gstatic.com *.facebook.com *.fbcdn.net *.fbsbx.com;img-src *.fbcdn.net *.facebook.com data: https://*.fbsbx.com facebook.com *.cdninstagram.com fbsbx.com fbcdn.net connect.facebook.net *.carriersignal.info blob: android-webview-video-poster: *.whatsapp.net *.fb.com *.oculuscdn.com *.tenor.co *.tenor.com *.giphy.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.google-analytics.com;media-src *.cdninstagram.com blob: *.fbcdn.net *.fbsbx.com www.facebook.com *.facebook.com data: *.tenor.co *.tenor.com https://*.giphy.com;frame-src *.doubleclick.net *.google.com *.facebook.com www.googleadservices.com *.fbsbx.com fbsbx.com data: www.instagram.com *.fbcdn.net https://paywithmybank.com/ https://sandbox.paywithmybank.com/;worker-src blob: *.facebook.com data: https://*.google-analytics.com;block-all-mixed-content;upgrade-insecure-requests;",
                  "document-policy": "force-load-at-top",
                  "permissions-policy": "accelerometer=(), ambient-light-sensor=(), attribution-reporting=(self), autoplay=(), bluetooth=(), camera=(self), ch-device-memory=(), ch-save-data=(), ch-ua-arch=(), ch-ua-bitness=(), clipboard-read=(self), clipboard-write=(self), display-capture=(self), encrypted-media=(self), fullscreen=(self), gamepad=*, geolocation=(self), gyroscope=(), hid=(), idle-detection=(), keyboard-map=(), local-fonts=(), magnetometer=(), microphone=(self), midi=(), otp-credentials=(), payment=(), picture-in-picture=(self), publickey-credentials-get=(self), screen-wake-lock=(), serial=(), usb=(), window-management=(), xr-spatial-tracking=(self);report-to=\"permissions_policy\"",
                  "cross-origin-resource-policy": "same-origin",
                  "cross-origin-embedder-policy-report-only": "require-corp;report-to=\"coep_report\"",
                  "cross-origin-opener-policy": "unsafe-none;report-to=\"coop_report\"",
                  "Pragma": "no-cache",
                  "Cache-Control": "private, no-cache, no-store, must-revalidate",
                  "Expires": "Sat, 01 Jan 2000 00:00:00 GMT",
                  "X-Content-Type-Options": "nosniff",
                  "X-XSS-Protection": "0",
                  "X-Frame-Options": "DENY",
                  "Strict-Transport-Security": "max-age=15552000; preload",
                  "Content-Type": "text/html; charset=\"utf-8\"",
                  "X-FB-Debug": "uF6LqUuZcuXtSLv+49xXFyaYxQqvHUZxyTxTmANrH+TRkLLMvFQaTtoDJ8CLYh85v1fPR4t9uqHUAcTJxpeW5g==",
                  "Date": "Mon, 01 Apr 2024 21:12:26 GMT",
                  "X-FB-Connection-Quality": "EXCELLENT; q=0.9, rtt=14, rtx=0, c=13, mss=1380, tbw=1269921, tp=-1, tpl=-1, uplat=117, ullat=0",
                  "Alt-Svc": "h3=\":443\"; ma=86400",
                  "Transfer-Encoding": "chunked",
                  "Connection": "keep-alive"
                },
                "last_analysis_results": {
                  "Artists Against 419": {
                    "method": "blacklist",
                    "engine_name": "Artists Against 419",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Acronis": {
                    "method": "blacklist",
                    "engine_name": "Acronis",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Abusix": {
                    "method": "blacklist",
                    "engine_name": "Abusix",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "ADMINUSLabs": {
                    "method": "blacklist",
                    "engine_name": "ADMINUSLabs",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Lionic": {
                    "method": "blacklist",
                    "engine_name": "Lionic",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Criminal IP": {
                    "method": "blacklist",
                    "engine_name": "Criminal IP",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "AILabs (MONITORAPP)": {
                    "method": "blacklist",
                    "engine_name": "AILabs (MONITORAPP)",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "AlienVault": {
                    "method": "blacklist",
                    "engine_name": "AlienVault",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "alphaMountain.ai": {
                    "method": "blacklist",
                    "engine_name": "alphaMountain.ai",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "AlphaSOC": {
                    "method": "blacklist",
                    "engine_name": "AlphaSOC",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Antiy-AVL": {
                    "method": "blacklist",
                    "engine_name": "Antiy-AVL",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "ArcSight Threat Intelligence": {
                    "method": "blacklist",
                    "engine_name": "ArcSight Threat Intelligence",
                    "category": "suspicious",
                    "result": "suspicious"
                  },
                  "AutoShun": {
                    "method": "blacklist",
                    "engine_name": "AutoShun",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "benkow.cc": {
                    "method": "blacklist",
                    "engine_name": "benkow.cc",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Bfore.Ai PreCrime": {
                    "method": "blacklist",
                    "engine_name": "Bfore.Ai PreCrime",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "BitDefender": {
                    "method": "blacklist",
                    "engine_name": "BitDefender",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Bkav": {
                    "method": "blacklist",
                    "engine_name": "Bkav",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "BlockList": {
                    "method": "blacklist",
                    "engine_name": "BlockList",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Blueliv": {
                    "method": "blacklist",
                    "engine_name": "Blueliv",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Certego": {
                    "method": "blacklist",
                    "engine_name": "Certego",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Chong Lua Dao": {
                    "method": "blacklist",
                    "engine_name": "Chong Lua Dao",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "CINS Army": {
                    "method": "blacklist",
                    "engine_name": "CINS Army",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Snort IP sample list": {
                    "method": "blacklist",
                    "engine_name": "Snort IP sample list",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Cluster25": {
                    "method": "blacklist",
                    "engine_name": "Cluster25",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "CMC Threat Intelligence": {
                    "method": "blacklist",
                    "engine_name": "CMC Threat Intelligence",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Xcitium Verdict Cloud": {
                    "method": "blacklist",
                    "engine_name": "Xcitium Verdict Cloud",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "CRDF": {
                    "method": "blacklist",
                    "engine_name": "CRDF",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Cyan": {
                    "method": "blacklist",
                    "engine_name": "Cyan",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Cyble": {
                    "method": "blacklist",
                    "engine_name": "Cyble",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "CyRadar": {
                    "method": "blacklist",
                    "engine_name": "CyRadar",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "desenmascara.me": {
                    "method": "blacklist",
                    "engine_name": "desenmascara.me",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "DNS8": {
                    "method": "blacklist",
                    "engine_name": "DNS8",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Dr.Web": {
                    "method": "blacklist",
                    "engine_name": "Dr.Web",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Emsisoft": {
                    "method": "blacklist",
                    "engine_name": "Emsisoft",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Ermes": {
                    "method": "blacklist",
                    "engine_name": "Ermes",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "ESET": {
                    "method": "blacklist",
                    "engine_name": "ESET",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "ESTsecurity": {
                    "method": "blacklist",
                    "engine_name": "ESTsecurity",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "EmergingThreats": {
                    "method": "blacklist",
                    "engine_name": "EmergingThreats",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Feodo Tracker": {
                    "method": "blacklist",
                    "engine_name": "Feodo Tracker",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Fortinet": {
                    "method": "blacklist",
                    "engine_name": "Fortinet",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "G-Data": {
                    "method": "blacklist",
                    "engine_name": "G-Data",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Google Safebrowsing": {
                    "method": "blacklist",
                    "engine_name": "Google Safebrowsing",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "GreenSnow": {
                    "method": "blacklist",
                    "engine_name": "GreenSnow",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Gridinsoft": {
                    "method": "blacklist",
                    "engine_name": "Gridinsoft",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Heimdal Security": {
                    "method": "blacklist",
                    "engine_name": "Heimdal Security",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "IPsum": {
                    "method": "blacklist",
                    "engine_name": "IPsum",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Juniper Networks": {
                    "method": "blacklist",
                    "engine_name": "Juniper Networks",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "K7AntiVirus": {
                    "method": "blacklist",
                    "engine_name": "K7AntiVirus",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Kaspersky": {
                    "method": "blacklist",
                    "engine_name": "Kaspersky",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Lumu": {
                    "method": "blacklist",
                    "engine_name": "Lumu",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Malwared": {
                    "method": "blacklist",
                    "engine_name": "Malwared",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "MalwareURL": {
                    "method": "blacklist",
                    "engine_name": "MalwareURL",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "MalwarePatrol": {
                    "method": "blacklist",
                    "engine_name": "MalwarePatrol",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "malwares.com URL checker": {
                    "method": "blacklist",
                    "engine_name": "malwares.com URL checker",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Netcraft": {
                    "method": "blacklist",
                    "engine_name": "Netcraft",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "OpenPhish": {
                    "method": "blacklist",
                    "engine_name": "OpenPhish",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "0xSI_f33d": {
                    "method": "blacklist",
                    "engine_name": "0xSI_f33d",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Phishing Database": {
                    "method": "blacklist",
                    "engine_name": "Phishing Database",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "PhishFort": {
                    "method": "blacklist",
                    "engine_name": "PhishFort",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "PhishLabs": {
                    "method": "blacklist",
                    "engine_name": "PhishLabs",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Phishtank": {
                    "method": "blacklist",
                    "engine_name": "Phishtank",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "PREBYTES": {
                    "method": "blacklist",
                    "engine_name": "PREBYTES",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "PrecisionSec": {
                    "method": "blacklist",
                    "engine_name": "PrecisionSec",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Quick Heal": {
                    "method": "blacklist",
                    "engine_name": "Quick Heal",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Quttera": {
                    "method": "blacklist",
                    "engine_name": "Quttera",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Rising": {
                    "method": "blacklist",
                    "engine_name": "Rising",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "SafeToOpen": {
                    "method": "blacklist",
                    "engine_name": "SafeToOpen",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Sangfor": {
                    "method": "blacklist",
                    "engine_name": "Sangfor",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Sansec eComscan": {
                    "method": "blacklist",
                    "engine_name": "Sansec eComscan",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "Scantitan": {
                    "method": "blacklist",
                    "engine_name": "Scantitan",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "SCUMWARE.org": {
                    "method": "blacklist",
                    "engine_name": "SCUMWARE.org",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Seclookup": {
                    "method": "blacklist",
                    "engine_name": "Seclookup",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "SOCRadar": {
                    "method": "blacklist",
                    "engine_name": "SOCRadar",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Sophos": {
                    "method": "blacklist",
                    "engine_name": "Sophos",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Spam404": {
                    "method": "blacklist",
                    "engine_name": "Spam404",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "StopForumSpam": {
                    "method": "blacklist",
                    "engine_name": "StopForumSpam",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Sucuri SiteCheck": {
                    "method": "blacklist",
                    "engine_name": "Sucuri SiteCheck",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "securolytics": {
                    "method": "blacklist",
                    "engine_name": "securolytics",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Threatsourcing": {
                    "method": "blacklist",
                    "engine_name": "Threatsourcing",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "ThreatHive": {
                    "method": "blacklist",
                    "engine_name": "ThreatHive",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Trustwave": {
                    "method": "blacklist",
                    "engine_name": "Trustwave",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Underworld": {
                    "method": "blacklist",
                    "engine_name": "Underworld",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "URLhaus": {
                    "method": "blacklist",
                    "engine_name": "URLhaus",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "URLQuery": {
                    "method": "blacklist",
                    "engine_name": "URLQuery",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Viettel Threat Intelligence": {
                    "method": "blacklist",
                    "engine_name": "Viettel Threat Intelligence",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "VIPRE": {
                    "method": "blacklist",
                    "engine_name": "VIPRE",
                    "category": "undetected",
                    "result": "unrated"
                  },
                  "ViriBack": {
                    "method": "blacklist",
                    "engine_name": "ViriBack",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "VX Vault": {
                    "method": "blacklist",
                    "engine_name": "VX Vault",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Webroot": {
                    "method": "blacklist",
                    "engine_name": "Webroot",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Forcepoint ThreatSeeker": {
                    "method": "blacklist",
                    "engine_name": "Forcepoint ThreatSeeker",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "Yandex Safebrowsing": {
                    "method": "blacklist",
                    "engine_name": "Yandex Safebrowsing",
                    "category": "harmless",
                    "result": "clean"
                  },
                  "ZeroCERT": {
                    "method": "blacklist",
                    "engine_name": "ZeroCERT",
                    "category": "harmless",
                    "result": "clean"
                  }
                },
                "last_analysis_stats": {
                  "malicious": 0,
                  "suspicious": 1,
                  "undetected": 18,
                  "harmless": 73,
                  "timeout": 0
                },
                "threat_names": [],
                "total_votes": {
                  "harmless": 905,
                  "malicious": 731
                }
              }
            }
          }
        ));
  
      } catch (e) {
  
        setUrlInfo(formatResponse(
        // {
        //   error: {
        //     message: 'Something went wrong while connecting to server',
        //     code: 'ConnectionError'
        //   }
        // }

        {
          "data": {
            "id": "0b2df0f635584f42c895f1d7b9cd105d3106accd9804d30556da88ae1bb0d62c",
            "type": "url",
            "links": {
              "self": "https://www.virustotal.com/api/v3/urls/0b2df0f635584f42c895f1d7b9cd105d3106accd9804d30556da88ae1bb0d62c"
            },
            "attributes": {
              "first_submission_date": 1285026841,
              "last_final_url": "https://www.facebook.com/login/?next=https://www.facebook.com/&_fb_noscript=1",
              "last_modification_date": 1712005957,
              "tld": "com",
              "crowdsourced_context": [
                {
                  "source": "ArcSight Threat Intelligence",
                  "timestamp": 1692389347,
                  "details": "Contextual Indicators: Domain is classified as Social Networking\n\nContextual Indicators: The domain is popular among websites with good reputation\n\nContextual Indicators: The domain’s Alexa rank is 5\n\nContextual Indicators: The domain is popular in the world\n\nContextual Indicators: The domain’s Cisco Umbrella rank is 22\n\nCreated On: 1997:03:29 00:00:00\n\nVirusTotal Link: https://www.virustotal.com/gui/domain/3e723b591bdb95ce8f5c9b7032dc572ca97351d0da5efc73459c1fbaf438e43b/detection\n\nClassification Description: Legitimate website which does not serve any malicious purpose.",
                  "severity": "low",
                  "title": "Crouching Yeti: Appendixes"
                }
              ],
              "reputation": 142,
              "last_analysis_date": 1712005941,
              "url": "https://www.facebook.com/",
              "trackers": {
                "Doubleclick": [
                  {
                    "url": "",
                    "timestamp": 1712005941
                  }
                ]
              },
              "last_http_response_content_sha256": "e2569c98cd8e4778934b746f20b8611be7c4fa7568afe9f58529e1e86a784ea9",
              "last_http_response_content_length": 57671,
              "outgoing_links": [
                "https://www.threads.net/",
                "https://messenger.com/",
                "https://about.meta.com/",
                "https://www.meta.com/quest/",
                "https://www.meta.com/"
              ],
              "tags": [
                "multiple-redirects"
              ],
              "times_submitted": 98066,
              "redirection_chain": [
                "https://www.facebook.com/",
                "https://www.facebook.com/"
              ],
              "last_http_response_code": 200,
              "title": "Log into Facebook",
              "last_submission_date": 1712005941,
              "html_meta": {
                "referrer": [
                  "default"
                ],
                "description": [
                  "Log into Facebook to start sharing and connecting with your friends, family, and people you know."
                ],
                "og:site_name": [
                  "Facebook"
                ],
                "og:url": [
                  "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F"
                ],
                "og:locale": [
                  "en_US"
                ]
              },
              "categories": {
                "alphaMountain.ai": "Social Networking",
                "BitDefender": "socialnetworks",
                "Xcitium Verdict Cloud": "social networking",
                "Dr.Web": "social networks",
                "Sophos": "social networks",
                "Forcepoint ThreatSeeker": "social web - facebook"
              },
              "last_http_response_headers": {
                "Vary": "Accept-Encoding",
                "Content-Encoding": "br",
                "Set-Cookie": "noscript=1; path=/; domain=.facebook.com; secure, fr=073juhKnKznrlAtel..BmCyM6..AAA.0.0.BmCyM6.AWV2V2CO2FY; expires=Sun, 30-Jun-2024 21:12:26 GMT; Max-Age=7776000; path=/; domain=.facebook.com; secure; httponly, sb=OiMLZtsnf0x95EKc2wBE7X9p; expires=Tue, 06-May-2025 21:12:26 GMT; Max-Age=34560000; path=/; domain=.facebook.com; secure; httponly",
                "reporting-endpoints": "coop_report=\"https://www.facebook.com/browser_reporting/coop/?minimize=0\", coep_report=\"https://www.facebook.com/browser_reporting/coep/?minimize=0\", default=\"https://www.facebook.com/ajax/browser_error_reports/?device_level=unknown\", permissions_policy=\"https://www.facebook.com/ajax/browser_error_reports/\"",
                "report-to": "{\"max_age\":2592000,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/browser_reporting\\/coop\\/?minimize=0\"}],\"group\":\"coop_report\",\"include_subdomains\":true}, {\"max_age\":86400,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/browser_reporting\\/coep\\/?minimize=0\"}],\"group\":\"coep_report\"}, {\"max_age\":259200,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/ajax\\/browser_error_reports\\/?device_level=unknown\"}]}, {\"max_age\":21600,\"endpoints\":[{\"url\":\"https:\\/\\/www.facebook.com\\/ajax\\/browser_error_reports\\/\"}],\"group\":\"permissions_policy\"}",
                "content-security-policy": "default-src data: blob: 'self' https://*.fbsbx.com 'unsafe-inline' *.facebook.com *.fbcdn.net 'unsafe-eval';script-src *.facebook.com *.fbcdn.net *.facebook.net *.google.com 127.0.0.1:* 'unsafe-inline' blob: data: 'self' connect.facebook.net 'unsafe-eval' https://*.google-analytics.com;style-src fonts.googleapis.com *.fbcdn.net data: *.facebook.com 'unsafe-inline';connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net wss://*.facebook.com:* wss://*.whatsapp.com:* wss://*.fbcdn.net attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' http://localhost:3103 wss://gateway.facebook.com wss://edge-chat.facebook.com wss://snaptu-d.facebook.com wss://kaios-d.facebook.com/ v.whatsapp.net *.fbsbx.com *.fb.com https://*.google-analytics.com;font-src data: *.gstatic.com *.facebook.com *.fbcdn.net *.fbsbx.com;img-src *.fbcdn.net *.facebook.com data: https://*.fbsbx.com facebook.com *.cdninstagram.com fbsbx.com fbcdn.net connect.facebook.net *.carriersignal.info blob: android-webview-video-poster: *.whatsapp.net *.fb.com *.oculuscdn.com *.tenor.co *.tenor.com *.giphy.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.google-analytics.com;media-src *.cdninstagram.com blob: *.fbcdn.net *.fbsbx.com www.facebook.com *.facebook.com data: *.tenor.co *.tenor.com https://*.giphy.com;frame-src *.doubleclick.net *.google.com *.facebook.com www.googleadservices.com *.fbsbx.com fbsbx.com data: www.instagram.com *.fbcdn.net https://paywithmybank.com/ https://sandbox.paywithmybank.com/;worker-src blob: *.facebook.com data: https://*.google-analytics.com;block-all-mixed-content;upgrade-insecure-requests;",
                "document-policy": "force-load-at-top",
                "permissions-policy": "accelerometer=(), ambient-light-sensor=(), attribution-reporting=(self), autoplay=(), bluetooth=(), camera=(self), ch-device-memory=(), ch-save-data=(), ch-ua-arch=(), ch-ua-bitness=(), clipboard-read=(self), clipboard-write=(self), display-capture=(self), encrypted-media=(self), fullscreen=(self), gamepad=*, geolocation=(self), gyroscope=(), hid=(), idle-detection=(), keyboard-map=(), local-fonts=(), magnetometer=(), microphone=(self), midi=(), otp-credentials=(), payment=(), picture-in-picture=(self), publickey-credentials-get=(self), screen-wake-lock=(), serial=(), usb=(), window-management=(), xr-spatial-tracking=(self);report-to=\"permissions_policy\"",
                "cross-origin-resource-policy": "same-origin",
                "cross-origin-embedder-policy-report-only": "require-corp;report-to=\"coep_report\"",
                "cross-origin-opener-policy": "unsafe-none;report-to=\"coop_report\"",
                "Pragma": "no-cache",
                "Cache-Control": "private, no-cache, no-store, must-revalidate",
                "Expires": "Sat, 01 Jan 2000 00:00:00 GMT",
                "X-Content-Type-Options": "nosniff",
                "X-XSS-Protection": "0",
                "X-Frame-Options": "DENY",
                "Strict-Transport-Security": "max-age=15552000; preload",
                "Content-Type": "text/html; charset=\"utf-8\"",
                "X-FB-Debug": "uF6LqUuZcuXtSLv+49xXFyaYxQqvHUZxyTxTmANrH+TRkLLMvFQaTtoDJ8CLYh85v1fPR4t9uqHUAcTJxpeW5g==",
                "Date": "Mon, 01 Apr 2024 21:12:26 GMT",
                "X-FB-Connection-Quality": "EXCELLENT; q=0.9, rtt=14, rtx=0, c=13, mss=1380, tbw=1269921, tp=-1, tpl=-1, uplat=117, ullat=0",
                "Alt-Svc": "h3=\":443\"; ma=86400",
                "Transfer-Encoding": "chunked",
                "Connection": "keep-alive"
              },
              "last_analysis_results": {
                "Artists Against 419": {
                  "method": "blacklist",
                  "engine_name": "Artists Against 419",
                  "category": "harmless",
                  "result": "clean"
                },
                "Acronis": {
                  "method": "blacklist",
                  "engine_name": "Acronis",
                  "category": "harmless",
                  "result": "clean"
                },
                "Abusix": {
                  "method": "blacklist",
                  "engine_name": "Abusix",
                  "category": "harmless",
                  "result": "clean"
                },
                "ADMINUSLabs": {
                  "method": "blacklist",
                  "engine_name": "ADMINUSLabs",
                  "category": "harmless",
                  "result": "clean"
                },
                "Lionic": {
                  "method": "blacklist",
                  "engine_name": "Lionic",
                  "category": "harmless",
                  "result": "clean"
                },
                "Criminal IP": {
                  "method": "blacklist",
                  "engine_name": "Criminal IP",
                  "category": "harmless",
                  "result": "clean"
                },
                "AILabs (MONITORAPP)": {
                  "method": "blacklist",
                  "engine_name": "AILabs (MONITORAPP)",
                  "category": "harmless",
                  "result": "clean"
                },
                "AlienVault": {
                  "method": "blacklist",
                  "engine_name": "AlienVault",
                  "category": "harmless",
                  "result": "clean"
                },
                "alphaMountain.ai": {
                  "method": "blacklist",
                  "engine_name": "alphaMountain.ai",
                  "category": "harmless",
                  "result": "clean"
                },
                "AlphaSOC": {
                  "method": "blacklist",
                  "engine_name": "AlphaSOC",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Antiy-AVL": {
                  "method": "blacklist",
                  "engine_name": "Antiy-AVL",
                  "category": "harmless",
                  "result": "clean"
                },
                "ArcSight Threat Intelligence": {
                  "method": "blacklist",
                  "engine_name": "ArcSight Threat Intelligence",
                  "category": "suspicious",
                  "result": "suspicious"
                },
                "AutoShun": {
                  "method": "blacklist",
                  "engine_name": "AutoShun",
                  "category": "undetected",
                  "result": "unrated"
                },
                "benkow.cc": {
                  "method": "blacklist",
                  "engine_name": "benkow.cc",
                  "category": "harmless",
                  "result": "clean"
                },
                "Bfore.Ai PreCrime": {
                  "method": "blacklist",
                  "engine_name": "Bfore.Ai PreCrime",
                  "category": "harmless",
                  "result": "clean"
                },
                "BitDefender": {
                  "method": "blacklist",
                  "engine_name": "BitDefender",
                  "category": "harmless",
                  "result": "clean"
                },
                "Bkav": {
                  "method": "blacklist",
                  "engine_name": "Bkav",
                  "category": "undetected",
                  "result": "unrated"
                },
                "BlockList": {
                  "method": "blacklist",
                  "engine_name": "BlockList",
                  "category": "harmless",
                  "result": "clean"
                },
                "Blueliv": {
                  "method": "blacklist",
                  "engine_name": "Blueliv",
                  "category": "harmless",
                  "result": "clean"
                },
                "Certego": {
                  "method": "blacklist",
                  "engine_name": "Certego",
                  "category": "harmless",
                  "result": "clean"
                },
                "Chong Lua Dao": {
                  "method": "blacklist",
                  "engine_name": "Chong Lua Dao",
                  "category": "harmless",
                  "result": "clean"
                },
                "CINS Army": {
                  "method": "blacklist",
                  "engine_name": "CINS Army",
                  "category": "harmless",
                  "result": "clean"
                },
                "Snort IP sample list": {
                  "method": "blacklist",
                  "engine_name": "Snort IP sample list",
                  "category": "harmless",
                  "result": "clean"
                },
                "Cluster25": {
                  "method": "blacklist",
                  "engine_name": "Cluster25",
                  "category": "undetected",
                  "result": "unrated"
                },
                "CMC Threat Intelligence": {
                  "method": "blacklist",
                  "engine_name": "CMC Threat Intelligence",
                  "category": "harmless",
                  "result": "clean"
                },
                "Xcitium Verdict Cloud": {
                  "method": "blacklist",
                  "engine_name": "Xcitium Verdict Cloud",
                  "category": "undetected",
                  "result": "unrated"
                },
                "CRDF": {
                  "method": "blacklist",
                  "engine_name": "CRDF",
                  "category": "harmless",
                  "result": "clean"
                },
                "Cyan": {
                  "method": "blacklist",
                  "engine_name": "Cyan",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Cyble": {
                  "method": "blacklist",
                  "engine_name": "Cyble",
                  "category": "harmless",
                  "result": "clean"
                },
                "CyRadar": {
                  "method": "blacklist",
                  "engine_name": "CyRadar",
                  "category": "harmless",
                  "result": "clean"
                },
                "desenmascara.me": {
                  "method": "blacklist",
                  "engine_name": "desenmascara.me",
                  "category": "harmless",
                  "result": "clean"
                },
                "DNS8": {
                  "method": "blacklist",
                  "engine_name": "DNS8",
                  "category": "harmless",
                  "result": "clean"
                },
                "Dr.Web": {
                  "method": "blacklist",
                  "engine_name": "Dr.Web",
                  "category": "harmless",
                  "result": "clean"
                },
                "Emsisoft": {
                  "method": "blacklist",
                  "engine_name": "Emsisoft",
                  "category": "harmless",
                  "result": "clean"
                },
                "Ermes": {
                  "method": "blacklist",
                  "engine_name": "Ermes",
                  "category": "undetected",
                  "result": "unrated"
                },
                "ESET": {
                  "method": "blacklist",
                  "engine_name": "ESET",
                  "category": "harmless",
                  "result": "clean"
                },
                "ESTsecurity": {
                  "method": "blacklist",
                  "engine_name": "ESTsecurity",
                  "category": "harmless",
                  "result": "clean"
                },
                "EmergingThreats": {
                  "method": "blacklist",
                  "engine_name": "EmergingThreats",
                  "category": "harmless",
                  "result": "clean"
                },
                "Feodo Tracker": {
                  "method": "blacklist",
                  "engine_name": "Feodo Tracker",
                  "category": "harmless",
                  "result": "clean"
                },
                "Fortinet": {
                  "method": "blacklist",
                  "engine_name": "Fortinet",
                  "category": "harmless",
                  "result": "clean"
                },
                "G-Data": {
                  "method": "blacklist",
                  "engine_name": "G-Data",
                  "category": "harmless",
                  "result": "clean"
                },
                "Google Safebrowsing": {
                  "method": "blacklist",
                  "engine_name": "Google Safebrowsing",
                  "category": "harmless",
                  "result": "clean"
                },
                "GreenSnow": {
                  "method": "blacklist",
                  "engine_name": "GreenSnow",
                  "category": "harmless",
                  "result": "clean"
                },
                "Gridinsoft": {
                  "method": "blacklist",
                  "engine_name": "Gridinsoft",
                  "category": "harmless",
                  "result": "clean"
                },
                "Heimdal Security": {
                  "method": "blacklist",
                  "engine_name": "Heimdal Security",
                  "category": "harmless",
                  "result": "clean"
                },
                "IPsum": {
                  "method": "blacklist",
                  "engine_name": "IPsum",
                  "category": "harmless",
                  "result": "clean"
                },
                "Juniper Networks": {
                  "method": "blacklist",
                  "engine_name": "Juniper Networks",
                  "category": "harmless",
                  "result": "clean"
                },
                "K7AntiVirus": {
                  "method": "blacklist",
                  "engine_name": "K7AntiVirus",
                  "category": "harmless",
                  "result": "clean"
                },
                "Kaspersky": {
                  "method": "blacklist",
                  "engine_name": "Kaspersky",
                  "category": "harmless",
                  "result": "clean"
                },
                "Lumu": {
                  "method": "blacklist",
                  "engine_name": "Lumu",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Malwared": {
                  "method": "blacklist",
                  "engine_name": "Malwared",
                  "category": "harmless",
                  "result": "clean"
                },
                "MalwareURL": {
                  "method": "blacklist",
                  "engine_name": "MalwareURL",
                  "category": "undetected",
                  "result": "unrated"
                },
                "MalwarePatrol": {
                  "method": "blacklist",
                  "engine_name": "MalwarePatrol",
                  "category": "harmless",
                  "result": "clean"
                },
                "malwares.com URL checker": {
                  "method": "blacklist",
                  "engine_name": "malwares.com URL checker",
                  "category": "harmless",
                  "result": "clean"
                },
                "Netcraft": {
                  "method": "blacklist",
                  "engine_name": "Netcraft",
                  "category": "undetected",
                  "result": "unrated"
                },
                "OpenPhish": {
                  "method": "blacklist",
                  "engine_name": "OpenPhish",
                  "category": "harmless",
                  "result": "clean"
                },
                "0xSI_f33d": {
                  "method": "blacklist",
                  "engine_name": "0xSI_f33d",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Phishing Database": {
                  "method": "blacklist",
                  "engine_name": "Phishing Database",
                  "category": "harmless",
                  "result": "clean"
                },
                "PhishFort": {
                  "method": "blacklist",
                  "engine_name": "PhishFort",
                  "category": "undetected",
                  "result": "unrated"
                },
                "PhishLabs": {
                  "method": "blacklist",
                  "engine_name": "PhishLabs",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Phishtank": {
                  "method": "blacklist",
                  "engine_name": "Phishtank",
                  "category": "harmless",
                  "result": "clean"
                },
                "PREBYTES": {
                  "method": "blacklist",
                  "engine_name": "PREBYTES",
                  "category": "harmless",
                  "result": "clean"
                },
                "PrecisionSec": {
                  "method": "blacklist",
                  "engine_name": "PrecisionSec",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Quick Heal": {
                  "method": "blacklist",
                  "engine_name": "Quick Heal",
                  "category": "harmless",
                  "result": "clean"
                },
                "Quttera": {
                  "method": "blacklist",
                  "engine_name": "Quttera",
                  "category": "harmless",
                  "result": "clean"
                },
                "Rising": {
                  "method": "blacklist",
                  "engine_name": "Rising",
                  "category": "harmless",
                  "result": "clean"
                },
                "SafeToOpen": {
                  "method": "blacklist",
                  "engine_name": "SafeToOpen",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Sangfor": {
                  "method": "blacklist",
                  "engine_name": "Sangfor",
                  "category": "harmless",
                  "result": "clean"
                },
                "Sansec eComscan": {
                  "method": "blacklist",
                  "engine_name": "Sansec eComscan",
                  "category": "undetected",
                  "result": "unrated"
                },
                "Scantitan": {
                  "method": "blacklist",
                  "engine_name": "Scantitan",
                  "category": "harmless",
                  "result": "clean"
                },
                "SCUMWARE.org": {
                  "method": "blacklist",
                  "engine_name": "SCUMWARE.org",
                  "category": "harmless",
                  "result": "clean"
                },
                "Seclookup": {
                  "method": "blacklist",
                  "engine_name": "Seclookup",
                  "category": "harmless",
                  "result": "clean"
                },
                "SOCRadar": {
                  "method": "blacklist",
                  "engine_name": "SOCRadar",
                  "category": "harmless",
                  "result": "clean"
                },
                "Sophos": {
                  "method": "blacklist",
                  "engine_name": "Sophos",
                  "category": "harmless",
                  "result": "clean"
                },
                "Spam404": {
                  "method": "blacklist",
                  "engine_name": "Spam404",
                  "category": "harmless",
                  "result": "clean"
                },
                "StopForumSpam": {
                  "method": "blacklist",
                  "engine_name": "StopForumSpam",
                  "category": "harmless",
                  "result": "clean"
                },
                "Sucuri SiteCheck": {
                  "method": "blacklist",
                  "engine_name": "Sucuri SiteCheck",
                  "category": "harmless",
                  "result": "clean"
                },
                "securolytics": {
                  "method": "blacklist",
                  "engine_name": "securolytics",
                  "category": "harmless",
                  "result": "clean"
                },
                "Threatsourcing": {
                  "method": "blacklist",
                  "engine_name": "Threatsourcing",
                  "category": "harmless",
                  "result": "clean"
                },
                "ThreatHive": {
                  "method": "blacklist",
                  "engine_name": "ThreatHive",
                  "category": "harmless",
                  "result": "clean"
                },
                "Trustwave": {
                  "method": "blacklist",
                  "engine_name": "Trustwave",
                  "category": "harmless",
                  "result": "clean"
                },
                "Underworld": {
                  "method": "blacklist",
                  "engine_name": "Underworld",
                  "category": "undetected",
                  "result": "unrated"
                },
                "URLhaus": {
                  "method": "blacklist",
                  "engine_name": "URLhaus",
                  "category": "harmless",
                  "result": "clean"
                },
                "URLQuery": {
                  "method": "blacklist",
                  "engine_name": "URLQuery",
                  "category": "harmless",
                  "result": "clean"
                },
                "Viettel Threat Intelligence": {
                  "method": "blacklist",
                  "engine_name": "Viettel Threat Intelligence",
                  "category": "harmless",
                  "result": "clean"
                },
                "VIPRE": {
                  "method": "blacklist",
                  "engine_name": "VIPRE",
                  "category": "undetected",
                  "result": "unrated"
                },
                "ViriBack": {
                  "method": "blacklist",
                  "engine_name": "ViriBack",
                  "category": "harmless",
                  "result": "clean"
                },
                "VX Vault": {
                  "method": "blacklist",
                  "engine_name": "VX Vault",
                  "category": "harmless",
                  "result": "clean"
                },
                "Webroot": {
                  "method": "blacklist",
                  "engine_name": "Webroot",
                  "category": "harmless",
                  "result": "clean"
                },
                "Forcepoint ThreatSeeker": {
                  "method": "blacklist",
                  "engine_name": "Forcepoint ThreatSeeker",
                  "category": "harmless",
                  "result": "clean"
                },
                "Yandex Safebrowsing": {
                  "method": "blacklist",
                  "engine_name": "Yandex Safebrowsing",
                  "category": "harmless",
                  "result": "clean"
                },
                "ZeroCERT": {
                  "method": "blacklist",
                  "engine_name": "ZeroCERT",
                  "category": "harmless",
                  "result": "clean"
                }
              },
              "last_analysis_stats": {
                "malicious": 0,
                "suspicious": 1,
                "undetected": 18,
                "harmless": 73,
                "timeout": 0
              },
              "threat_names": [],
              "total_votes": {
                "harmless": 905,
                "malicious": 731
              }
            }
          }
        }
        ));
  
      };
    };

    fetchURL();

  }, [route.params] );

  return (
    <SafeAreaView style = {styles.safeArea}>
      <View style = {styles.mainContainer}>
        <Title text = "Results" />
        <ComponentResultsContainer text = {urlInfo} />
        <ComponentButton text = "Go back" onPress = {goBack}/>
        <ComponentButton text = "Visit site under my risk" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:
  {
    flex: 1,
    backgroundColor : '#fff'    
  },
  mainContainer :
  {
    width: '100%',
    alignItems : 'center',
    justifyContent : 'center',
  },
});