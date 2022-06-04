---
layout: empty
title: "Markov Chain Monte Carlo"
mathjax: true
comments: true
date: 2022-06-04
---

<html>
<head><meta charset="utf-8" />

<title>01_MCMC</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>



<style type="text/css">
    /*!
*
* Twitter Bootstrap
*
*/
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active,
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
mark {
  background: #ff0;
  color: #000;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  box-sizing: content-box;
  height: 0;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: textfield;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */
@media print {
  *,
  *:before,
  *:after {
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  a,
  a:visited {
    text-decoration: underline;
  }
  a[href]:after {
    content: " (" attr(href) ")";
  }
  abbr[title]:after {
    content: " (" attr(title) ")";
  }
  a[href^="#"]:after,
  a[href^="javascript:"]:after {
    content: "";
  }
  pre,
  blockquote {
    border: 1px solid #999;
    page-break-inside: avoid;
  }
  thead {
    display: table-header-group;
  }
  tr,
  img {
    page-break-inside: avoid;
  }
  img {
    max-width: 100% !important;
  }
  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }
  h2,
  h3 {
    page-break-after: avoid;
  }
  .navbar {
    display: none;
  }
  .btn > .caret,
  .dropup > .btn > .caret {
    border-top-color: #000 !important;
  }
  .label {
    border: 1px solid #000;
  }
  .table {
    border-collapse: collapse !important;
  }
  .table td,
  .table th {
    background-color: #fff !important;
  }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #ddd !important;
  }
}
@font-face {
  font-family: 'Glyphicons Halflings';
  src: url('../components/bootstrap/fonts/glyphicons-halflings-regular.eot');
  src: url('../components/bootstrap/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.woff') format('woff'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
}
.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: 'Glyphicons Halflings';
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.glyphicon-asterisk:before {
  content: "\002a";
}
.glyphicon-plus:before {
  content: "\002b";
}
.glyphicon-euro:before,
.glyphicon-eur:before {
  content: "\20ac";
}
.glyphicon-minus:before {
  content: "\2212";
}
.glyphicon-cloud:before {
  content: "\2601";
}
.glyphicon-envelope:before {
  content: "\2709";
}
.glyphicon-pencil:before {
  content: "\270f";
}
.glyphicon-glass:before {
  content: "\e001";
}
.glyphicon-music:before {
  content: "\e002";
}
.glyphicon-search:before {
  content: "\e003";
}
.glyphicon-heart:before {
  content: "\e005";
}
.glyphicon-star:before {
  content: "\e006";
}
.glyphicon-star-empty:before {
  content: "\e007";
}
.glyphicon-user:before {
  content: "\e008";
}
.glyphicon-film:before {
  content: "\e009";
}
.glyphicon-th-large:before {
  content: "\e010";
}
.glyphicon-th:before {
  content: "\e011";
}
.glyphicon-th-list:before {
  content: "\e012";
}
.glyphicon-ok:before {
  content: "\e013";
}
.glyphicon-remove:before {
  content: "\e014";
}
.glyphicon-zoom-in:before {
  content: "\e015";
}
.glyphicon-zoom-out:before {
  content: "\e016";
}
.glyphicon-off:before {
  content: "\e017";
}
.glyphicon-signal:before {
  content: "\e018";
}
.glyphicon-cog:before {
  content: "\e019";
}
.glyphicon-trash:before {
  content: "\e020";
}
.glyphicon-home:before {
  content: "\e021";
}
.glyphicon-file:before {
  content: "\e022";
}
.glyphicon-time:before {
  content: "\e023";
}
.glyphicon-road:before {
  content: "\e024";
}
.glyphicon-download-alt:before {
  content: "\e025";
}
.glyphicon-download:before {
  content: "\e026";
}
.glyphicon-upload:before {
  content: "\e027";
}
.glyphicon-inbox:before {
  content: "\e028";
}
.glyphicon-play-circle:before {
  content: "\e029";
}
.glyphicon-repeat:before {
  content: "\e030";
}
.glyphicon-refresh:before {
  content: "\e031";
}
.glyphicon-list-alt:before {
  content: "\e032";
}
.glyphicon-lock:before {
  content: "\e033";
}
.glyphicon-flag:before {
  content: "\e034";
}
.glyphicon-headphones:before {
  content: "\e035";
}
.glyphicon-volume-off:before {
  content: "\e036";
}
.glyphicon-volume-down:before {
  content: "\e037";
}
.glyphicon-volume-up:before {
  content: "\e038";
}
.glyphicon-qrcode:before {
  content: "\e039";
}
.glyphicon-barcode:before {
  content: "\e040";
}
.glyphicon-tag:before {
  content: "\e041";
}
.glyphicon-tags:before {
  content: "\e042";
}
.glyphicon-book:before {
  content: "\e043";
}
.glyphicon-bookmark:before {
  content: "\e044";
}
.glyphicon-print:before {
  content: "\e045";
}
.glyphicon-camera:before {
  content: "\e046";
}
.glyphicon-font:before {
  content: "\e047";
}
.glyphicon-bold:before {
  content: "\e048";
}
.glyphicon-italic:before {
  content: "\e049";
}
.glyphicon-text-height:before {
  content: "\e050";
}
.glyphicon-text-width:before {
  content: "\e051";
}
.glyphicon-align-left:before {
  content: "\e052";
}
.glyphicon-align-center:before {
  content: "\e053";
}
.glyphicon-align-right:before {
  content: "\e054";
}
.glyphicon-align-justify:before {
  content: "\e055";
}
.glyphicon-list:before {
  content: "\e056";
}
.glyphicon-indent-left:before {
  content: "\e057";
}
.glyphicon-indent-right:before {
  content: "\e058";
}
.glyphicon-facetime-video:before {
  content: "\e059";
}
.glyphicon-picture:before {
  content: "\e060";
}
.glyphicon-map-marker:before {
  content: "\e062";
}
.glyphicon-adjust:before {
  content: "\e063";
}
.glyphicon-tint:before {
  content: "\e064";
}
.glyphicon-edit:before {
  content: "\e065";
}
.glyphicon-share:before {
  content: "\e066";
}
.glyphicon-check:before {
  content: "\e067";
}
.glyphicon-move:before {
  content: "\e068";
}
.glyphicon-step-backward:before {
  content: "\e069";
}
.glyphicon-fast-backward:before {
  content: "\e070";
}
.glyphicon-backward:before {
  content: "\e071";
}
.glyphicon-play:before {
  content: "\e072";
}
.glyphicon-pause:before {
  content: "\e073";
}
.glyphicon-stop:before {
  content: "\e074";
}
.glyphicon-forward:before {
  content: "\e075";
}
.glyphicon-fast-forward:before {
  content: "\e076";
}
.glyphicon-step-forward:before {
  content: "\e077";
}
.glyphicon-eject:before {
  content: "\e078";
}
.glyphicon-chevron-left:before {
  content: "\e079";
}
.glyphicon-chevron-right:before {
  content: "\e080";
}
.glyphicon-plus-sign:before {
  content: "\e081";
}
.glyphicon-minus-sign:before {
  content: "\e082";
}
.glyphicon-remove-sign:before {
  content: "\e083";
}
.glyphicon-ok-sign:before {
  content: "\e084";
}
.glyphicon-question-sign:before {
  content: "\e085";
}
.glyphicon-info-sign:before {
  content: "\e086";
}
.glyphicon-screenshot:before {
  content: "\e087";
}
.glyphicon-remove-circle:before {
  content: "\e088";
}
.glyphicon-ok-circle:before {
  content: "\e089";
}
.glyphicon-ban-circle:before {
  content: "\e090";
}
.glyphicon-arrow-left:before {
  content: "\e091";
}
.glyphicon-arrow-right:before {
  content: "\e092";
}
.glyphicon-arrow-up:before {
  content: "\e093";
}
.glyphicon-arrow-down:before {
  content: "\e094";
}
.glyphicon-share-alt:before {
  content: "\e095";
}
.glyphicon-resize-full:before {
  content: "\e096";
}
.glyphicon-resize-small:before {
  content: "\e097";
}
.glyphicon-exclamation-sign:before {
  content: "\e101";
}
.glyphicon-gift:before {
  content: "\e102";
}
.glyphicon-leaf:before {
  content: "\e103";
}
.glyphicon-fire:before {
  content: "\e104";
}
.glyphicon-eye-open:before {
  content: "\e105";
}
.glyphicon-eye-close:before {
  content: "\e106";
}
.glyphicon-warning-sign:before {
  content: "\e107";
}
.glyphicon-plane:before {
  content: "\e108";
}
.glyphicon-calendar:before {
  content: "\e109";
}
.glyphicon-random:before {
  content: "\e110";
}
.glyphicon-comment:before {
  content: "\e111";
}
.glyphicon-magnet:before {
  content: "\e112";
}
.glyphicon-chevron-up:before {
  content: "\e113";
}
.glyphicon-chevron-down:before {
  content: "\e114";
}
.glyphicon-retweet:before {
  content: "\e115";
}
.glyphicon-shopping-cart:before {
  content: "\e116";
}
.glyphicon-folder-close:before {
  content: "\e117";
}
.glyphicon-folder-open:before {
  content: "\e118";
}
.glyphicon-resize-vertical:before {
  content: "\e119";
}
.glyphicon-resize-horizontal:before {
  content: "\e120";
}
.glyphicon-hdd:before {
  content: "\e121";
}
.glyphicon-bullhorn:before {
  content: "\e122";
}
.glyphicon-bell:before {
  content: "\e123";
}
.glyphicon-certificate:before {
  content: "\e124";
}
.glyphicon-thumbs-up:before {
  content: "\e125";
}
.glyphicon-thumbs-down:before {
  content: "\e126";
}
.glyphicon-hand-right:before {
  content: "\e127";
}
.glyphicon-hand-left:before {
  content: "\e128";
}
.glyphicon-hand-up:before {
  content: "\e129";
}
.glyphicon-hand-down:before {
  content: "\e130";
}
.glyphicon-circle-arrow-right:before {
  content: "\e131";
}
.glyphicon-circle-arrow-left:before {
  content: "\e132";
}
.glyphicon-circle-arrow-up:before {
  content: "\e133";
}
.glyphicon-circle-arrow-down:before {
  content: "\e134";
}
.glyphicon-globe:before {
  content: "\e135";
}
.glyphicon-wrench:before {
  content: "\e136";
}
.glyphicon-tasks:before {
  content: "\e137";
}
.glyphicon-filter:before {
  content: "\e138";
}
.glyphicon-briefcase:before {
  content: "\e139";
}
.glyphicon-fullscreen:before {
  content: "\e140";
}
.glyphicon-dashboard:before {
  content: "\e141";
}
.glyphicon-paperclip:before {
  content: "\e142";
}
.glyphicon-heart-empty:before {
  content: "\e143";
}
.glyphicon-link:before {
  content: "\e144";
}
.glyphicon-phone:before {
  content: "\e145";
}
.glyphicon-pushpin:before {
  content: "\e146";
}
.glyphicon-usd:before {
  content: "\e148";
}
.glyphicon-gbp:before {
  content: "\e149";
}
.glyphicon-sort:before {
  content: "\e150";
}
.glyphicon-sort-by-alphabet:before {
  content: "\e151";
}
.glyphicon-sort-by-alphabet-alt:before {
  content: "\e152";
}
.glyphicon-sort-by-order:before {
  content: "\e153";
}
.glyphicon-sort-by-order-alt:before {
  content: "\e154";
}
.glyphicon-sort-by-attributes:before {
  content: "\e155";
}
.glyphicon-sort-by-attributes-alt:before {
  content: "\e156";
}
.glyphicon-unchecked:before {
  content: "\e157";
}
.glyphicon-expand:before {
  content: "\e158";
}
.glyphicon-collapse-down:before {
  content: "\e159";
}
.glyphicon-collapse-up:before {
  content: "\e160";
}
.glyphicon-log-in:before {
  content: "\e161";
}
.glyphicon-flash:before {
  content: "\e162";
}
.glyphicon-log-out:before {
  content: "\e163";
}
.glyphicon-new-window:before {
  content: "\e164";
}
.glyphicon-record:before {
  content: "\e165";
}
.glyphicon-save:before {
  content: "\e166";
}
.glyphicon-open:before {
  content: "\e167";
}
.glyphicon-saved:before {
  content: "\e168";
}
.glyphicon-import:before {
  content: "\e169";
}
.glyphicon-export:before {
  content: "\e170";
}
.glyphicon-send:before {
  content: "\e171";
}
.glyphicon-floppy-disk:before {
  content: "\e172";
}
.glyphicon-floppy-saved:before {
  content: "\e173";
}
.glyphicon-floppy-remove:before {
  content: "\e174";
}
.glyphicon-floppy-save:before {
  content: "\e175";
}
.glyphicon-floppy-open:before {
  content: "\e176";
}
.glyphicon-credit-card:before {
  content: "\e177";
}
.glyphicon-transfer:before {
  content: "\e178";
}
.glyphicon-cutlery:before {
  content: "\e179";
}
.glyphicon-header:before {
  content: "\e180";
}
.glyphicon-compressed:before {
  content: "\e181";
}
.glyphicon-earphone:before {
  content: "\e182";
}
.glyphicon-phone-alt:before {
  content: "\e183";
}
.glyphicon-tower:before {
  content: "\e184";
}
.glyphicon-stats:before {
  content: "\e185";
}
.glyphicon-sd-video:before {
  content: "\e186";
}
.glyphicon-hd-video:before {
  content: "\e187";
}
.glyphicon-subtitles:before {
  content: "\e188";
}
.glyphicon-sound-stereo:before {
  content: "\e189";
}
.glyphicon-sound-dolby:before {
  content: "\e190";
}
.glyphicon-sound-5-1:before {
  content: "\e191";
}
.glyphicon-sound-6-1:before {
  content: "\e192";
}
.glyphicon-sound-7-1:before {
  content: "\e193";
}
.glyphicon-copyright-mark:before {
  content: "\e194";
}
.glyphicon-registration-mark:before {
  content: "\e195";
}
.glyphicon-cloud-download:before {
  content: "\e197";
}
.glyphicon-cloud-upload:before {
  content: "\e198";
}
.glyphicon-tree-conifer:before {
  content: "\e199";
}
.glyphicon-tree-deciduous:before {
  content: "\e200";
}
.glyphicon-cd:before {
  content: "\e201";
}
.glyphicon-save-file:before {
  content: "\e202";
}
.glyphicon-open-file:before {
  content: "\e203";
}
.glyphicon-level-up:before {
  content: "\e204";
}
.glyphicon-copy:before {
  content: "\e205";
}
.glyphicon-paste:before {
  content: "\e206";
}
.glyphicon-alert:before {
  content: "\e209";
}
.glyphicon-equalizer:before {
  content: "\e210";
}
.glyphicon-king:before {
  content: "\e211";
}
.glyphicon-queen:before {
  content: "\e212";
}
.glyphicon-pawn:before {
  content: "\e213";
}
.glyphicon-bishop:before {
  content: "\e214";
}
.glyphicon-knight:before {
  content: "\e215";
}
.glyphicon-baby-formula:before {
  content: "\e216";
}
.glyphicon-tent:before {
  content: "\26fa";
}
.glyphicon-blackboard:before {
  content: "\e218";
}
.glyphicon-bed:before {
  content: "\e219";
}
.glyphicon-apple:before {
  content: "\f8ff";
}
.glyphicon-erase:before {
  content: "\e221";
}
.glyphicon-hourglass:before {
  content: "\231b";
}
.glyphicon-lamp:before {
  content: "\e223";
}
.glyphicon-duplicate:before {
  content: "\e224";
}
.glyphicon-piggy-bank:before {
  content: "\e225";
}
.glyphicon-scissors:before {
  content: "\e226";
}
.glyphicon-bitcoin:before {
  content: "\e227";
}
.glyphicon-btc:before {
  content: "\e227";
}
.glyphicon-xbt:before {
  content: "\e227";
}
.glyphicon-yen:before {
  content: "\00a5";
}
.glyphicon-jpy:before {
  content: "\00a5";
}
.glyphicon-ruble:before {
  content: "\20bd";
}
.glyphicon-rub:before {
  content: "\20bd";
}
.glyphicon-scale:before {
  content: "\e230";
}
.glyphicon-ice-lolly:before {
  content: "\e231";
}
.glyphicon-ice-lolly-tasted:before {
  content: "\e232";
}
.glyphicon-education:before {
  content: "\e233";
}
.glyphicon-option-horizontal:before {
  content: "\e234";
}
.glyphicon-option-vertical:before {
  content: "\e235";
}
.glyphicon-menu-hamburger:before {
  content: "\e236";
}
.glyphicon-modal-window:before {
  content: "\e237";
}
.glyphicon-oil:before {
  content: "\e238";
}
.glyphicon-grain:before {
  content: "\e239";
}
.glyphicon-sunglasses:before {
  content: "\e240";
}
.glyphicon-text-size:before {
  content: "\e241";
}
.glyphicon-text-color:before {
  content: "\e242";
}
.glyphicon-text-background:before {
  content: "\e243";
}
.glyphicon-object-align-top:before {
  content: "\e244";
}
.glyphicon-object-align-bottom:before {
  content: "\e245";
}
.glyphicon-object-align-horizontal:before {
  content: "\e246";
}
.glyphicon-object-align-left:before {
  content: "\e247";
}
.glyphicon-object-align-vertical:before {
  content: "\e248";
}
.glyphicon-object-align-right:before {
  content: "\e249";
}
.glyphicon-triangle-right:before {
  content: "\e250";
}
.glyphicon-triangle-left:before {
  content: "\e251";
}
.glyphicon-triangle-bottom:before {
  content: "\e252";
}
.glyphicon-triangle-top:before {
  content: "\e253";
}
.glyphicon-console:before {
  content: "\e254";
}
.glyphicon-superscript:before {
  content: "\e255";
}
.glyphicon-subscript:before {
  content: "\e256";
}
.glyphicon-menu-left:before {
  content: "\e257";
}
.glyphicon-menu-right:before {
  content: "\e258";
}
.glyphicon-menu-down:before {
  content: "\e259";
}
.glyphicon-menu-up:before {
  content: "\e260";
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html {
  font-size: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.42857143;
  color: #000;
  background-color: #fff;
}
input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
a {
  color: #337ab7;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #23527c;
  text-decoration: underline;
}
a:focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
figure {
  margin: 0;
}
img {
  vertical-align: middle;
}
.img-responsive,
.thumbnail > img,
.thumbnail a > img,
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  display: block;
  max-width: 100%;
  height: auto;
}
.img-rounded {
  border-radius: 3px;
}
.img-thumbnail {
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  max-width: 100%;
  height: auto;
}
.img-circle {
  border-radius: 50%;
}
hr {
  margin-top: 18px;
  margin-bottom: 18px;
  border: 0;
  border-top: 1px solid #eeeeee;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
[role="button"] {
  cursor: pointer;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}
h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small,
.h1 small,
.h2 small,
.h3 small,
.h4 small,
.h5 small,
.h6 small,
h1 .small,
h2 .small,
h3 .small,
h4 .small,
h5 .small,
h6 .small,
.h1 .small,
.h2 .small,
.h3 .small,
.h4 .small,
.h5 .small,
.h6 .small {
  font-weight: normal;
  line-height: 1;
  color: #777777;
}
h1,
.h1,
h2,
.h2,
h3,
.h3 {
  margin-top: 18px;
  margin-bottom: 9px;
}
h1 small,
.h1 small,
h2 small,
.h2 small,
h3 small,
.h3 small,
h1 .small,
.h1 .small,
h2 .small,
.h2 .small,
h3 .small,
.h3 .small {
  font-size: 65%;
}
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  margin-top: 9px;
  margin-bottom: 9px;
}
h4 small,
.h4 small,
h5 small,
.h5 small,
h6 small,
.h6 small,
h4 .small,
.h4 .small,
h5 .small,
.h5 .small,
h6 .small,
.h6 .small {
  font-size: 75%;
}
h1,
.h1 {
  font-size: 33px;
}
h2,
.h2 {
  font-size: 27px;
}
h3,
.h3 {
  font-size: 23px;
}
h4,
.h4 {
  font-size: 17px;
}
h5,
.h5 {
  font-size: 13px;
}
h6,
.h6 {
  font-size: 12px;
}
p {
  margin: 0 0 9px;
}
.lead {
  margin-bottom: 18px;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
}
@media (min-width: 768px) {
  .lead {
    font-size: 19.5px;
  }
}
small,
.small {
  font-size: 92%;
}
mark,
.mark {
  background-color: #fcf8e3;
  padding: .2em;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-justify {
  text-align: justify;
}
.text-nowrap {
  white-space: nowrap;
}
.text-lowercase {
  text-transform: lowercase;
}
.text-uppercase {
  text-transform: uppercase;
}
.text-capitalize {
  text-transform: capitalize;
}
.text-muted {
  color: #777777;
}
.text-primary {
  color: #337ab7;
}
a.text-primary:hover,
a.text-primary:focus {
  color: #286090;
}
.text-success {
  color: #3c763d;
}
a.text-success:hover,
a.text-success:focus {
  color: #2b542c;
}
.text-info {
  color: #31708f;
}
a.text-info:hover,
a.text-info:focus {
  color: #245269;
}
.text-warning {
  color: #8a6d3b;
}
a.text-warning:hover,
a.text-warning:focus {
  color: #66512c;
}
.text-danger {
  color: #a94442;
}
a.text-danger:hover,
a.text-danger:focus {
  color: #843534;
}
.bg-primary {
  color: #fff;
  background-color: #337ab7;
}
a.bg-primary:hover,
a.bg-primary:focus {
  background-color: #286090;
}
.bg-success {
  background-color: #dff0d8;
}
a.bg-success:hover,
a.bg-success:focus {
  background-color: #c1e2b3;
}
.bg-info {
  background-color: #d9edf7;
}
a.bg-info:hover,
a.bg-info:focus {
  background-color: #afd9ee;
}
.bg-warning {
  background-color: #fcf8e3;
}
a.bg-warning:hover,
a.bg-warning:focus {
  background-color: #f7ecb5;
}
.bg-danger {
  background-color: #f2dede;
}
a.bg-danger:hover,
a.bg-danger:focus {
  background-color: #e4b9b9;
}
.page-header {
  padding-bottom: 8px;
  margin: 36px 0 18px;
  border-bottom: 1px solid #eeeeee;
}
ul,
ol {
  margin-top: 0;
  margin-bottom: 9px;
}
ul ul,
ol ul,
ul ol,
ol ol {
  margin-bottom: 0;
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
.list-inline {
  padding-left: 0;
  list-style: none;
  margin-left: -5px;
}
.list-inline > li {
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
}
dl {
  margin-top: 0;
  margin-bottom: 18px;
}
dt,
dd {
  line-height: 1.42857143;
}
dt {
  font-weight: bold;
}
dd {
  margin-left: 0;
}
@media (min-width: 541px) {
  .dl-horizontal dt {
    float: left;
    width: 160px;
    clear: left;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dl-horizontal dd {
    margin-left: 180px;
  }
}
abbr[title],
abbr[data-original-title] {
  cursor: help;
  border-bottom: 1px dotted #777777;
}
.initialism {
  font-size: 90%;
  text-transform: uppercase;
}
blockquote {
  padding: 9px 18px;
  margin: 0 0 18px;
  font-size: inherit;
  border-left: 5px solid #eeeeee;
}
blockquote p:last-child,
blockquote ul:last-child,
blockquote ol:last-child {
  margin-bottom: 0;
}
blockquote footer,
blockquote small,
blockquote .small {
  display: block;
  font-size: 80%;
  line-height: 1.42857143;
  color: #777777;
}
blockquote footer:before,
blockquote small:before,
blockquote .small:before {
  content: '\2014 \00A0';
}
.blockquote-reverse,
blockquote.pull-right {
  padding-right: 15px;
  padding-left: 0;
  border-right: 5px solid #eeeeee;
  border-left: 0;
  text-align: right;
}
.blockquote-reverse footer:before,
blockquote.pull-right footer:before,
.blockquote-reverse small:before,
blockquote.pull-right small:before,
.blockquote-reverse .small:before,
blockquote.pull-right .small:before {
  content: '';
}
.blockquote-reverse footer:after,
blockquote.pull-right footer:after,
.blockquote-reverse small:after,
blockquote.pull-right small:after,
.blockquote-reverse .small:after,
blockquote.pull-right .small:after {
  content: '\00A0 \2014';
}
address {
  margin-bottom: 18px;
  font-style: normal;
  line-height: 1.42857143;
}
code,
kbd,
pre,
samp {
  font-family: monospace;
}
code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 2px;
}
kbd {
  padding: 2px 4px;
  font-size: 90%;
  color: #888;
  background-color: transparent;
  border-radius: 1px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
kbd kbd {
  padding: 0;
  font-size: 100%;
  font-weight: bold;
  box-shadow: none;
}
pre {
  display: block;
  padding: 8.5px;
  margin: 0 0 9px;
  font-size: 12px;
  line-height: 1.42857143;
  word-break: break-all;
  word-wrap: break-word;
  color: #333333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px;
}
pre code {
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
}
.pre-scrollable {
  max-height: 340px;
  overflow-y: scroll;
}
.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 0px;
  padding-right: 0px;
}
@media (min-width: 768px) {
  .container {
    width: 768px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 940px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding-left: 0px;
  padding-right: 0px;
}
.row {
  margin-left: 0px;
  margin-right: 0px;
}
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
  position: relative;
  min-height: 1px;
  padding-left: 0px;
  padding-right: 0px;
}
.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
  float: left;
}
.col-xs-12 {
  width: 100%;
}
.col-xs-11 {
  width: 91.66666667%;
}
.col-xs-10 {
  width: 83.33333333%;
}
.col-xs-9 {
  width: 75%;
}
.col-xs-8 {
  width: 66.66666667%;
}
.col-xs-7 {
  width: 58.33333333%;
}
.col-xs-6 {
  width: 50%;
}
.col-xs-5 {
  width: 41.66666667%;
}
.col-xs-4 {
  width: 33.33333333%;
}
.col-xs-3 {
  width: 25%;
}
.col-xs-2 {
  width: 16.66666667%;
}
.col-xs-1 {
  width: 8.33333333%;
}
.col-xs-pull-12 {
  right: 100%;
}
.col-xs-pull-11 {
  right: 91.66666667%;
}
.col-xs-pull-10 {
  right: 83.33333333%;
}
.col-xs-pull-9 {
  right: 75%;
}
.col-xs-pull-8 {
  right: 66.66666667%;
}
.col-xs-pull-7 {
  right: 58.33333333%;
}
.col-xs-pull-6 {
  right: 50%;
}
.col-xs-pull-5 {
  right: 41.66666667%;
}
.col-xs-pull-4 {
  right: 33.33333333%;
}
.col-xs-pull-3 {
  right: 25%;
}
.col-xs-pull-2 {
  right: 16.66666667%;
}
.col-xs-pull-1 {
  right: 8.33333333%;
}
.col-xs-pull-0 {
  right: auto;
}
.col-xs-push-12 {
  left: 100%;
}
.col-xs-push-11 {
  left: 91.66666667%;
}
.col-xs-push-10 {
  left: 83.33333333%;
}
.col-xs-push-9 {
  left: 75%;
}
.col-xs-push-8 {
  left: 66.66666667%;
}
.col-xs-push-7 {
  left: 58.33333333%;
}
.col-xs-push-6 {
  left: 50%;
}
.col-xs-push-5 {
  left: 41.66666667%;
}
.col-xs-push-4 {
  left: 33.33333333%;
}
.col-xs-push-3 {
  left: 25%;
}
.col-xs-push-2 {
  left: 16.66666667%;
}
.col-xs-push-1 {
  left: 8.33333333%;
}
.col-xs-push-0 {
  left: auto;
}
.col-xs-offset-12 {
  margin-left: 100%;
}
.col-xs-offset-11 {
  margin-left: 91.66666667%;
}
.col-xs-offset-10 {
  margin-left: 83.33333333%;
}
.col-xs-offset-9 {
  margin-left: 75%;
}
.col-xs-offset-8 {
  margin-left: 66.66666667%;
}
.col-xs-offset-7 {
  margin-left: 58.33333333%;
}
.col-xs-offset-6 {
  margin-left: 50%;
}
.col-xs-offset-5 {
  margin-left: 41.66666667%;
}
.col-xs-offset-4 {
  margin-left: 33.33333333%;
}
.col-xs-offset-3 {
  margin-left: 25%;
}
.col-xs-offset-2 {
  margin-left: 16.66666667%;
}
.col-xs-offset-1 {
  margin-left: 8.33333333%;
}
.col-xs-offset-0 {
  margin-left: 0%;
}
@media (min-width: 768px) {
  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left;
  }
  .col-sm-12 {
    width: 100%;
  }
  .col-sm-11 {
    width: 91.66666667%;
  }
  .col-sm-10 {
    width: 83.33333333%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-8 {
    width: 66.66666667%;
  }
  .col-sm-7 {
    width: 58.33333333%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-5 {
    width: 41.66666667%;
  }
  .col-sm-4 {
    width: 33.33333333%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-2 {
    width: 16.66666667%;
  }
  .col-sm-1 {
    width: 8.33333333%;
  }
  .col-sm-pull-12 {
    right: 100%;
  }
  .col-sm-pull-11 {
    right: 91.66666667%;
  }
  .col-sm-pull-10 {
    right: 83.33333333%;
  }
  .col-sm-pull-9 {
    right: 75%;
  }
  .col-sm-pull-8 {
    right: 66.66666667%;
  }
  .col-sm-pull-7 {
    right: 58.33333333%;
  }
  .col-sm-pull-6 {
    right: 50%;
  }
  .col-sm-pull-5 {
    right: 41.66666667%;
  }
  .col-sm-pull-4 {
    right: 33.33333333%;
  }
  .col-sm-pull-3 {
    right: 25%;
  }
  .col-sm-pull-2 {
    right: 16.66666667%;
  }
  .col-sm-pull-1 {
    right: 8.33333333%;
  }
  .col-sm-pull-0 {
    right: auto;
  }
  .col-sm-push-12 {
    left: 100%;
  }
  .col-sm-push-11 {
    left: 91.66666667%;
  }
  .col-sm-push-10 {
    left: 83.33333333%;
  }
  .col-sm-push-9 {
    left: 75%;
  }
  .col-sm-push-8 {
    left: 66.66666667%;
  }
  .col-sm-push-7 {
    left: 58.33333333%;
  }
  .col-sm-push-6 {
    left: 50%;
  }
  .col-sm-push-5 {
    left: 41.66666667%;
  }
  .col-sm-push-4 {
    left: 33.33333333%;
  }
  .col-sm-push-3 {
    left: 25%;
  }
  .col-sm-push-2 {
    left: 16.66666667%;
  }
  .col-sm-push-1 {
    left: 8.33333333%;
  }
  .col-sm-push-0 {
    left: auto;
  }
  .col-sm-offset-12 {
    margin-left: 100%;
  }
  .col-sm-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-sm-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-sm-offset-9 {
    margin-left: 75%;
  }
  .col-sm-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-sm-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-sm-offset-6 {
    margin-left: 50%;
  }
  .col-sm-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-sm-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-sm-offset-3 {
    margin-left: 25%;
  }
  .col-sm-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-sm-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-sm-offset-0 {
    margin-left: 0%;
  }
}
@media (min-width: 992px) {
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
  }
  .col-md-12 {
    width: 100%;
  }
  .col-md-11 {
    width: 91.66666667%;
  }
  .col-md-10 {
    width: 83.33333333%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-8 {
    width: 66.66666667%;
  }
  .col-md-7 {
    width: 58.33333333%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-5 {
    width: 41.66666667%;
  }
  .col-md-4 {
    width: 33.33333333%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-1 {
    width: 8.33333333%;
  }
  .col-md-pull-12 {
    right: 100%;
  }
  .col-md-pull-11 {
    right: 91.66666667%;
  }
  .col-md-pull-10 {
    right: 83.33333333%;
  }
  .col-md-pull-9 {
    right: 75%;
  }
  .col-md-pull-8 {
    right: 66.66666667%;
  }
  .col-md-pull-7 {
    right: 58.33333333%;
  }
  .col-md-pull-6 {
    right: 50%;
  }
  .col-md-pull-5 {
    right: 41.66666667%;
  }
  .col-md-pull-4 {
    right: 33.33333333%;
  }
  .col-md-pull-3 {
    right: 25%;
  }
  .col-md-pull-2 {
    right: 16.66666667%;
  }
  .col-md-pull-1 {
    right: 8.33333333%;
  }
  .col-md-pull-0 {
    right: auto;
  }
  .col-md-push-12 {
    left: 100%;
  }
  .col-md-push-11 {
    left: 91.66666667%;
  }
  .col-md-push-10 {
    left: 83.33333333%;
  }
  .col-md-push-9 {
    left: 75%;
  }
  .col-md-push-8 {
    left: 66.66666667%;
  }
  .col-md-push-7 {
    left: 58.33333333%;
  }
  .col-md-push-6 {
    left: 50%;
  }
  .col-md-push-5 {
    left: 41.66666667%;
  }
  .col-md-push-4 {
    left: 33.33333333%;
  }
  .col-md-push-3 {
    left: 25%;
  }
  .col-md-push-2 {
    left: 16.66666667%;
  }
  .col-md-push-1 {
    left: 8.33333333%;
  }
  .col-md-push-0 {
    left: auto;
  }
  .col-md-offset-12 {
    margin-left: 100%;
  }
  .col-md-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-md-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-md-offset-9 {
    margin-left: 75%;
  }
  .col-md-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-md-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-md-offset-6 {
    margin-left: 50%;
  }
  .col-md-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-md-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-md-offset-3 {
    margin-left: 25%;
  }
  .col-md-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-md-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-md-offset-0 {
    margin-left: 0%;
  }
}
@media (min-width: 1200px) {
  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
    float: left;
  }
  .col-lg-12 {
    width: 100%;
  }
  .col-lg-11 {
    width: 91.66666667%;
  }
  .col-lg-10 {
    width: 83.33333333%;
  }
  .col-lg-9 {
    width: 75%;
  }
  .col-lg-8 {
    width: 66.66666667%;
  }
  .col-lg-7 {
    width: 58.33333333%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-5 {
    width: 41.66666667%;
  }
  .col-lg-4 {
    width: 33.33333333%;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-2 {
    width: 16.66666667%;
  }
  .col-lg-1 {
    width: 8.33333333%;
  }
  .col-lg-pull-12 {
    right: 100%;
  }
  .col-lg-pull-11 {
    right: 91.66666667%;
  }
  .col-lg-pull-10 {
    right: 83.33333333%;
  }
  .col-lg-pull-9 {
    right: 75%;
  }
  .col-lg-pull-8 {
    right: 66.66666667%;
  }
  .col-lg-pull-7 {
    right: 58.33333333%;
  }
  .col-lg-pull-6 {
    right: 50%;
  }
  .col-lg-pull-5 {
    right: 41.66666667%;
  }
  .col-lg-pull-4 {
    right: 33.33333333%;
  }
  .col-lg-pull-3 {
    right: 25%;
  }
  .col-lg-pull-2 {
    right: 16.66666667%;
  }
  .col-lg-pull-1 {
    right: 8.33333333%;
  }
  .col-lg-pull-0 {
    right: auto;
  }
  .col-lg-push-12 {
    left: 100%;
  }
  .col-lg-push-11 {
    left: 91.66666667%;
  }
  .col-lg-push-10 {
    left: 83.33333333%;
  }
  .col-lg-push-9 {
    left: 75%;
  }
  .col-lg-push-8 {
    left: 66.66666667%;
  }
  .col-lg-push-7 {
    left: 58.33333333%;
  }
  .col-lg-push-6 {
    left: 50%;
  }
  .col-lg-push-5 {
    left: 41.66666667%;
  }
  .col-lg-push-4 {
    left: 33.33333333%;
  }
  .col-lg-push-3 {
    left: 25%;
  }
  .col-lg-push-2 {
    left: 16.66666667%;
  }
  .col-lg-push-1 {
    left: 8.33333333%;
  }
  .col-lg-push-0 {
    left: auto;
  }
  .col-lg-offset-12 {
    margin-left: 100%;
  }
  .col-lg-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-lg-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-lg-offset-9 {
    margin-left: 75%;
  }
  .col-lg-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-lg-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-lg-offset-6 {
    margin-left: 50%;
  }
  .col-lg-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-lg-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-lg-offset-3 {
    margin-left: 25%;
  }
  .col-lg-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-lg-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-lg-offset-0 {
    margin-left: 0%;
  }
}
table {
  background-color: transparent;
}
caption {
  padding-top: 8px;
  padding-bottom: 8px;
  color: #777777;
  text-align: left;
}
th {
  text-align: left;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 18px;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
.table > tbody + tbody {
  border-top: 2px solid #ddd;
}
.table .table {
  background-color: #fff;
}
.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding: 5px;
}
.table-bordered {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.table-hover > tbody > tr:hover {
  background-color: #f5f5f5;
}
table col[class*="col-"] {
  position: static;
  float: none;
  display: table-column;
}
table td[class*="col-"],
table th[class*="col-"] {
  position: static;
  float: none;
  display: table-cell;
}
.table > thead > tr > td.active,
.table > tbody > tr > td.active,
.table > tfoot > tr > td.active,
.table > thead > tr > th.active,
.table > tbody > tr > th.active,
.table > tfoot > tr > th.active,
.table > thead > tr.active > td,
.table > tbody > tr.active > td,
.table > tfoot > tr.active > td,
.table > thead > tr.active > th,
.table > tbody > tr.active > th,
.table > tfoot > tr.active > th {
  background-color: #f5f5f5;
}
.table-hover > tbody > tr > td.active:hover,
.table-hover > tbody > tr > th.active:hover,
.table-hover > tbody > tr.active:hover > td,
.table-hover > tbody > tr:hover > .active,
.table-hover > tbody > tr.active:hover > th {
  background-color: #e8e8e8;
}
.table > thead > tr > td.success,
.table > tbody > tr > td.success,
.table > tfoot > tr > td.success,
.table > thead > tr > th.success,
.table > tbody > tr > th.success,
.table > tfoot > tr > th.success,
.table > thead > tr.success > td,
.table > tbody > tr.success > td,
.table > tfoot > tr.success > td,
.table > thead > tr.success > th,
.table > tbody > tr.success > th,
.table > tfoot > tr.success > th {
  background-color: #dff0d8;
}
.table-hover > tbody > tr > td.success:hover,
.table-hover > tbody > tr > th.success:hover,
.table-hover > tbody > tr.success:hover > td,
.table-hover > tbody > tr:hover > .success,
.table-hover > tbody > tr.success:hover > th {
  background-color: #d0e9c6;
}
.table > thead > tr > td.info,
.table > tbody > tr > td.info,
.table > tfoot > tr > td.info,
.table > thead > tr > th.info,
.table > tbody > tr > th.info,
.table > tfoot > tr > th.info,
.table > thead > tr.info > td,
.table > tbody > tr.info > td,
.table > tfoot > tr.info > td,
.table > thead > tr.info > th,
.table > tbody > tr.info > th,
.table > tfoot > tr.info > th {
  background-color: #d9edf7;
}
.table-hover > tbody > tr > td.info:hover,
.table-hover > tbody > tr > th.info:hover,
.table-hover > tbody > tr.info:hover > td,
.table-hover > tbody > tr:hover > .info,
.table-hover > tbody > tr.info:hover > th {
  background-color: #c4e3f3;
}
.table > thead > tr > td.warning,
.table > tbody > tr > td.warning,
.table > tfoot > tr > td.warning,
.table > thead > tr > th.warning,
.table > tbody > tr > th.warning,
.table > tfoot > tr > th.warning,
.table > thead > tr.warning > td,
.table > tbody > tr.warning > td,
.table > tfoot > tr.warning > td,
.table > thead > tr.warning > th,
.table > tbody > tr.warning > th,
.table > tfoot > tr.warning > th {
  background-color: #fcf8e3;
}
.table-hover > tbody > tr > td.warning:hover,
.table-hover > tbody > tr > th.warning:hover,
.table-hover > tbody > tr.warning:hover > td,
.table-hover > tbody > tr:hover > .warning,
.table-hover > tbody > tr.warning:hover > th {
  background-color: #faf2cc;
}
.table > thead > tr > td.danger,
.table > tbody > tr > td.danger,
.table > tfoot > tr > td.danger,
.table > thead > tr > th.danger,
.table > tbody > tr > th.danger,
.table > tfoot > tr > th.danger,
.table > thead > tr.danger > td,
.table > tbody > tr.danger > td,
.table > tfoot > tr.danger > td,
.table > thead > tr.danger > th,
.table > tbody > tr.danger > th,
.table > tfoot > tr.danger > th {
  background-color: #f2dede;
}
.table-hover > tbody > tr > td.danger:hover,
.table-hover > tbody > tr > th.danger:hover,
.table-hover > tbody > tr.danger:hover > td,
.table-hover > tbody > tr:hover > .danger,
.table-hover > tbody > tr.danger:hover > th {
  background-color: #ebcccc;
}
.table-responsive {
  overflow-x: auto;
  min-height: 0.01%;
}
@media screen and (max-width: 767px) {
  .table-responsive {
    width: 100%;
    margin-bottom: 13.5px;
    overflow-y: hidden;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: 1px solid #ddd;
  }
  .table-responsive > .table {
    margin-bottom: 0;
  }
  .table-responsive > .table > thead > tr > th,
  .table-responsive > .table > tbody > tr > th,
  .table-responsive > .table > tfoot > tr > th,
  .table-responsive > .table > thead > tr > td,
  .table-responsive > .table > tbody > tr > td,
  .table-responsive > .table > tfoot > tr > td {
    white-space: nowrap;
  }
  .table-responsive > .table-bordered {
    border: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:first-child,
  .table-responsive > .table-bordered > tbody > tr > th:first-child,
  .table-responsive > .table-bordered > tfoot > tr > th:first-child,
  .table-responsive > .table-bordered > thead > tr > td:first-child,
  .table-responsive > .table-bordered > tbody > tr > td:first-child,
  .table-responsive > .table-bordered > tfoot > tr > td:first-child {
    border-left: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:last-child,
  .table-responsive > .table-bordered > tbody > tr > th:last-child,
  .table-responsive > .table-bordered > tfoot > tr > th:last-child,
  .table-responsive > .table-bordered > thead > tr > td:last-child,
  .table-responsive > .table-bordered > tbody > tr > td:last-child,
  .table-responsive > .table-bordered > tfoot > tr > td:last-child {
    border-right: 0;
  }
  .table-responsive > .table-bordered > tbody > tr:last-child > th,
  .table-responsive > .table-bordered > tfoot > tr:last-child > th,
  .table-responsive > .table-bordered > tbody > tr:last-child > td,
  .table-responsive > .table-bordered > tfoot > tr:last-child > td {
    border-bottom: 0;
  }
}
fieldset {
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 0;
}
legend {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 18px;
  font-size: 19.5px;
  line-height: inherit;
  color: #333333;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="search"] {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
input[type="radio"],
input[type="checkbox"] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  line-height: normal;
}
input[type="file"] {
  display: block;
}
input[type="range"] {
  display: block;
  width: 100%;
}
select[multiple],
select[size] {
  height: auto;
}
input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
output {
  display: block;
  padding-top: 7px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
}
.form-control {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.form-control::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.form-control:-ms-input-placeholder {
  color: #999;
}
.form-control::-webkit-input-placeholder {
  color: #999;
}
.form-control::-ms-expand {
  border: 0;
  background-color: transparent;
}
.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
  background-color: #eeeeee;
  opacity: 1;
}
.form-control[disabled],
fieldset[disabled] .form-control {
  cursor: not-allowed;
}
textarea.form-control {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: none;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="date"].form-control,
  input[type="time"].form-control,
  input[type="datetime-local"].form-control,
  input[type="month"].form-control {
    line-height: 32px;
  }
  input[type="date"].input-sm,
  input[type="time"].input-sm,
  input[type="datetime-local"].input-sm,
  input[type="month"].input-sm,
  .input-group-sm input[type="date"],
  .input-group-sm input[type="time"],
  .input-group-sm input[type="datetime-local"],
  .input-group-sm input[type="month"] {
    line-height: 30px;
  }
  input[type="date"].input-lg,
  input[type="time"].input-lg,
  input[type="datetime-local"].input-lg,
  input[type="month"].input-lg,
  .input-group-lg input[type="date"],
  .input-group-lg input[type="time"],
  .input-group-lg input[type="datetime-local"],
  .input-group-lg input[type="month"] {
    line-height: 45px;
  }
}
.form-group {
  margin-bottom: 15px;
}
.radio,
.checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.radio label,
.checkbox label {
  min-height: 18px;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
}
.radio input[type="radio"],
.radio-inline input[type="radio"],
.checkbox input[type="checkbox"],
.checkbox-inline input[type="checkbox"] {
  position: absolute;
  margin-left: -20px;
  margin-top: 4px \9;
}
.radio + .radio,
.checkbox + .checkbox {
  margin-top: -5px;
}
.radio-inline,
.checkbox-inline {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  vertical-align: middle;
  font-weight: normal;
  cursor: pointer;
}
.radio-inline + .radio-inline,
.checkbox-inline + .checkbox-inline {
  margin-top: 0;
  margin-left: 10px;
}
input[type="radio"][disabled],
input[type="checkbox"][disabled],
input[type="radio"].disabled,
input[type="checkbox"].disabled,
fieldset[disabled] input[type="radio"],
fieldset[disabled] input[type="checkbox"] {
  cursor: not-allowed;
}
.radio-inline.disabled,
.checkbox-inline.disabled,
fieldset[disabled] .radio-inline,
fieldset[disabled] .checkbox-inline {
  cursor: not-allowed;
}
.radio.disabled label,
.checkbox.disabled label,
fieldset[disabled] .radio label,
fieldset[disabled] .checkbox label {
  cursor: not-allowed;
}
.form-control-static {
  padding-top: 7px;
  padding-bottom: 7px;
  margin-bottom: 0;
  min-height: 31px;
}
.form-control-static.input-lg,
.form-control-static.input-sm {
  padding-left: 0;
  padding-right: 0;
}
.input-sm {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
select.input-sm {
  height: 30px;
  line-height: 30px;
}
textarea.input-sm,
select[multiple].input-sm {
  height: auto;
}
.form-group-sm .form-control {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.form-group-sm select.form-control {
  height: 30px;
  line-height: 30px;
}
.form-group-sm textarea.form-control,
.form-group-sm select[multiple].form-control {
  height: auto;
}
.form-group-sm .form-control-static {
  height: 30px;
  min-height: 30px;
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.input-lg {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
select.input-lg {
  height: 45px;
  line-height: 45px;
}
textarea.input-lg,
select[multiple].input-lg {
  height: auto;
}
.form-group-lg .form-control {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
.form-group-lg select.form-control {
  height: 45px;
  line-height: 45px;
}
.form-group-lg textarea.form-control,
.form-group-lg select[multiple].form-control {
  height: auto;
}
.form-group-lg .form-control-static {
  height: 45px;
  min-height: 35px;
  padding: 11px 16px;
  font-size: 17px;
  line-height: 1.3333333;
}
.has-feedback {
  position: relative;
}
.has-feedback .form-control {
  padding-right: 40px;
}
.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  pointer-events: none;
}
.input-lg + .form-control-feedback,
.input-group-lg + .form-control-feedback,
.form-group-lg .form-control + .form-control-feedback {
  width: 45px;
  height: 45px;
  line-height: 45px;
}
.input-sm + .form-control-feedback,
.input-group-sm + .form-control-feedback,
.form-group-sm .form-control + .form-control-feedback {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.has-success .help-block,
.has-success .control-label,
.has-success .radio,
.has-success .checkbox,
.has-success .radio-inline,
.has-success .checkbox-inline,
.has-success.radio label,
.has-success.checkbox label,
.has-success.radio-inline label,
.has-success.checkbox-inline label {
  color: #3c763d;
}
.has-success .form-control {
  border-color: #3c763d;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-success .form-control:focus {
  border-color: #2b542c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
}
.has-success .input-group-addon {
  color: #3c763d;
  border-color: #3c763d;
  background-color: #dff0d8;
}
.has-success .form-control-feedback {
  color: #3c763d;
}
.has-warning .help-block,
.has-warning .control-label,
.has-warning .radio,
.has-warning .checkbox,
.has-warning .radio-inline,
.has-warning .checkbox-inline,
.has-warning.radio label,
.has-warning.checkbox label,
.has-warning.radio-inline label,
.has-warning.checkbox-inline label {
  color: #8a6d3b;
}
.has-warning .form-control {
  border-color: #8a6d3b;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-warning .form-control:focus {
  border-color: #66512c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
}
.has-warning .input-group-addon {
  color: #8a6d3b;
  border-color: #8a6d3b;
  background-color: #fcf8e3;
}
.has-warning .form-control-feedback {
  color: #8a6d3b;
}
.has-error .help-block,
.has-error .control-label,
.has-error .radio,
.has-error .checkbox,
.has-error .radio-inline,
.has-error .checkbox-inline,
.has-error.radio label,
.has-error.checkbox label,
.has-error.radio-inline label,
.has-error.checkbox-inline label {
  color: #a94442;
}
.has-error .form-control {
  border-color: #a94442;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-error .form-control:focus {
  border-color: #843534;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
}
.has-error .input-group-addon {
  color: #a94442;
  border-color: #a94442;
  background-color: #f2dede;
}
.has-error .form-control-feedback {
  color: #a94442;
}
.has-feedback label ~ .form-control-feedback {
  top: 23px;
}
.has-feedback label.sr-only ~ .form-control-feedback {
  top: 0;
}
.help-block {
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #404040;
}
@media (min-width: 768px) {
  .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .form-inline .form-control-static {
    display: inline-block;
  }
  .form-inline .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .form-inline .input-group .input-group-addon,
  .form-inline .input-group .input-group-btn,
  .form-inline .input-group .form-control {
    width: auto;
  }
  .form-inline .input-group > .form-control {
    width: 100%;
  }
  .form-inline .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio,
  .form-inline .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio label,
  .form-inline .checkbox label {
    padding-left: 0;
  }
  .form-inline .radio input[type="radio"],
  .form-inline .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .form-inline .has-feedback .form-control-feedback {
    top: 0;
  }
}
.form-horizontal .radio,
.form-horizontal .checkbox,
.form-horizontal .radio-inline,
.form-horizontal .checkbox-inline {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 7px;
}
.form-horizontal .radio,
.form-horizontal .checkbox {
  min-height: 25px;
}
.form-horizontal .form-group {
  margin-left: 0px;
  margin-right: 0px;
}
@media (min-width: 768px) {
  .form-horizontal .control-label {
    text-align: right;
    margin-bottom: 0;
    padding-top: 7px;
  }
}
.form-horizontal .has-feedback .form-control-feedback {
  right: 0px;
}
@media (min-width: 768px) {
  .form-horizontal .form-group-lg .control-label {
    padding-top: 11px;
    font-size: 17px;
  }
}
@media (min-width: 768px) {
  .form-horizontal .form-group-sm .control-label {
    padding-top: 6px;
    font-size: 12px;
  }
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  border-radius: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.btn:hover,
.btn:focus,
.btn.focus {
  color: #333;
  text-decoration: none;
}
.btn:active,
.btn.active {
  outline: 0;
  background-image: none;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn.disabled,
.btn[disabled],
fieldset[disabled] .btn {
  cursor: not-allowed;
  opacity: 0.65;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
}
a.btn.disabled,
fieldset[disabled] a.btn {
  pointer-events: none;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-default:focus,
.btn-default.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
.btn-default:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active:hover,
.btn-default.active:hover,
.open > .dropdown-toggle.btn-default:hover,
.btn-default:active:focus,
.btn-default.active:focus,
.open > .dropdown-toggle.btn-default:focus,
.btn-default:active.focus,
.btn-default.active.focus,
.open > .dropdown-toggle.btn-default.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  background-image: none;
}
.btn-default.disabled:hover,
.btn-default[disabled]:hover,
fieldset[disabled] .btn-default:hover,
.btn-default.disabled:focus,
.btn-default[disabled]:focus,
fieldset[disabled] .btn-default:focus,
.btn-default.disabled.focus,
.btn-default[disabled].focus,
fieldset[disabled] .btn-default.focus {
  background-color: #fff;
  border-color: #ccc;
}
.btn-default .badge {
  color: #fff;
  background-color: #333;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary:focus,
.btn-primary.focus {
  color: #fff;
  background-color: #286090;
  border-color: #122b40;
}
.btn-primary:hover {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-primary:active:hover,
.btn-primary.active:hover,
.open > .dropdown-toggle.btn-primary:hover,
.btn-primary:active:focus,
.btn-primary.active:focus,
.open > .dropdown-toggle.btn-primary:focus,
.btn-primary:active.focus,
.btn-primary.active.focus,
.open > .dropdown-toggle.btn-primary.focus {
  color: #fff;
  background-color: #204d74;
  border-color: #122b40;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  background-image: none;
}
.btn-primary.disabled:hover,
.btn-primary[disabled]:hover,
fieldset[disabled] .btn-primary:hover,
.btn-primary.disabled:focus,
.btn-primary[disabled]:focus,
fieldset[disabled] .btn-primary:focus,
.btn-primary.disabled.focus,
.btn-primary[disabled].focus,
fieldset[disabled] .btn-primary.focus {
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary .badge {
  color: #337ab7;
  background-color: #fff;
}
.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success:focus,
.btn-success.focus {
  color: #fff;
  background-color: #449d44;
  border-color: #255625;
}
.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active:hover,
.btn-success.active:hover,
.open > .dropdown-toggle.btn-success:hover,
.btn-success:active:focus,
.btn-success.active:focus,
.open > .dropdown-toggle.btn-success:focus,
.btn-success:active.focus,
.btn-success.active.focus,
.open > .dropdown-toggle.btn-success.focus {
  color: #fff;
  background-color: #398439;
  border-color: #255625;
}
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  background-image: none;
}
.btn-success.disabled:hover,
.btn-success[disabled]:hover,
fieldset[disabled] .btn-success:hover,
.btn-success.disabled:focus,
.btn-success[disabled]:focus,
fieldset[disabled] .btn-success:focus,
.btn-success.disabled.focus,
.btn-success[disabled].focus,
fieldset[disabled] .btn-success.focus {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success .badge {
  color: #5cb85c;
  background-color: #fff;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info:focus,
.btn-info.focus {
  color: #fff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
.btn-info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active:hover,
.btn-info.active:hover,
.open > .dropdown-toggle.btn-info:hover,
.btn-info:active:focus,
.btn-info.active:focus,
.open > .dropdown-toggle.btn-info:focus,
.btn-info:active.focus,
.btn-info.active.focus,
.open > .dropdown-toggle.btn-info.focus {
  color: #fff;
  background-color: #269abc;
  border-color: #1b6d85;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  background-image: none;
}
.btn-info.disabled:hover,
.btn-info[disabled]:hover,
fieldset[disabled] .btn-info:hover,
.btn-info.disabled:focus,
.btn-info[disabled]:focus,
fieldset[disabled] .btn-info:focus,
.btn-info.disabled.focus,
.btn-info[disabled].focus,
fieldset[disabled] .btn-info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.btn-warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning:focus,
.btn-warning.focus {
  color: #fff;
  background-color: #ec971f;
  border-color: #985f0d;
}
.btn-warning:hover {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.btn-warning:active:hover,
.btn-warning.active:hover,
.open > .dropdown-toggle.btn-warning:hover,
.btn-warning:active:focus,
.btn-warning.active:focus,
.open > .dropdown-toggle.btn-warning:focus,
.btn-warning:active.focus,
.btn-warning.active.focus,
.open > .dropdown-toggle.btn-warning.focus {
  color: #fff;
  background-color: #d58512;
  border-color: #985f0d;
}
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  background-image: none;
}
.btn-warning.disabled:hover,
.btn-warning[disabled]:hover,
fieldset[disabled] .btn-warning:hover,
.btn-warning.disabled:focus,
.btn-warning[disabled]:focus,
fieldset[disabled] .btn-warning:focus,
.btn-warning.disabled.focus,
.btn-warning[disabled].focus,
fieldset[disabled] .btn-warning.focus {
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning .badge {
  color: #f0ad4e;
  background-color: #fff;
}
.btn-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger:focus,
.btn-danger.focus {
  color: #fff;
  background-color: #c9302c;
  border-color: #761c19;
}
.btn-danger:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.btn-danger:active:hover,
.btn-danger.active:hover,
.open > .dropdown-toggle.btn-danger:hover,
.btn-danger:active:focus,
.btn-danger.active:focus,
.open > .dropdown-toggle.btn-danger:focus,
.btn-danger:active.focus,
.btn-danger.active.focus,
.open > .dropdown-toggle.btn-danger.focus {
  color: #fff;
  background-color: #ac2925;
  border-color: #761c19;
}
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  background-image: none;
}
.btn-danger.disabled:hover,
.btn-danger[disabled]:hover,
fieldset[disabled] .btn-danger:hover,
.btn-danger.disabled:focus,
.btn-danger[disabled]:focus,
fieldset[disabled] .btn-danger:focus,
.btn-danger.disabled.focus,
.btn-danger[disabled].focus,
fieldset[disabled] .btn-danger.focus {
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger .badge {
  color: #d9534f;
  background-color: #fff;
}
.btn-link {
  color: #337ab7;
  font-weight: normal;
  border-radius: 0;
}
.btn-link,
.btn-link:active,
.btn-link.active,
.btn-link[disabled],
fieldset[disabled] .btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn-link,
.btn-link:hover,
.btn-link:focus,
.btn-link:active {
  border-color: transparent;
}
.btn-link:hover,
.btn-link:focus {
  color: #23527c;
  text-decoration: underline;
  background-color: transparent;
}
.btn-link[disabled]:hover,
fieldset[disabled] .btn-link:hover,
.btn-link[disabled]:focus,
fieldset[disabled] .btn-link:focus {
  color: #777777;
  text-decoration: none;
}
.btn-lg,
.btn-group-lg > .btn {
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.btn-xs,
.btn-group-xs > .btn {
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-block + .btn-block {
  margin-top: 5px;
}
input[type="submit"].btn-block,
input[type="reset"].btn-block,
input[type="button"].btn-block {
  width: 100%;
}
.fade {
  opacity: 0;
  -webkit-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}
.fade.in {
  opacity: 1;
}
.collapse {
  display: none;
}
.collapse.in {
  display: block;
}
tr.collapse.in {
  display: table-row;
}
tbody.collapse.in {
  display: table-row-group;
}
.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition-property: height, visibility;
  transition-property: height, visibility;
  -webkit-transition-duration: 0.35s;
  transition-duration: 0.35s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
.dropup,
.dropdown {
  position: relative;
}
.dropdown-toggle:focus {
  outline: 0;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 13px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}
.dropdown-menu.pull-right {
  right: 0;
  left: auto;
}
.dropdown-menu .divider {
  height: 1px;
  margin: 8px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333333;
  white-space: nowrap;
}
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  text-decoration: none;
  color: #262626;
  background-color: #f5f5f5;
}
.dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  background-color: #337ab7;
}
.dropdown-menu > .disabled > a,
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  color: #777777;
}
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  text-decoration: none;
  background-color: transparent;
  background-image: none;
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  cursor: not-allowed;
}
.open > .dropdown-menu {
  display: block;
}
.open > a {
  outline: 0;
}
.dropdown-menu-right {
  left: auto;
  right: 0;
}
.dropdown-menu-left {
  left: 0;
  right: auto;
}
.dropdown-header {
  display: block;
  padding: 3px 20px;
  font-size: 12px;
  line-height: 1.42857143;
  color: #777777;
  white-space: nowrap;
}
.dropdown-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 990;
}
.pull-right > .dropdown-menu {
  right: 0;
  left: auto;
}
.dropup .caret,
.navbar-fixed-bottom .dropdown .caret {
  border-top: 0;
  border-bottom: 4px dashed;
  border-bottom: 4px solid \9;
  content: "";
}
.dropup .dropdown-menu,
.navbar-fixed-bottom .dropdown .dropdown-menu {
  top: auto;
  bottom: 100%;
  margin-bottom: 2px;
}
@media (min-width: 541px) {
  .navbar-right .dropdown-menu {
    left: auto;
    right: 0;
  }
  .navbar-right .dropdown-menu-left {
    left: 0;
    right: auto;
  }
}
.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.btn-group > .btn,
.btn-group-vertical > .btn {
  position: relative;
  float: left;
}
.btn-group > .btn:hover,
.btn-group-vertical > .btn:hover,
.btn-group > .btn:focus,
.btn-group-vertical > .btn:focus,
.btn-group > .btn:active,
.btn-group-vertical > .btn:active,
.btn-group > .btn.active,
.btn-group-vertical > .btn.active {
  z-index: 2;
}
.btn-group .btn + .btn,
.btn-group .btn + .btn-group,
.btn-group .btn-group + .btn,
.btn-group .btn-group + .btn-group {
  margin-left: -1px;
}
.btn-toolbar {
  margin-left: -5px;
}
.btn-toolbar .btn,
.btn-toolbar .btn-group,
.btn-toolbar .input-group {
  float: left;
}
.btn-toolbar > .btn,
.btn-toolbar > .btn-group,
.btn-toolbar > .input-group {
  margin-left: 5px;
}
.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
  border-radius: 0;
}
.btn-group > .btn:first-child {
  margin-left: 0;
}
.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.btn-group > .btn:last-child:not(:first-child),
.btn-group > .dropdown-toggle:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.btn-group > .btn-group {
  float: left;
}
.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.btn-group .dropdown-toggle:active,
.btn-group.open .dropdown-toggle {
  outline: 0;
}
.btn-group > .btn + .dropdown-toggle {
  padding-left: 8px;
  padding-right: 8px;
}
.btn-group > .btn-lg + .dropdown-toggle {
  padding-left: 12px;
  padding-right: 12px;
}
.btn-group.open .dropdown-toggle {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn-group.open .dropdown-toggle.btn-link {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn .caret {
  margin-left: 0;
}
.btn-lg .caret {
  border-width: 5px 5px 0;
  border-bottom-width: 0;
}
.dropup .btn-lg .caret {
  border-width: 0 5px 5px;
}
.btn-group-vertical > .btn,
.btn-group-vertical > .btn-group,
.btn-group-vertical > .btn-group > .btn {
  display: block;
  float: none;
  width: 100%;
  max-width: 100%;
}
.btn-group-vertical > .btn-group > .btn {
  float: none;
}
.btn-group-vertical > .btn + .btn,
.btn-group-vertical > .btn + .btn-group,
.btn-group-vertical > .btn-group + .btn,
.btn-group-vertical > .btn-group + .btn-group {
  margin-top: -1px;
  margin-left: 0;
}
.btn-group-vertical > .btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.btn-group-vertical > .btn:first-child:not(:last-child) {
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn:last-child:not(:first-child) {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.btn-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}
.btn-group-justified > .btn,
.btn-group-justified > .btn-group {
  float: none;
  display: table-cell;
  width: 1%;
}
.btn-group-justified > .btn-group .btn {
  width: 100%;
}
.btn-group-justified > .btn-group .dropdown-menu {
  left: auto;
}
[data-toggle="buttons"] > .btn input[type="radio"],
[data-toggle="buttons"] > .btn-group > .btn input[type="radio"],
[data-toggle="buttons"] > .btn input[type="checkbox"],
[data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}
.input-group[class*="col-"] {
  float: none;
  padding-left: 0;
  padding-right: 0;
}
.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
}
.input-group .form-control:focus {
  z-index: 3;
}
.input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
select.input-group-lg > .form-control,
select.input-group-lg > .input-group-addon,
select.input-group-lg > .input-group-btn > .btn {
  height: 45px;
  line-height: 45px;
}
textarea.input-group-lg > .form-control,
textarea.input-group-lg > .input-group-addon,
textarea.input-group-lg > .input-group-btn > .btn,
select[multiple].input-group-lg > .form-control,
select[multiple].input-group-lg > .input-group-addon,
select[multiple].input-group-lg > .input-group-btn > .btn {
  height: auto;
}
.input-group-sm > .form-control,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
select.input-group-sm > .form-control,
select.input-group-sm > .input-group-addon,
select.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  line-height: 30px;
}
textarea.input-group-sm > .form-control,
textarea.input-group-sm > .input-group-addon,
textarea.input-group-sm > .input-group-btn > .btn,
select[multiple].input-group-sm > .form-control,
select[multiple].input-group-sm > .input-group-addon,
select[multiple].input-group-sm > .input-group-btn > .btn {
  height: auto;
}
.input-group-addon,
.input-group-btn,
.input-group .form-control {
  display: table-cell;
}
.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child),
.input-group .form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.input-group-addon,
.input-group-btn {
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}
.input-group-addon {
  padding: 6px 12px;
  font-size: 13px;
  font-weight: normal;
  line-height: 1;
  color: #555555;
  text-align: center;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.input-group-addon.input-sm {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 1px;
}
.input-group-addon.input-lg {
  padding: 10px 16px;
  font-size: 17px;
  border-radius: 3px;
}
.input-group-addon input[type="radio"],
.input-group-addon input[type="checkbox"] {
  margin-top: 0;
}
.input-group .form-control:first-child,
.input-group-addon:first-child,
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group > .btn,
.input-group-btn:first-child > .dropdown-toggle,
.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),
.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.input-group-addon:first-child {
  border-right: 0;
}
.input-group .form-control:last-child,
.input-group-addon:last-child,
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group > .btn,
.input-group-btn:last-child > .dropdown-toggle,
.input-group-btn:first-child > .btn:not(:first-child),
.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.input-group-addon:last-child {
  border-left: 0;
}
.input-group-btn {
  position: relative;
  font-size: 0;
  white-space: nowrap;
}
.input-group-btn > .btn {
  position: relative;
}
.input-group-btn > .btn + .btn {
  margin-left: -1px;
}
.input-group-btn > .btn:hover,
.input-group-btn > .btn:focus,
.input-group-btn > .btn:active {
  z-index: 2;
}
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group {
  margin-right: -1px;
}
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group {
  z-index: 2;
  margin-left: -1px;
}
.nav {
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
}
.nav > li {
  position: relative;
  display: block;
}
.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.nav > li > a:hover,
.nav > li > a:focus {
  text-decoration: none;
  background-color: #eeeeee;
}
.nav > li.disabled > a {
  color: #777777;
}
.nav > li.disabled > a:hover,
.nav > li.disabled > a:focus {
  color: #777777;
  text-decoration: none;
  background-color: transparent;
  cursor: not-allowed;
}
.nav .open > a,
.nav .open > a:hover,
.nav .open > a:focus {
  background-color: #eeeeee;
  border-color: #337ab7;
}
.nav .nav-divider {
  height: 1px;
  margin: 8px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.nav > li > a > img {
  max-width: none;
}
.nav-tabs {
  border-bottom: 1px solid #ddd;
}
.nav-tabs > li {
  float: left;
  margin-bottom: -1px;
}
.nav-tabs > li > a {
  margin-right: 2px;
  line-height: 1.42857143;
  border: 1px solid transparent;
  border-radius: 2px 2px 0 0;
}
.nav-tabs > li > a:hover {
  border-color: #eeeeee #eeeeee #ddd;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: #555555;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
  cursor: default;
}
.nav-tabs.nav-justified {
  width: 100%;
  border-bottom: 0;
}
.nav-tabs.nav-justified > li {
  float: none;
}
.nav-tabs.nav-justified > li > a {
  text-align: center;
  margin-bottom: 5px;
}
.nav-tabs.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-tabs.nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs.nav-justified > li > a {
  margin-right: 0;
  border-radius: 2px;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 2px 2px 0 0;
  }
  .nav-tabs.nav-justified > .active > a,
  .nav-tabs.nav-justified > .active > a:hover,
  .nav-tabs.nav-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.nav-pills > li {
  float: left;
}
.nav-pills > li > a {
  border-radius: 2px;
}
.nav-pills > li + li {
  margin-left: 2px;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:hover,
.nav-pills > li.active > a:focus {
  color: #fff;
  background-color: #337ab7;
}
.nav-stacked > li {
  float: none;
}
.nav-stacked > li + li {
  margin-top: 2px;
  margin-left: 0;
}
.nav-justified {
  width: 100%;
}
.nav-justified > li {
  float: none;
}
.nav-justified > li > a {
  text-align: center;
  margin-bottom: 5px;
}
.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs-justified {
  border-bottom: 0;
}
.nav-tabs-justified > li > a {
  margin-right: 0;
  border-radius: 2px;
}
.nav-tabs-justified > .active > a,
.nav-tabs-justified > .active > a:hover,
.nav-tabs-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 2px 2px 0 0;
  }
  .nav-tabs-justified > .active > a,
  .nav-tabs-justified > .active > a:hover,
  .nav-tabs-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}
.nav-tabs .dropdown-menu {
  margin-top: -1px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.navbar {
  position: relative;
  min-height: 30px;
  margin-bottom: 18px;
  border: 1px solid transparent;
}
@media (min-width: 541px) {
  .navbar {
    border-radius: 2px;
  }
}
@media (min-width: 541px) {
  .navbar-header {
    float: left;
  }
}
.navbar-collapse {
  overflow-x: visible;
  padding-right: 0px;
  padding-left: 0px;
  border-top: 1px solid transparent;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  -webkit-overflow-scrolling: touch;
}
.navbar-collapse.in {
  overflow-y: auto;
}
@media (min-width: 541px) {
  .navbar-collapse {
    width: auto;
    border-top: 0;
    box-shadow: none;
  }
  .navbar-collapse.collapse {
    display: block !important;
    height: auto !important;
    padding-bottom: 0;
    overflow: visible !important;
  }
  .navbar-collapse.in {
    overflow-y: visible;
  }
  .navbar-fixed-top .navbar-collapse,
  .navbar-static-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    padding-left: 0;
    padding-right: 0;
  }
}
.navbar-fixed-top .navbar-collapse,
.navbar-fixed-bottom .navbar-collapse {
  max-height: 340px;
}
@media (max-device-width: 540px) and (orientation: landscape) {
  .navbar-fixed-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    max-height: 200px;
  }
}
.container > .navbar-header,
.container-fluid > .navbar-header,
.container > .navbar-collapse,
.container-fluid > .navbar-collapse {
  margin-right: 0px;
  margin-left: 0px;
}
@media (min-width: 541px) {
  .container > .navbar-header,
  .container-fluid > .navbar-header,
  .container > .navbar-collapse,
  .container-fluid > .navbar-collapse {
    margin-right: 0;
    margin-left: 0;
  }
}
.navbar-static-top {
  z-index: 1000;
  border-width: 0 0 1px;
}
@media (min-width: 541px) {
  .navbar-static-top {
    border-radius: 0;
  }
}
.navbar-fixed-top,
.navbar-fixed-bottom {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
}
@media (min-width: 541px) {
  .navbar-fixed-top,
  .navbar-fixed-bottom {
    border-radius: 0;
  }
}
.navbar-fixed-top {
  top: 0;
  border-width: 0 0 1px;
}
.navbar-fixed-bottom {
  bottom: 0;
  margin-bottom: 0;
  border-width: 1px 0 0;
}
.navbar-brand {
  float: left;
  padding: 6px 0px;
  font-size: 17px;
  line-height: 18px;
  height: 30px;
}
.navbar-brand:hover,
.navbar-brand:focus {
  text-decoration: none;
}
.navbar-brand > img {
  display: block;
}
@media (min-width: 541px) {
  .navbar > .container .navbar-brand,
  .navbar > .container-fluid .navbar-brand {
    margin-left: 0px;
  }
}
.navbar-toggle {
  position: relative;
  float: right;
  margin-right: 0px;
  padding: 9px 10px;
  margin-top: -2px;
  margin-bottom: -2px;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 2px;
}
.navbar-toggle:focus {
  outline: 0;
}
.navbar-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
}
.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 4px;
}
@media (min-width: 541px) {
  .navbar-toggle {
    display: none;
  }
}
.navbar-nav {
  margin: 3px 0px;
}
.navbar-nav > li > a {
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 18px;
}
@media (max-width: 540px) {
  .navbar-nav .open .dropdown-menu {
    position: static;
    float: none;
    width: auto;
    margin-top: 0;
    background-color: transparent;
    border: 0;
    box-shadow: none;
  }
  .navbar-nav .open .dropdown-menu > li > a,
  .navbar-nav .open .dropdown-menu .dropdown-header {
    padding: 5px 15px 5px 25px;
  }
  .navbar-nav .open .dropdown-menu > li > a {
    line-height: 18px;
  }
  .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-nav .open .dropdown-menu > li > a:focus {
    background-image: none;
  }
}
@media (min-width: 541px) {
  .navbar-nav {
    float: left;
    margin: 0;
  }
  .navbar-nav > li {
    float: left;
  }
  .navbar-nav > li > a {
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
.navbar-form {
  margin-left: 0px;
  margin-right: 0px;
  padding: 10px 0px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: -1px;
  margin-bottom: -1px;
}
@media (min-width: 768px) {
  .navbar-form .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .navbar-form .form-control-static {
    display: inline-block;
  }
  .navbar-form .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .navbar-form .input-group .input-group-addon,
  .navbar-form .input-group .input-group-btn,
  .navbar-form .input-group .form-control {
    width: auto;
  }
  .navbar-form .input-group > .form-control {
    width: 100%;
  }
  .navbar-form .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio,
  .navbar-form .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio label,
  .navbar-form .checkbox label {
    padding-left: 0;
  }
  .navbar-form .radio input[type="radio"],
  .navbar-form .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .navbar-form .has-feedback .form-control-feedback {
    top: 0;
  }
}
@media (max-width: 540px) {
  .navbar-form .form-group {
    margin-bottom: 5px;
  }
  .navbar-form .form-group:last-child {
    margin-bottom: 0;
  }
}
@media (min-width: 541px) {
  .navbar-form {
    width: auto;
    border: 0;
    margin-left: 0;
    margin-right: 0;
    padding-top: 0;
    padding-bottom: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
.navbar-nav > li > .dropdown-menu {
  margin-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {
  margin-bottom: 0;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.navbar-btn {
  margin-top: -1px;
  margin-bottom: -1px;
}
.navbar-btn.btn-sm {
  margin-top: 0px;
  margin-bottom: 0px;
}
.navbar-btn.btn-xs {
  margin-top: 4px;
  margin-bottom: 4px;
}
.navbar-text {
  margin-top: 6px;
  margin-bottom: 6px;
}
@media (min-width: 541px) {
  .navbar-text {
    float: left;
    margin-left: 0px;
    margin-right: 0px;
  }
}
@media (min-width: 541px) {
  .navbar-left {
    float: left !important;
    float: left;
  }
  .navbar-right {
    float: right !important;
    float: right;
    margin-right: 0px;
  }
  .navbar-right ~ .navbar-right {
    margin-right: 0;
  }
}
.navbar-default {
  background-color: #f8f8f8;
  border-color: #e7e7e7;
}
.navbar-default .navbar-brand {
  color: #777;
}
.navbar-default .navbar-brand:hover,
.navbar-default .navbar-brand:focus {
  color: #5e5e5e;
  background-color: transparent;
}
.navbar-default .navbar-text {
  color: #777;
}
.navbar-default .navbar-nav > li > a {
  color: #777;
}
.navbar-default .navbar-nav > li > a:hover,
.navbar-default .navbar-nav > li > a:focus {
  color: #333;
  background-color: transparent;
}
.navbar-default .navbar-nav > .active > a,
.navbar-default .navbar-nav > .active > a:hover,
.navbar-default .navbar-nav > .active > a:focus {
  color: #555;
  background-color: #e7e7e7;
}
.navbar-default .navbar-nav > .disabled > a,
.navbar-default .navbar-nav > .disabled > a:hover,
.navbar-default .navbar-nav > .disabled > a:focus {
  color: #ccc;
  background-color: transparent;
}
.navbar-default .navbar-toggle {
  border-color: #ddd;
}
.navbar-default .navbar-toggle:hover,
.navbar-default .navbar-toggle:focus {
  background-color: #ddd;
}
.navbar-default .navbar-toggle .icon-bar {
  background-color: #888;
}
.navbar-default .navbar-collapse,
.navbar-default .navbar-form {
  border-color: #e7e7e7;
}
.navbar-default .navbar-nav > .open > a,
.navbar-default .navbar-nav > .open > a:hover,
.navbar-default .navbar-nav > .open > a:focus {
  background-color: #e7e7e7;
  color: #555;
}
@media (max-width: 540px) {
  .navbar-default .navbar-nav .open .dropdown-menu > li > a {
    color: #777;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #333;
    background-color: transparent;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #555;
    background-color: #e7e7e7;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #ccc;
    background-color: transparent;
  }
}
.navbar-default .navbar-link {
  color: #777;
}
.navbar-default .navbar-link:hover {
  color: #333;
}
.navbar-default .btn-link {
  color: #777;
}
.navbar-default .btn-link:hover,
.navbar-default .btn-link:focus {
  color: #333;
}
.navbar-default .btn-link[disabled]:hover,
fieldset[disabled] .navbar-default .btn-link:hover,
.navbar-default .btn-link[disabled]:focus,
fieldset[disabled] .navbar-default .btn-link:focus {
  color: #ccc;
}
.navbar-inverse {
  background-color: #222;
  border-color: #080808;
}
.navbar-inverse .navbar-brand {
  color: #9d9d9d;
}
.navbar-inverse .navbar-brand:hover,
.navbar-inverse .navbar-brand:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-text {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a:hover,
.navbar-inverse .navbar-nav > li > a:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus {
  color: #fff;
  background-color: #080808;
}
.navbar-inverse .navbar-nav > .disabled > a,
.navbar-inverse .navbar-nav > .disabled > a:hover,
.navbar-inverse .navbar-nav > .disabled > a:focus {
  color: #444;
  background-color: transparent;
}
.navbar-inverse .navbar-toggle {
  border-color: #333;
}
.navbar-inverse .navbar-toggle:hover,
.navbar-inverse .navbar-toggle:focus {
  background-color: #333;
}
.navbar-inverse .navbar-toggle .icon-bar {
  background-color: #fff;
}
.navbar-inverse .navbar-collapse,
.navbar-inverse .navbar-form {
  border-color: #101010;
}
.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:hover,
.navbar-inverse .navbar-nav > .open > a:focus {
  background-color: #080808;
  color: #fff;
}
@media (max-width: 540px) {
  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {
    border-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {
    color: #9d9d9d;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #fff;
    background-color: transparent;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #444;
    background-color: transparent;
  }
}
.navbar-inverse .navbar-link {
  color: #9d9d9d;
}
.navbar-inverse .navbar-link:hover {
  color: #fff;
}
.navbar-inverse .btn-link {
  color: #9d9d9d;
}
.navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link:focus {
  color: #fff;
}
.navbar-inverse .btn-link[disabled]:hover,
fieldset[disabled] .navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link[disabled]:focus,
fieldset[disabled] .navbar-inverse .btn-link:focus {
  color: #444;
}
.breadcrumb {
  padding: 8px 15px;
  margin-bottom: 18px;
  list-style: none;
  background-color: #f5f5f5;
  border-radius: 2px;
}
.breadcrumb > li {
  display: inline-block;
}
.breadcrumb > li + li:before {
  content: "/\00a0";
  padding: 0 5px;
  color: #5e5e5e;
}
.breadcrumb > .active {
  color: #777777;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 18px 0;
  border-radius: 2px;
}
.pagination > li {
  display: inline;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  text-decoration: none;
  color: #337ab7;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  z-index: 2;
  color: #23527c;
  background-color: #eeeeee;
  border-color: #ddd;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 3;
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
  cursor: default;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #777777;
  background-color: #fff;
  border-color: #ddd;
  cursor: not-allowed;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-bottom-left-radius: 1px;
  border-top-left-radius: 1px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-bottom-right-radius: 1px;
  border-top-right-radius: 1px;
}
.pager {
  padding-left: 0;
  margin: 18px 0;
  list-style: none;
  text-align: center;
}
.pager li {
  display: inline;
}
.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}
.pager li > a:hover,
.pager li > a:focus {
  text-decoration: none;
  background-color: #eeeeee;
}
.pager .next > a,
.pager .next > span {
  float: right;
}
.pager .previous > a,
.pager .previous > span {
  float: left;
}
.pager .disabled > a,
.pager .disabled > a:hover,
.pager .disabled > a:focus,
.pager .disabled > span {
  color: #777777;
  background-color: #fff;
  cursor: not-allowed;
}
.label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
a.label:hover,
a.label:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.label:empty {
  display: none;
}
.btn .label {
  position: relative;
  top: -1px;
}
.label-default {
  background-color: #777777;
}
.label-default[href]:hover,
.label-default[href]:focus {
  background-color: #5e5e5e;
}
.label-primary {
  background-color: #337ab7;
}
.label-primary[href]:hover,
.label-primary[href]:focus {
  background-color: #286090;
}
.label-success {
  background-color: #5cb85c;
}
.label-success[href]:hover,
.label-success[href]:focus {
  background-color: #449d44;
}
.label-info {
  background-color: #5bc0de;
}
.label-info[href]:hover,
.label-info[href]:focus {
  background-color: #31b0d5;
}
.label-warning {
  background-color: #f0ad4e;
}
.label-warning[href]:hover,
.label-warning[href]:focus {
  background-color: #ec971f;
}
.label-danger {
  background-color: #d9534f;
}
.label-danger[href]:hover,
.label-danger[href]:focus {
  background-color: #c9302c;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  line-height: 1;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
  background-color: #777777;
  border-radius: 10px;
}
.badge:empty {
  display: none;
}
.btn .badge {
  position: relative;
  top: -1px;
}
.btn-xs .badge,
.btn-group-xs > .btn .badge {
  top: 0;
  padding: 1px 5px;
}
a.badge:hover,
a.badge:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.list-group-item.active > .badge,
.nav-pills > .active > a > .badge {
  color: #337ab7;
  background-color: #fff;
}
.list-group-item > .badge {
  float: right;
}
.list-group-item > .badge + .badge {
  margin-right: 5px;
}
.nav-pills > li > a > .badge {
  margin-left: 3px;
}
.jumbotron {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eeeeee;
}
.jumbotron h1,
.jumbotron .h1 {
  color: inherit;
}
.jumbotron p {
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 200;
}
.jumbotron > hr {
  border-top-color: #d5d5d5;
}
.container .jumbotron,
.container-fluid .jumbotron {
  border-radius: 3px;
  padding-left: 0px;
  padding-right: 0px;
}
.jumbotron .container {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .jumbotron {
    padding-top: 48px;
    padding-bottom: 48px;
  }
  .container .jumbotron,
  .container-fluid .jumbotron {
    padding-left: 60px;
    padding-right: 60px;
  }
  .jumbotron h1,
  .jumbotron .h1 {
    font-size: 59px;
  }
}
.thumbnail {
  display: block;
  padding: 4px;
  margin-bottom: 18px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  -webkit-transition: border 0.2s ease-in-out;
  -o-transition: border 0.2s ease-in-out;
  transition: border 0.2s ease-in-out;
}
.thumbnail > img,
.thumbnail a > img {
  margin-left: auto;
  margin-right: auto;
}
a.thumbnail:hover,
a.thumbnail:focus,
a.thumbnail.active {
  border-color: #337ab7;
}
.thumbnail .caption {
  padding: 9px;
  color: #000;
}
.alert {
  padding: 15px;
  margin-bottom: 18px;
  border: 1px solid transparent;
  border-radius: 2px;
}
.alert h4 {
  margin-top: 0;
  color: inherit;
}
.alert .alert-link {
  font-weight: bold;
}
.alert > p,
.alert > ul {
  margin-bottom: 0;
}
.alert > p + p {
  margin-top: 5px;
}
.alert-dismissable,
.alert-dismissible {
  padding-right: 35px;
}
.alert-dismissable .close,
.alert-dismissible .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}
.alert-success {
  background-color: #dff0d8;
  border-color: #d6e9c6;
  color: #3c763d;
}
.alert-success hr {
  border-top-color: #c9e2b3;
}
.alert-success .alert-link {
  color: #2b542c;
}
.alert-info {
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
}
.alert-info hr {
  border-top-color: #a6e1ec;
}
.alert-info .alert-link {
  color: #245269;
}
.alert-warning {
  background-color: #fcf8e3;
  border-color: #faebcc;
  color: #8a6d3b;
}
.alert-warning hr {
  border-top-color: #f7e1b5;
}
.alert-warning .alert-link {
  color: #66512c;
}
.alert-danger {
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a94442;
}
.alert-danger hr {
  border-top-color: #e4b9c0;
}
.alert-danger .alert-link {
  color: #843534;
}
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.progress {
  overflow: hidden;
  height: 18px;
  margin-bottom: 18px;
  background-color: #f5f5f5;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  text-align: center;
  background-color: #337ab7;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}
.progress-striped .progress-bar,
.progress-bar-striped {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
}
.progress.active .progress-bar,
.progress-bar.active {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
  -o-animation: progress-bar-stripes 2s linear infinite;
  animation: progress-bar-stripes 2s linear infinite;
}
.progress-bar-success {
  background-color: #5cb85c;
}
.progress-striped .progress-bar-success {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-info {
  background-color: #5bc0de;
}
.progress-striped .progress-bar-info {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-warning {
  background-color: #f0ad4e;
}
.progress-striped .progress-bar-warning {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-danger {
  background-color: #d9534f;
}
.progress-striped .progress-bar-danger {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.media {
  margin-top: 15px;
}
.media:first-child {
  margin-top: 0;
}
.media,
.media-body {
  zoom: 1;
  overflow: hidden;
}
.media-body {
  width: 10000px;
}
.media-object {
  display: block;
}
.media-object.img-thumbnail {
  max-width: none;
}
.media-right,
.media > .pull-right {
  padding-left: 10px;
}
.media-left,
.media > .pull-left {
  padding-right: 10px;
}
.media-left,
.media-right,
.media-body {
  display: table-cell;
  vertical-align: top;
}
.media-middle {
  vertical-align: middle;
}
.media-bottom {
  vertical-align: bottom;
}
.media-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.media-list {
  padding-left: 0;
  list-style: none;
}
.list-group {
  margin-bottom: 20px;
  padding-left: 0;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
}
.list-group-item:first-child {
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
}
.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
a.list-group-item,
button.list-group-item {
  color: #555;
}
a.list-group-item .list-group-item-heading,
button.list-group-item .list-group-item-heading {
  color: #333;
}
a.list-group-item:hover,
button.list-group-item:hover,
a.list-group-item:focus,
button.list-group-item:focus {
  text-decoration: none;
  color: #555;
  background-color: #f5f5f5;
}
button.list-group-item {
  width: 100%;
  text-align: left;
}
.list-group-item.disabled,
.list-group-item.disabled:hover,
.list-group-item.disabled:focus {
  background-color: #eeeeee;
  color: #777777;
  cursor: not-allowed;
}
.list-group-item.disabled .list-group-item-heading,
.list-group-item.disabled:hover .list-group-item-heading,
.list-group-item.disabled:focus .list-group-item-heading {
  color: inherit;
}
.list-group-item.disabled .list-group-item-text,
.list-group-item.disabled:hover .list-group-item-text,
.list-group-item.disabled:focus .list-group-item-text {
  color: #777777;
}
.list-group-item.active,
.list-group-item.active:hover,
.list-group-item.active:focus {
  z-index: 2;
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.list-group-item.active .list-group-item-heading,
.list-group-item.active:hover .list-group-item-heading,
.list-group-item.active:focus .list-group-item-heading,
.list-group-item.active .list-group-item-heading > small,
.list-group-item.active:hover .list-group-item-heading > small,
.list-group-item.active:focus .list-group-item-heading > small,
.list-group-item.active .list-group-item-heading > .small,
.list-group-item.active:hover .list-group-item-heading > .small,
.list-group-item.active:focus .list-group-item-heading > .small {
  color: inherit;
}
.list-group-item.active .list-group-item-text,
.list-group-item.active:hover .list-group-item-text,
.list-group-item.active:focus .list-group-item-text {
  color: #c7ddef;
}
.list-group-item-success {
  color: #3c763d;
  background-color: #dff0d8;
}
a.list-group-item-success,
button.list-group-item-success {
  color: #3c763d;
}
a.list-group-item-success .list-group-item-heading,
button.list-group-item-success .list-group-item-heading {
  color: inherit;
}
a.list-group-item-success:hover,
button.list-group-item-success:hover,
a.list-group-item-success:focus,
button.list-group-item-success:focus {
  color: #3c763d;
  background-color: #d0e9c6;
}
a.list-group-item-success.active,
button.list-group-item-success.active,
a.list-group-item-success.active:hover,
button.list-group-item-success.active:hover,
a.list-group-item-success.active:focus,
button.list-group-item-success.active:focus {
  color: #fff;
  background-color: #3c763d;
  border-color: #3c763d;
}
.list-group-item-info {
  color: #31708f;
  background-color: #d9edf7;
}
a.list-group-item-info,
button.list-group-item-info {
  color: #31708f;
}
a.list-group-item-info .list-group-item-heading,
button.list-group-item-info .list-group-item-heading {
  color: inherit;
}
a.list-group-item-info:hover,
button.list-group-item-info:hover,
a.list-group-item-info:focus,
button.list-group-item-info:focus {
  color: #31708f;
  background-color: #c4e3f3;
}
a.list-group-item-info.active,
button.list-group-item-info.active,
a.list-group-item-info.active:hover,
button.list-group-item-info.active:hover,
a.list-group-item-info.active:focus,
button.list-group-item-info.active:focus {
  color: #fff;
  background-color: #31708f;
  border-color: #31708f;
}
.list-group-item-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
}
a.list-group-item-warning,
button.list-group-item-warning {
  color: #8a6d3b;
}
a.list-group-item-warning .list-group-item-heading,
button.list-group-item-warning .list-group-item-heading {
  color: inherit;
}
a.list-group-item-warning:hover,
button.list-group-item-warning:hover,
a.list-group-item-warning:focus,
button.list-group-item-warning:focus {
  color: #8a6d3b;
  background-color: #faf2cc;
}
a.list-group-item-warning.active,
button.list-group-item-warning.active,
a.list-group-item-warning.active:hover,
button.list-group-item-warning.active:hover,
a.list-group-item-warning.active:focus,
button.list-group-item-warning.active:focus {
  color: #fff;
  background-color: #8a6d3b;
  border-color: #8a6d3b;
}
.list-group-item-danger {
  color: #a94442;
  background-color: #f2dede;
}
a.list-group-item-danger,
button.list-group-item-danger {
  color: #a94442;
}
a.list-group-item-danger .list-group-item-heading,
button.list-group-item-danger .list-group-item-heading {
  color: inherit;
}
a.list-group-item-danger:hover,
button.list-group-item-danger:hover,
a.list-group-item-danger:focus,
button.list-group-item-danger:focus {
  color: #a94442;
  background-color: #ebcccc;
}
a.list-group-item-danger.active,
button.list-group-item-danger.active,
a.list-group-item-danger.active:hover,
button.list-group-item-danger.active:hover,
a.list-group-item-danger.active:focus,
button.list-group-item-danger.active:focus {
  color: #fff;
  background-color: #a94442;
  border-color: #a94442;
}
.list-group-item-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.list-group-item-text {
  margin-bottom: 0;
  line-height: 1.3;
}
.panel {
  margin-bottom: 18px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-body {
  padding: 15px;
}
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel-heading > .dropdown .dropdown-toggle {
  color: inherit;
}
.panel-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 15px;
  color: inherit;
}
.panel-title > a,
.panel-title > small,
.panel-title > .small,
.panel-title > small > a,
.panel-title > .small > a {
  color: inherit;
}
.panel-footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .list-group,
.panel > .panel-collapse > .list-group {
  margin-bottom: 0;
}
.panel > .list-group .list-group-item,
.panel > .panel-collapse > .list-group .list-group-item {
  border-width: 1px 0;
  border-radius: 0;
}
.panel > .list-group:first-child .list-group-item:first-child,
.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {
  border-top: 0;
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel > .list-group:last-child .list-group-item:last-child,
.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {
  border-bottom: 0;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.panel-heading + .list-group .list-group-item:first-child {
  border-top-width: 0;
}
.list-group + .panel-footer {
  border-top-width: 0;
}
.panel > .table,
.panel > .table-responsive > .table,
.panel > .panel-collapse > .table {
  margin-bottom: 0;
}
.panel > .table caption,
.panel > .table-responsive > .table caption,
.panel > .panel-collapse > .table caption {
  padding-left: 15px;
  padding-right: 15px;
}
.panel > .table:first-child,
.panel > .table-responsive:first-child > .table:first-child {
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {
  border-top-left-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {
  border-top-right-radius: 1px;
}
.panel > .table:last-child,
.panel > .table-responsive:last-child > .table:last-child {
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {
  border-bottom-left-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {
  border-bottom-right-radius: 1px;
}
.panel > .panel-body + .table,
.panel > .panel-body + .table-responsive,
.panel > .table + .panel-body,
.panel > .table-responsive + .panel-body {
  border-top: 1px solid #ddd;
}
.panel > .table > tbody:first-child > tr:first-child th,
.panel > .table > tbody:first-child > tr:first-child td {
  border-top: 0;
}
.panel > .table-bordered,
.panel > .table-responsive > .table-bordered {
  border: 0;
}
.panel > .table-bordered > thead > tr > th:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,
.panel > .table-bordered > tbody > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,
.panel > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-bordered > thead > tr > td:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,
.panel > .table-bordered > tbody > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,
.panel > .table-bordered > tfoot > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {
  border-left: 0;
}
.panel > .table-bordered > thead > tr > th:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,
.panel > .table-bordered > tbody > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,
.panel > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-bordered > thead > tr > td:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,
.panel > .table-bordered > tbody > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,
.panel > .table-bordered > tfoot > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {
  border-right: 0;
}
.panel > .table-bordered > thead > tr:first-child > td,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,
.panel > .table-bordered > tbody > tr:first-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,
.panel > .table-bordered > thead > tr:first-child > th,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,
.panel > .table-bordered > tbody > tr:first-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {
  border-bottom: 0;
}
.panel > .table-bordered > tbody > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,
.panel > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-bordered > tbody > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,
.panel > .table-bordered > tfoot > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {
  border-bottom: 0;
}
.panel > .table-responsive {
  border: 0;
  margin-bottom: 0;
}
.panel-group {
  margin-bottom: 18px;
}
.panel-group .panel {
  margin-bottom: 0;
  border-radius: 2px;
}
.panel-group .panel + .panel {
  margin-top: 5px;
}
.panel-group .panel-heading {
  border-bottom: 0;
}
.panel-group .panel-heading + .panel-collapse > .panel-body,
.panel-group .panel-heading + .panel-collapse > .list-group {
  border-top: 1px solid #ddd;
}
.panel-group .panel-footer {
  border-top: 0;
}
.panel-group .panel-footer + .panel-collapse .panel-body {
  border-bottom: 1px solid #ddd;
}
.panel-default {
  border-color: #ddd;
}
.panel-default > .panel-heading {
  color: #333333;
  background-color: #f5f5f5;
  border-color: #ddd;
}
.panel-default > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ddd;
}
.panel-default > .panel-heading .badge {
  color: #f5f5f5;
  background-color: #333333;
}
.panel-default > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ddd;
}
.panel-primary {
  border-color: #337ab7;
}
.panel-primary > .panel-heading {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.panel-primary > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #337ab7;
}
.panel-primary > .panel-heading .badge {
  color: #337ab7;
  background-color: #fff;
}
.panel-primary > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #337ab7;
}
.panel-success {
  border-color: #d6e9c6;
}
.panel-success > .panel-heading {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.panel-success > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #d6e9c6;
}
.panel-success > .panel-heading .badge {
  color: #dff0d8;
  background-color: #3c763d;
}
.panel-success > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #d6e9c6;
}
.panel-info {
  border-color: #bce8f1;
}
.panel-info > .panel-heading {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.panel-info > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #bce8f1;
}
.panel-info > .panel-heading .badge {
  color: #d9edf7;
  background-color: #31708f;
}
.panel-info > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #bce8f1;
}
.panel-warning {
  border-color: #faebcc;
}
.panel-warning > .panel-heading {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
.panel-warning > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #faebcc;
}
.panel-warning > .panel-heading .badge {
  color: #fcf8e3;
  background-color: #8a6d3b;
}
.panel-warning > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #faebcc;
}
.panel-danger {
  border-color: #ebccd1;
}
.panel-danger > .panel-heading {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
.panel-danger > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ebccd1;
}
.panel-danger > .panel-heading .badge {
  color: #f2dede;
  background-color: #a94442;
}
.panel-danger > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ebccd1;
}
.embed-responsive {
  position: relative;
  display: block;
  height: 0;
  padding: 0;
  overflow: hidden;
}
.embed-responsive .embed-responsive-item,
.embed-responsive iframe,
.embed-responsive embed,
.embed-responsive object,
.embed-responsive video {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  border: 0;
}
.embed-responsive-16by9 {
  padding-bottom: 56.25%;
}
.embed-responsive-4by3 {
  padding-bottom: 75%;
}
.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}
.well blockquote {
  border-color: #ddd;
  border-color: rgba(0, 0, 0, 0.15);
}
.well-lg {
  padding: 24px;
  border-radius: 3px;
}
.well-sm {
  padding: 9px;
  border-radius: 1px;
}
.close {
  float: right;
  font-size: 19.5px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.2;
  filter: alpha(opacity=20);
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.5;
  filter: alpha(opacity=50);
}
button.close {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
}
.modal-open {
  overflow: hidden;
}
.modal {
  display: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.modal.fade .modal-dialog {
  -webkit-transform: translate(0, -25%);
  -ms-transform: translate(0, -25%);
  -o-transform: translate(0, -25%);
  transform: translate(0, -25%);
  -webkit-transition: -webkit-transform 0.3s ease-out;
  -moz-transition: -moz-transform 0.3s ease-out;
  -o-transition: -o-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
}
.modal.in .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}
.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  outline: 0;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
}
.modal-backdrop.fade {
  opacity: 0;
  filter: alpha(opacity=0);
}
.modal-backdrop.in {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
.modal-header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal-header .close {
  margin-top: -2px;
}
.modal-title {
  margin: 0;
  line-height: 1.42857143;
}
.modal-body {
  position: relative;
  padding: 15px;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
.modal-footer .btn + .btn {
  margin-left: 5px;
  margin-bottom: 0;
}
.modal-footer .btn-group .btn + .btn {
  margin-left: -1px;
}
.modal-footer .btn-block + .btn-block {
  margin-left: 0;
}
.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
@media (min-width: 768px) {
  .modal-dialog {
    width: 600px;
    margin: 30px auto;
  }
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }
  .modal-sm {
    width: 300px;
  }
}
@media (min-width: 992px) {
  .modal-lg {
    width: 900px;
  }
}
.tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-break: auto;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;
  opacity: 0;
  filter: alpha(opacity=0);
}
.tooltip.in {
  opacity: 0.9;
  filter: alpha(opacity=90);
}
.tooltip.top {
  margin-top: -3px;
  padding: 5px 0;
}
.tooltip.right {
  margin-left: 3px;
  padding: 0 5px;
}
.tooltip.bottom {
  margin-top: 3px;
  padding: 5px 0;
}
.tooltip.left {
  margin-left: -3px;
  padding: 0 5px;
}
.tooltip-inner {
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 2px;
}
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.tooltip.top .tooltip-arrow {
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-left .tooltip-arrow {
  bottom: 0;
  right: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-right .tooltip-arrow {
  bottom: 0;
  left: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.right .tooltip-arrow {
  top: 50%;
  left: 0;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #000;
}
.tooltip.left .tooltip-arrow {
  top: 50%;
  right: 0;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-left-color: #000;
}
.tooltip.bottom .tooltip-arrow {
  top: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-left .tooltip-arrow {
  top: 0;
  right: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-right .tooltip-arrow {
  top: 0;
  left: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.popover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1060;
  display: none;
  max-width: 276px;
  padding: 1px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-break: auto;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 13px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.popover.top {
  margin-top: -10px;
}
.popover.right {
  margin-left: 10px;
}
.popover.bottom {
  margin-top: 10px;
}
.popover.left {
  margin-left: -10px;
}
.popover-title {
  margin: 0;
  padding: 8px 14px;
  font-size: 13px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-radius: 2px 2px 0 0;
}
.popover-content {
  padding: 9px 14px;
}
.popover > .arrow,
.popover > .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.popover > .arrow {
  border-width: 11px;
}
.popover > .arrow:after {
  border-width: 10px;
  content: "";
}
.popover.top > .arrow {
  left: 50%;
  margin-left: -11px;
  border-bottom-width: 0;
  border-top-color: #999999;
  border-top-color: rgba(0, 0, 0, 0.25);
  bottom: -11px;
}
.popover.top > .arrow:after {
  content: " ";
  bottom: 1px;
  margin-left: -10px;
  border-bottom-width: 0;
  border-top-color: #fff;
}
.popover.right > .arrow {
  top: 50%;
  left: -11px;
  margin-top: -11px;
  border-left-width: 0;
  border-right-color: #999999;
  border-right-color: rgba(0, 0, 0, 0.25);
}
.popover.right > .arrow:after {
  content: " ";
  left: 1px;
  bottom: -10px;
  border-left-width: 0;
  border-right-color: #fff;
}
.popover.bottom > .arrow {
  left: 50%;
  margin-left: -11px;
  border-top-width: 0;
  border-bottom-color: #999999;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  top: -11px;
}
.popover.bottom > .arrow:after {
  content: " ";
  top: 1px;
  margin-left: -10px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.popover.left > .arrow {
  top: 50%;
  right: -11px;
  margin-top: -11px;
  border-right-width: 0;
  border-left-color: #999999;
  border-left-color: rgba(0, 0, 0, 0.25);
}
.popover.left > .arrow:after {
  content: " ";
  right: 1px;
  border-right-width: 0;
  border-left-color: #fff;
  bottom: -10px;
}
.carousel {
  position: relative;
}
.carousel-inner {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.carousel-inner > .item {
  display: none;
  position: relative;
  -webkit-transition: 0.6s ease-in-out left;
  -o-transition: 0.6s ease-in-out left;
  transition: 0.6s ease-in-out left;
}
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  line-height: 1;
}
@media all and (transform-3d), (-webkit-transform-3d) {
  .carousel-inner > .item {
    -webkit-transition: -webkit-transform 0.6s ease-in-out;
    -moz-transition: -moz-transform 0.6s ease-in-out;
    -o-transition: -o-transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000px;
    -moz-perspective: 1000px;
    perspective: 1000px;
  }
  .carousel-inner > .item.next,
  .carousel-inner > .item.active.right {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    left: 0;
  }
  .carousel-inner > .item.prev,
  .carousel-inner > .item.active.left {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    left: 0;
  }
  .carousel-inner > .item.next.left,
  .carousel-inner > .item.prev.right,
  .carousel-inner > .item.active {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    left: 0;
  }
}
.carousel-inner > .active,
.carousel-inner > .next,
.carousel-inner > .prev {
  display: block;
}
.carousel-inner > .active {
  left: 0;
}
.carousel-inner > .next,
.carousel-inner > .prev {
  position: absolute;
  top: 0;
  width: 100%;
}
.carousel-inner > .next {
  left: 100%;
}
.carousel-inner > .prev {
  left: -100%;
}
.carousel-inner > .next.left,
.carousel-inner > .prev.right {
  left: 0;
}
.carousel-inner > .active.left {
  left: -100%;
}
.carousel-inner > .active.right {
  left: 100%;
}
.carousel-control {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 15%;
  opacity: 0.5;
  filter: alpha(opacity=50);
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0);
}
.carousel-control.left {
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
}
.carousel-control.right {
  left: auto;
  right: 0;
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
}
.carousel-control:hover,
.carousel-control:focus {
  outline: 0;
  color: #fff;
  text-decoration: none;
  opacity: 0.9;
  filter: alpha(opacity=90);
}
.carousel-control .icon-prev,
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-left,
.carousel-control .glyphicon-chevron-right {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  z-index: 5;
  display: inline-block;
}
.carousel-control .icon-prev,
.carousel-control .glyphicon-chevron-left {
  left: 50%;
  margin-left: -10px;
}
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-right {
  right: 50%;
  margin-right: -10px;
}
.carousel-control .icon-prev,
.carousel-control .icon-next {
  width: 20px;
  height: 20px;
  line-height: 1;
  font-family: serif;
}
.carousel-control .icon-prev:before {
  content: '\2039';
}
.carousel-control .icon-next:before {
  content: '\203a';
}
.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  z-index: 15;
  width: 60%;
  margin-left: -30%;
  padding-left: 0;
  list-style: none;
  text-align: center;
}
.carousel-indicators li {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 1px;
  text-indent: -999px;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  background-color: #000 \9;
  background-color: rgba(0, 0, 0, 0);
}
.carousel-indicators .active {
  margin: 0;
  width: 12px;
  height: 12px;
  background-color: #fff;
}
.carousel-caption {
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: 20px;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
.carousel-caption .btn {
  text-shadow: none;
}
@media screen and (min-width: 768px) {
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-prev,
  .carousel-control .icon-next {
    width: 30px;
    height: 30px;
    margin-top: -10px;
    font-size: 30px;
  }
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .icon-prev {
    margin-left: -10px;
  }
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-next {
    margin-right: -10px;
  }
  .carousel-caption {
    left: 20%;
    right: 20%;
    padding-bottom: 30px;
  }
  .carousel-indicators {
    bottom: 20px;
  }
}
.clearfix:before,
.clearfix:after,
.dl-horizontal dd:before,
.dl-horizontal dd:after,
.container:before,
.container:after,
.container-fluid:before,
.container-fluid:after,
.row:before,
.row:after,
.form-horizontal .form-group:before,
.form-horizontal .form-group:after,
.btn-toolbar:before,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:before,
.btn-group-vertical > .btn-group:after,
.nav:before,
.nav:after,
.navbar:before,
.navbar:after,
.navbar-header:before,
.navbar-header:after,
.navbar-collapse:before,
.navbar-collapse:after,
.pager:before,
.pager:after,
.panel-body:before,
.panel-body:after,
.modal-header:before,
.modal-header:after,
.modal-footer:before,
.modal-footer:after,
.item_buttons:before,
.item_buttons:after {
  content: " ";
  display: table;
}
.clearfix:after,
.dl-horizontal dd:after,
.container:after,
.container-fluid:after,
.row:after,
.form-horizontal .form-group:after,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:after,
.nav:after,
.navbar:after,
.navbar-header:after,
.navbar-collapse:after,
.pager:after,
.panel-body:after,
.modal-header:after,
.modal-footer:after,
.item_buttons:after {
  clear: both;
}
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.pull-right {
  float: right !important;
}
.pull-left {
  float: left !important;
}
.hide {
  display: none !important;
}
.show {
  display: block !important;
}
.invisible {
  visibility: hidden;
}
.text-hide {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
.hidden {
  display: none !important;
}
.affix {
  position: fixed;
}
@-ms-viewport {
  width: device-width;
}
.visible-xs,
.visible-sm,
.visible-md,
.visible-lg {
  display: none !important;
}
.visible-xs-block,
.visible-xs-inline,
.visible-xs-inline-block,
.visible-sm-block,
.visible-sm-inline,
.visible-sm-inline-block,
.visible-md-block,
.visible-md-inline,
.visible-md-inline-block,
.visible-lg-block,
.visible-lg-inline,
.visible-lg-inline-block {
  display: none !important;
}
@media (max-width: 767px) {
  .visible-xs {
    display: block !important;
  }
  table.visible-xs {
    display: table !important;
  }
  tr.visible-xs {
    display: table-row !important;
  }
  th.visible-xs,
  td.visible-xs {
    display: table-cell !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-block {
    display: block !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline {
    display: inline !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm {
    display: block !important;
  }
  table.visible-sm {
    display: table !important;
  }
  tr.visible-sm {
    display: table-row !important;
  }
  th.visible-sm,
  td.visible-sm {
    display: table-cell !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-block {
    display: block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline {
    display: inline !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md {
    display: block !important;
  }
  table.visible-md {
    display: table !important;
  }
  tr.visible-md {
    display: table-row !important;
  }
  th.visible-md,
  td.visible-md {
    display: table-cell !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-block {
    display: block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline {
    display: inline !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg {
    display: block !important;
  }
  table.visible-lg {
    display: table !important;
  }
  tr.visible-lg {
    display: table-row !important;
  }
  th.visible-lg,
  td.visible-lg {
    display: table-cell !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-block {
    display: block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline {
    display: inline !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline-block {
    display: inline-block !important;
  }
}
@media (max-width: 767px) {
  .hidden-xs {
    display: none !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .hidden-sm {
    display: none !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .hidden-md {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .hidden-lg {
    display: none !important;
  }
}
.visible-print {
  display: none !important;
}
@media print {
  .visible-print {
    display: block !important;
  }
  table.visible-print {
    display: table !important;
  }
  tr.visible-print {
    display: table-row !important;
  }
  th.visible-print,
  td.visible-print {
    display: table-cell !important;
  }
}
.visible-print-block {
  display: none !important;
}
@media print {
  .visible-print-block {
    display: block !important;
  }
}
.visible-print-inline {
  display: none !important;
}
@media print {
  .visible-print-inline {
    display: inline !important;
  }
}
.visible-print-inline-block {
  display: none !important;
}
@media print {
  .visible-print-inline-block {
    display: inline-block !important;
  }
}
@media print {
  .hidden-print {
    display: none !important;
  }
}
/*!
*
* Font Awesome
*
*/
/*!
 *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */
/* FONT PATH
 * -------------------------- */
@font-face {
  font-family: 'FontAwesome';
  src: url('../components/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0');
  src: url('../components/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../components/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../components/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../components/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../components/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* makes the font 33% larger relative to the icon container */
.fa-lg {
  font-size: 1.33333333em;
  line-height: 0.75em;
  vertical-align: -15%;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}
.fa-4x {
  font-size: 4em;
}
.fa-5x {
  font-size: 5em;
}
.fa-fw {
  width: 1.28571429em;
  text-align: center;
}
.fa-ul {
  padding-left: 0;
  margin-left: 2.14285714em;
  list-style-type: none;
}
.fa-ul > li {
  position: relative;
}
.fa-li {
  position: absolute;
  left: -2.14285714em;
  width: 2.14285714em;
  top: 0.14285714em;
  text-align: center;
}
.fa-li.fa-lg {
  left: -1.85714286em;
}
.fa-border {
  padding: .2em .25em .15em;
  border: solid 0.08em #eee;
  border-radius: .1em;
}
.fa-pull-left {
  float: left;
}
.fa-pull-right {
  float: right;
}
.fa.fa-pull-left {
  margin-right: .3em;
}
.fa.fa-pull-right {
  margin-left: .3em;
}
/* Deprecated as of 4.4.0 */
.pull-right {
  float: right;
}
.pull-left {
  float: left;
}
.fa.pull-left {
  margin-right: .3em;
}
.fa.pull-right {
  margin-left: .3em;
}
.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}
.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
  animation: fa-spin 1s infinite steps(8);
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
.fa-rotate-90 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.fa-rotate-180 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.fa-rotate-270 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.fa-flip-horizontal {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
  -webkit-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}
.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
:root .fa-rotate-90,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-flip-horizontal,
:root .fa-flip-vertical {
  filter: none;
}
.fa-stack {
  position: relative;
  display: inline-block;
  width: 2em;
  height: 2em;
  line-height: 2em;
  vertical-align: middle;
}
.fa-stack-1x,
.fa-stack-2x {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
}
.fa-stack-1x {
  line-height: inherit;
}
.fa-stack-2x {
  font-size: 2em;
}
.fa-inverse {
  color: #fff;
}
/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen
   readers do not read off random characters that represent icons */
.fa-glass:before {
  content: "\f000";
}
.fa-music:before {
  content: "\f001";
}
.fa-search:before {
  content: "\f002";
}
.fa-envelope-o:before {
  content: "\f003";
}
.fa-heart:before {
  content: "\f004";
}
.fa-star:before {
  content: "\f005";
}
.fa-star-o:before {
  content: "\f006";
}
.fa-user:before {
  content: "\f007";
}
.fa-film:before {
  content: "\f008";
}
.fa-th-large:before {
  content: "\f009";
}
.fa-th:before {
  content: "\f00a";
}
.fa-th-list:before {
  content: "\f00b";
}
.fa-check:before {
  content: "\f00c";
}
.fa-remove:before,
.fa-close:before,
.fa-times:before {
  content: "\f00d";
}
.fa-search-plus:before {
  content: "\f00e";
}
.fa-search-minus:before {
  content: "\f010";
}
.fa-power-off:before {
  content: "\f011";
}
.fa-signal:before {
  content: "\f012";
}
.fa-gear:before,
.fa-cog:before {
  content: "\f013";
}
.fa-trash-o:before {
  content: "\f014";
}
.fa-home:before {
  content: "\f015";
}
.fa-file-o:before {
  content: "\f016";
}
.fa-clock-o:before {
  content: "\f017";
}
.fa-road:before {
  content: "\f018";
}
.fa-download:before {
  content: "\f019";
}
.fa-arrow-circle-o-down:before {
  content: "\f01a";
}
.fa-arrow-circle-o-up:before {
  content: "\f01b";
}
.fa-inbox:before {
  content: "\f01c";
}
.fa-play-circle-o:before {
  content: "\f01d";
}
.fa-rotate-right:before,
.fa-repeat:before {
  content: "\f01e";
}
.fa-refresh:before {
  content: "\f021";
}
.fa-list-alt:before {
  content: "\f022";
}
.fa-lock:before {
  content: "\f023";
}
.fa-flag:before {
  content: "\f024";
}
.fa-headphones:before {
  content: "\f025";
}
.fa-volume-off:before {
  content: "\f026";
}
.fa-volume-down:before {
  content: "\f027";
}
.fa-volume-up:before {
  content: "\f028";
}
.fa-qrcode:before {
  content: "\f029";
}
.fa-barcode:before {
  content: "\f02a";
}
.fa-tag:before {
  content: "\f02b";
}
.fa-tags:before {
  content: "\f02c";
}
.fa-book:before {
  content: "\f02d";
}
.fa-bookmark:before {
  content: "\f02e";
}
.fa-print:before {
  content: "\f02f";
}
.fa-camera:before {
  content: "\f030";
}
.fa-font:before {
  content: "\f031";
}
.fa-bold:before {
  content: "\f032";
}
.fa-italic:before {
  content: "\f033";
}
.fa-text-height:before {
  content: "\f034";
}
.fa-text-width:before {
  content: "\f035";
}
.fa-align-left:before {
  content: "\f036";
}
.fa-align-center:before {
  content: "\f037";
}
.fa-align-right:before {
  content: "\f038";
}
.fa-align-justify:before {
  content: "\f039";
}
.fa-list:before {
  content: "\f03a";
}
.fa-dedent:before,
.fa-outdent:before {
  content: "\f03b";
}
.fa-indent:before {
  content: "\f03c";
}
.fa-video-camera:before {
  content: "\f03d";
}
.fa-photo:before,
.fa-image:before,
.fa-picture-o:before {
  content: "\f03e";
}
.fa-pencil:before {
  content: "\f040";
}
.fa-map-marker:before {
  content: "\f041";
}
.fa-adjust:before {
  content: "\f042";
}
.fa-tint:before {
  content: "\f043";
}
.fa-edit:before,
.fa-pencil-square-o:before {
  content: "\f044";
}
.fa-share-square-o:before {
  content: "\f045";
}
.fa-check-square-o:before {
  content: "\f046";
}
.fa-arrows:before {
  content: "\f047";
}
.fa-step-backward:before {
  content: "\f048";
}
.fa-fast-backward:before {
  content: "\f049";
}
.fa-backward:before {
  content: "\f04a";
}
.fa-play:before {
  content: "\f04b";
}
.fa-pause:before {
  content: "\f04c";
}
.fa-stop:before {
  content: "\f04d";
}
.fa-forward:before {
  content: "\f04e";
}
.fa-fast-forward:before {
  content: "\f050";
}
.fa-step-forward:before {
  content: "\f051";
}
.fa-eject:before {
  content: "\f052";
}
.fa-chevron-left:before {
  content: "\f053";
}
.fa-chevron-right:before {
  content: "\f054";
}
.fa-plus-circle:before {
  content: "\f055";
}
.fa-minus-circle:before {
  content: "\f056";
}
.fa-times-circle:before {
  content: "\f057";
}
.fa-check-circle:before {
  content: "\f058";
}
.fa-question-circle:before {
  content: "\f059";
}
.fa-info-circle:before {
  content: "\f05a";
}
.fa-crosshairs:before {
  content: "\f05b";
}
.fa-times-circle-o:before {
  content: "\f05c";
}
.fa-check-circle-o:before {
  content: "\f05d";
}
.fa-ban:before {
  content: "\f05e";
}
.fa-arrow-left:before {
  content: "\f060";
}
.fa-arrow-right:before {
  content: "\f061";
}
.fa-arrow-up:before {
  content: "\f062";
}
.fa-arrow-down:before {
  content: "\f063";
}
.fa-mail-forward:before,
.fa-share:before {
  content: "\f064";
}
.fa-expand:before {
  content: "\f065";
}
.fa-compress:before {
  content: "\f066";
}
.fa-plus:before {
  content: "\f067";
}
.fa-minus:before {
  content: "\f068";
}
.fa-asterisk:before {
  content: "\f069";
}
.fa-exclamation-circle:before {
  content: "\f06a";
}
.fa-gift:before {
  content: "\f06b";
}
.fa-leaf:before {
  content: "\f06c";
}
.fa-fire:before {
  content: "\f06d";
}
.fa-eye:before {
  content: "\f06e";
}
.fa-eye-slash:before {
  content: "\f070";
}
.fa-warning:before,
.fa-exclamation-triangle:before {
  content: "\f071";
}
.fa-plane:before {
  content: "\f072";
}
.fa-calendar:before {
  content: "\f073";
}
.fa-random:before {
  content: "\f074";
}
.fa-comment:before {
  content: "\f075";
}
.fa-magnet:before {
  content: "\f076";
}
.fa-chevron-up:before {
  content: "\f077";
}
.fa-chevron-down:before {
  content: "\f078";
}
.fa-retweet:before {
  content: "\f079";
}
.fa-shopping-cart:before {
  content: "\f07a";
}
.fa-folder:before {
  content: "\f07b";
}
.fa-folder-open:before {
  content: "\f07c";
}
.fa-arrows-v:before {
  content: "\f07d";
}
.fa-arrows-h:before {
  content: "\f07e";
}
.fa-bar-chart-o:before,
.fa-bar-chart:before {
  content: "\f080";
}
.fa-twitter-square:before {
  content: "\f081";
}
.fa-facebook-square:before {
  content: "\f082";
}
.fa-camera-retro:before {
  content: "\f083";
}
.fa-key:before {
  content: "\f084";
}
.fa-gears:before,
.fa-cogs:before {
  content: "\f085";
}
.fa-comments:before {
  content: "\f086";
}
.fa-thumbs-o-up:before {
  content: "\f087";
}
.fa-thumbs-o-down:before {
  content: "\f088";
}
.fa-star-half:before {
  content: "\f089";
}
.fa-heart-o:before {
  content: "\f08a";
}
.fa-sign-out:before {
  content: "\f08b";
}
.fa-linkedin-square:before {
  content: "\f08c";
}
.fa-thumb-tack:before {
  content: "\f08d";
}
.fa-external-link:before {
  content: "\f08e";
}
.fa-sign-in:before {
  content: "\f090";
}
.fa-trophy:before {
  content: "\f091";
}
.fa-github-square:before {
  content: "\f092";
}
.fa-upload:before {
  content: "\f093";
}
.fa-lemon-o:before {
  content: "\f094";
}
.fa-phone:before {
  content: "\f095";
}
.fa-square-o:before {
  content: "\f096";
}
.fa-bookmark-o:before {
  content: "\f097";
}
.fa-phone-square:before {
  content: "\f098";
}
.fa-twitter:before {
  content: "\f099";
}
.fa-facebook-f:before,
.fa-facebook:before {
  content: "\f09a";
}
.fa-github:before {
  content: "\f09b";
}
.fa-unlock:before {
  content: "\f09c";
}
.fa-credit-card:before {
  content: "\f09d";
}
.fa-feed:before,
.fa-rss:before {
  content: "\f09e";
}
.fa-hdd-o:before {
  content: "\f0a0";
}
.fa-bullhorn:before {
  content: "\f0a1";
}
.fa-bell:before {
  content: "\f0f3";
}
.fa-certificate:before {
  content: "\f0a3";
}
.fa-hand-o-right:before {
  content: "\f0a4";
}
.fa-hand-o-left:before {
  content: "\f0a5";
}
.fa-hand-o-up:before {
  content: "\f0a6";
}
.fa-hand-o-down:before {
  content: "\f0a7";
}
.fa-arrow-circle-left:before {
  content: "\f0a8";
}
.fa-arrow-circle-right:before {
  content: "\f0a9";
}
.fa-arrow-circle-up:before {
  content: "\f0aa";
}
.fa-arrow-circle-down:before {
  content: "\f0ab";
}
.fa-globe:before {
  content: "\f0ac";
}
.fa-wrench:before {
  content: "\f0ad";
}
.fa-tasks:before {
  content: "\f0ae";
}
.fa-filter:before {
  content: "\f0b0";
}
.fa-briefcase:before {
  content: "\f0b1";
}
.fa-arrows-alt:before {
  content: "\f0b2";
}
.fa-group:before,
.fa-users:before {
  content: "\f0c0";
}
.fa-chain:before,
.fa-link:before {
  content: "\f0c1";
}
.fa-cloud:before {
  content: "\f0c2";
}
.fa-flask:before {
  content: "\f0c3";
}
.fa-cut:before,
.fa-scissors:before {
  content: "\f0c4";
}
.fa-copy:before,
.fa-files-o:before {
  content: "\f0c5";
}
.fa-paperclip:before {
  content: "\f0c6";
}
.fa-save:before,
.fa-floppy-o:before {
  content: "\f0c7";
}
.fa-square:before {
  content: "\f0c8";
}
.fa-navicon:before,
.fa-reorder:before,
.fa-bars:before {
  content: "\f0c9";
}
.fa-list-ul:before {
  content: "\f0ca";
}
.fa-list-ol:before {
  content: "\f0cb";
}
.fa-strikethrough:before {
  content: "\f0cc";
}
.fa-underline:before {
  content: "\f0cd";
}
.fa-table:before {
  content: "\f0ce";
}
.fa-magic:before {
  content: "\f0d0";
}
.fa-truck:before {
  content: "\f0d1";
}
.fa-pinterest:before {
  content: "\f0d2";
}
.fa-pinterest-square:before {
  content: "\f0d3";
}
.fa-google-plus-square:before {
  content: "\f0d4";
}
.fa-google-plus:before {
  content: "\f0d5";
}
.fa-money:before {
  content: "\f0d6";
}
.fa-caret-down:before {
  content: "\f0d7";
}
.fa-caret-up:before {
  content: "\f0d8";
}
.fa-caret-left:before {
  content: "\f0d9";
}
.fa-caret-right:before {
  content: "\f0da";
}
.fa-columns:before {
  content: "\f0db";
}
.fa-unsorted:before,
.fa-sort:before {
  content: "\f0dc";
}
.fa-sort-down:before,
.fa-sort-desc:before {
  content: "\f0dd";
}
.fa-sort-up:before,
.fa-sort-asc:before {
  content: "\f0de";
}
.fa-envelope:before {
  content: "\f0e0";
}
.fa-linkedin:before {
  content: "\f0e1";
}
.fa-rotate-left:before,
.fa-undo:before {
  content: "\f0e2";
}
.fa-legal:before,
.fa-gavel:before {
  content: "\f0e3";
}
.fa-dashboard:before,
.fa-tachometer:before {
  content: "\f0e4";
}
.fa-comment-o:before {
  content: "\f0e5";
}
.fa-comments-o:before {
  content: "\f0e6";
}
.fa-flash:before,
.fa-bolt:before {
  content: "\f0e7";
}
.fa-sitemap:before {
  content: "\f0e8";
}
.fa-umbrella:before {
  content: "\f0e9";
}
.fa-paste:before,
.fa-clipboard:before {
  content: "\f0ea";
}
.fa-lightbulb-o:before {
  content: "\f0eb";
}
.fa-exchange:before {
  content: "\f0ec";
}
.fa-cloud-download:before {
  content: "\f0ed";
}
.fa-cloud-upload:before {
  content: "\f0ee";
}
.fa-user-md:before {
  content: "\f0f0";
}
.fa-stethoscope:before {
  content: "\f0f1";
}
.fa-suitcase:before {
  content: "\f0f2";
}
.fa-bell-o:before {
  content: "\f0a2";
}
.fa-coffee:before {
  content: "\f0f4";
}
.fa-cutlery:before {
  content: "\f0f5";
}
.fa-file-text-o:before {
  content: "\f0f6";
}
.fa-building-o:before {
  content: "\f0f7";
}
.fa-hospital-o:before {
  content: "\f0f8";
}
.fa-ambulance:before {
  content: "\f0f9";
}
.fa-medkit:before {
  content: "\f0fa";
}
.fa-fighter-jet:before {
  content: "\f0fb";
}
.fa-beer:before {
  content: "\f0fc";
}
.fa-h-square:before {
  content: "\f0fd";
}
.fa-plus-square:before {
  content: "\f0fe";
}
.fa-angle-double-left:before {
  content: "\f100";
}
.fa-angle-double-right:before {
  content: "\f101";
}
.fa-angle-double-up:before {
  content: "\f102";
}
.fa-angle-double-down:before {
  content: "\f103";
}
.fa-angle-left:before {
  content: "\f104";
}
.fa-angle-right:before {
  content: "\f105";
}
.fa-angle-up:before {
  content: "\f106";
}
.fa-angle-down:before {
  content: "\f107";
}
.fa-desktop:before {
  content: "\f108";
}
.fa-laptop:before {
  content: "\f109";
}
.fa-tablet:before {
  content: "\f10a";
}
.fa-mobile-phone:before,
.fa-mobile:before {
  content: "\f10b";
}
.fa-circle-o:before {
  content: "\f10c";
}
.fa-quote-left:before {
  content: "\f10d";
}
.fa-quote-right:before {
  content: "\f10e";
}
.fa-spinner:before {
  content: "\f110";
}
.fa-circle:before {
  content: "\f111";
}
.fa-mail-reply:before,
.fa-reply:before {
  content: "\f112";
}
.fa-github-alt:before {
  content: "\f113";
}
.fa-folder-o:before {
  content: "\f114";
}
.fa-folder-open-o:before {
  content: "\f115";
}
.fa-smile-o:before {
  content: "\f118";
}
.fa-frown-o:before {
  content: "\f119";
}
.fa-meh-o:before {
  content: "\f11a";
}
.fa-gamepad:before {
  content: "\f11b";
}
.fa-keyboard-o:before {
  content: "\f11c";
}
.fa-flag-o:before {
  content: "\f11d";
}
.fa-flag-checkered:before {
  content: "\f11e";
}
.fa-terminal:before {
  content: "\f120";
}
.fa-code:before {
  content: "\f121";
}
.fa-mail-reply-all:before,
.fa-reply-all:before {
  content: "\f122";
}
.fa-star-half-empty:before,
.fa-star-half-full:before,
.fa-star-half-o:before {
  content: "\f123";
}
.fa-location-arrow:before {
  content: "\f124";
}
.fa-crop:before {
  content: "\f125";
}
.fa-code-fork:before {
  content: "\f126";
}
.fa-unlink:before,
.fa-chain-broken:before {
  content: "\f127";
}
.fa-question:before {
  content: "\f128";
}
.fa-info:before {
  content: "\f129";
}
.fa-exclamation:before {
  content: "\f12a";
}
.fa-superscript:before {
  content: "\f12b";
}
.fa-subscript:before {
  content: "\f12c";
}
.fa-eraser:before {
  content: "\f12d";
}
.fa-puzzle-piece:before {
  content: "\f12e";
}
.fa-microphone:before {
  content: "\f130";
}
.fa-microphone-slash:before {
  content: "\f131";
}
.fa-shield:before {
  content: "\f132";
}
.fa-calendar-o:before {
  content: "\f133";
}
.fa-fire-extinguisher:before {
  content: "\f134";
}
.fa-rocket:before {
  content: "\f135";
}
.fa-maxcdn:before {
  content: "\f136";
}
.fa-chevron-circle-left:before {
  content: "\f137";
}
.fa-chevron-circle-right:before {
  content: "\f138";
}
.fa-chevron-circle-up:before {
  content: "\f139";
}
.fa-chevron-circle-down:before {
  content: "\f13a";
}
.fa-html5:before {
  content: "\f13b";
}
.fa-css3:before {
  content: "\f13c";
}
.fa-anchor:before {
  content: "\f13d";
}
.fa-unlock-alt:before {
  content: "\f13e";
}
.fa-bullseye:before {
  content: "\f140";
}
.fa-ellipsis-h:before {
  content: "\f141";
}
.fa-ellipsis-v:before {
  content: "\f142";
}
.fa-rss-square:before {
  content: "\f143";
}
.fa-play-circle:before {
  content: "\f144";
}
.fa-ticket:before {
  content: "\f145";
}
.fa-minus-square:before {
  content: "\f146";
}
.fa-minus-square-o:before {
  content: "\f147";
}
.fa-level-up:before {
  content: "\f148";
}
.fa-level-down:before {
  content: "\f149";
}
.fa-check-square:before {
  content: "\f14a";
}
.fa-pencil-square:before {
  content: "\f14b";
}
.fa-external-link-square:before {
  content: "\f14c";
}
.fa-share-square:before {
  content: "\f14d";
}
.fa-compass:before {
  content: "\f14e";
}
.fa-toggle-down:before,
.fa-caret-square-o-down:before {
  content: "\f150";
}
.fa-toggle-up:before,
.fa-caret-square-o-up:before {
  content: "\f151";
}
.fa-toggle-right:before,
.fa-caret-square-o-right:before {
  content: "\f152";
}
.fa-euro:before,
.fa-eur:before {
  content: "\f153";
}
.fa-gbp:before {
  content: "\f154";
}
.fa-dollar:before,
.fa-usd:before {
  content: "\f155";
}
.fa-rupee:before,
.fa-inr:before {
  content: "\f156";
}
.fa-cny:before,
.fa-rmb:before,
.fa-yen:before,
.fa-jpy:before {
  content: "\f157";
}
.fa-ruble:before,
.fa-rouble:before,
.fa-rub:before {
  content: "\f158";
}
.fa-won:before,
.fa-krw:before {
  content: "\f159";
}
.fa-bitcoin:before,
.fa-btc:before {
  content: "\f15a";
}
.fa-file:before {
  content: "\f15b";
}
.fa-file-text:before {
  content: "\f15c";
}
.fa-sort-alpha-asc:before {
  content: "\f15d";
}
.fa-sort-alpha-desc:before {
  content: "\f15e";
}
.fa-sort-amount-asc:before {
  content: "\f160";
}
.fa-sort-amount-desc:before {
  content: "\f161";
}
.fa-sort-numeric-asc:before {
  content: "\f162";
}
.fa-sort-numeric-desc:before {
  content: "\f163";
}
.fa-thumbs-up:before {
  content: "\f164";
}
.fa-thumbs-down:before {
  content: "\f165";
}
.fa-youtube-square:before {
  content: "\f166";
}
.fa-youtube:before {
  content: "\f167";
}
.fa-xing:before {
  content: "\f168";
}
.fa-xing-square:before {
  content: "\f169";
}
.fa-youtube-play:before {
  content: "\f16a";
}
.fa-dropbox:before {
  content: "\f16b";
}
.fa-stack-overflow:before {
  content: "\f16c";
}
.fa-instagram:before {
  content: "\f16d";
}
.fa-flickr:before {
  content: "\f16e";
}
.fa-adn:before {
  content: "\f170";
}
.fa-bitbucket:before {
  content: "\f171";
}
.fa-bitbucket-square:before {
  content: "\f172";
}
.fa-tumblr:before {
  content: "\f173";
}
.fa-tumblr-square:before {
  content: "\f174";
}
.fa-long-arrow-down:before {
  content: "\f175";
}
.fa-long-arrow-up:before {
  content: "\f176";
}
.fa-long-arrow-left:before {
  content: "\f177";
}
.fa-long-arrow-right:before {
  content: "\f178";
}
.fa-apple:before {
  content: "\f179";
}
.fa-windows:before {
  content: "\f17a";
}
.fa-android:before {
  content: "\f17b";
}
.fa-linux:before {
  content: "\f17c";
}
.fa-dribbble:before {
  content: "\f17d";
}
.fa-skype:before {
  content: "\f17e";
}
.fa-foursquare:before {
  content: "\f180";
}
.fa-trello:before {
  content: "\f181";
}
.fa-female:before {
  content: "\f182";
}
.fa-male:before {
  content: "\f183";
}
.fa-gittip:before,
.fa-gratipay:before {
  content: "\f184";
}
.fa-sun-o:before {
  content: "\f185";
}
.fa-moon-o:before {
  content: "\f186";
}
.fa-archive:before {
  content: "\f187";
}
.fa-bug:before {
  content: "\f188";
}
.fa-vk:before {
  content: "\f189";
}
.fa-weibo:before {
  content: "\f18a";
}
.fa-renren:before {
  content: "\f18b";
}
.fa-pagelines:before {
  content: "\f18c";
}
.fa-stack-exchange:before {
  content: "\f18d";
}
.fa-arrow-circle-o-right:before {
  content: "\f18e";
}
.fa-arrow-circle-o-left:before {
  content: "\f190";
}
.fa-toggle-left:before,
.fa-caret-square-o-left:before {
  content: "\f191";
}
.fa-dot-circle-o:before {
  content: "\f192";
}
.fa-wheelchair:before {
  content: "\f193";
}
.fa-vimeo-square:before {
  content: "\f194";
}
.fa-turkish-lira:before,
.fa-try:before {
  content: "\f195";
}
.fa-plus-square-o:before {
  content: "\f196";
}
.fa-space-shuttle:before {
  content: "\f197";
}
.fa-slack:before {
  content: "\f198";
}
.fa-envelope-square:before {
  content: "\f199";
}
.fa-wordpress:before {
  content: "\f19a";
}
.fa-openid:before {
  content: "\f19b";
}
.fa-institution:before,
.fa-bank:before,
.fa-university:before {
  content: "\f19c";
}
.fa-mortar-board:before,
.fa-graduation-cap:before {
  content: "\f19d";
}
.fa-yahoo:before {
  content: "\f19e";
}
.fa-google:before {
  content: "\f1a0";
}
.fa-reddit:before {
  content: "\f1a1";
}
.fa-reddit-square:before {
  content: "\f1a2";
}
.fa-stumbleupon-circle:before {
  content: "\f1a3";
}
.fa-stumbleupon:before {
  content: "\f1a4";
}
.fa-delicious:before {
  content: "\f1a5";
}
.fa-digg:before {
  content: "\f1a6";
}
.fa-pied-piper-pp:before {
  content: "\f1a7";
}
.fa-pied-piper-alt:before {
  content: "\f1a8";
}
.fa-drupal:before {
  content: "\f1a9";
}
.fa-joomla:before {
  content: "\f1aa";
}
.fa-language:before {
  content: "\f1ab";
}
.fa-fax:before {
  content: "\f1ac";
}
.fa-building:before {
  content: "\f1ad";
}
.fa-child:before {
  content: "\f1ae";
}
.fa-paw:before {
  content: "\f1b0";
}
.fa-spoon:before {
  content: "\f1b1";
}
.fa-cube:before {
  content: "\f1b2";
}
.fa-cubes:before {
  content: "\f1b3";
}
.fa-behance:before {
  content: "\f1b4";
}
.fa-behance-square:before {
  content: "\f1b5";
}
.fa-steam:before {
  content: "\f1b6";
}
.fa-steam-square:before {
  content: "\f1b7";
}
.fa-recycle:before {
  content: "\f1b8";
}
.fa-automobile:before,
.fa-car:before {
  content: "\f1b9";
}
.fa-cab:before,
.fa-taxi:before {
  content: "\f1ba";
}
.fa-tree:before {
  content: "\f1bb";
}
.fa-spotify:before {
  content: "\f1bc";
}
.fa-deviantart:before {
  content: "\f1bd";
}
.fa-soundcloud:before {
  content: "\f1be";
}
.fa-database:before {
  content: "\f1c0";
}
.fa-file-pdf-o:before {
  content: "\f1c1";
}
.fa-file-word-o:before {
  content: "\f1c2";
}
.fa-file-excel-o:before {
  content: "\f1c3";
}
.fa-file-powerpoint-o:before {
  content: "\f1c4";
}
.fa-file-photo-o:before,
.fa-file-picture-o:before,
.fa-file-image-o:before {
  content: "\f1c5";
}
.fa-file-zip-o:before,
.fa-file-archive-o:before {
  content: "\f1c6";
}
.fa-file-sound-o:before,
.fa-file-audio-o:before {
  content: "\f1c7";
}
.fa-file-movie-o:before,
.fa-file-video-o:before {
  content: "\f1c8";
}
.fa-file-code-o:before {
  content: "\f1c9";
}
.fa-vine:before {
  content: "\f1ca";
}
.fa-codepen:before {
  content: "\f1cb";
}
.fa-jsfiddle:before {
  content: "\f1cc";
}
.fa-life-bouy:before,
.fa-life-buoy:before,
.fa-life-saver:before,
.fa-support:before,
.fa-life-ring:before {
  content: "\f1cd";
}
.fa-circle-o-notch:before {
  content: "\f1ce";
}
.fa-ra:before,
.fa-resistance:before,
.fa-rebel:before {
  content: "\f1d0";
}
.fa-ge:before,
.fa-empire:before {
  content: "\f1d1";
}
.fa-git-square:before {
  content: "\f1d2";
}
.fa-git:before {
  content: "\f1d3";
}
.fa-y-combinator-square:before,
.fa-yc-square:before,
.fa-hacker-news:before {
  content: "\f1d4";
}
.fa-tencent-weibo:before {
  content: "\f1d5";
}
.fa-qq:before {
  content: "\f1d6";
}
.fa-wechat:before,
.fa-weixin:before {
  content: "\f1d7";
}
.fa-send:before,
.fa-paper-plane:before {
  content: "\f1d8";
}
.fa-send-o:before,
.fa-paper-plane-o:before {
  content: "\f1d9";
}
.fa-history:before {
  content: "\f1da";
}
.fa-circle-thin:before {
  content: "\f1db";
}
.fa-header:before {
  content: "\f1dc";
}
.fa-paragraph:before {
  content: "\f1dd";
}
.fa-sliders:before {
  content: "\f1de";
}
.fa-share-alt:before {
  content: "\f1e0";
}
.fa-share-alt-square:before {
  content: "\f1e1";
}
.fa-bomb:before {
  content: "\f1e2";
}
.fa-soccer-ball-o:before,
.fa-futbol-o:before {
  content: "\f1e3";
}
.fa-tty:before {
  content: "\f1e4";
}
.fa-binoculars:before {
  content: "\f1e5";
}
.fa-plug:before {
  content: "\f1e6";
}
.fa-slideshare:before {
  content: "\f1e7";
}
.fa-twitch:before {
  content: "\f1e8";
}
.fa-yelp:before {
  content: "\f1e9";
}
.fa-newspaper-o:before {
  content: "\f1ea";
}
.fa-wifi:before {
  content: "\f1eb";
}
.fa-calculator:before {
  content: "\f1ec";
}
.fa-paypal:before {
  content: "\f1ed";
}
.fa-google-wallet:before {
  content: "\f1ee";
}
.fa-cc-visa:before {
  content: "\f1f0";
}
.fa-cc-mastercard:before {
  content: "\f1f1";
}
.fa-cc-discover:before {
  content: "\f1f2";
}
.fa-cc-amex:before {
  content: "\f1f3";
}
.fa-cc-paypal:before {
  content: "\f1f4";
}
.fa-cc-stripe:before {
  content: "\f1f5";
}
.fa-bell-slash:before {
  content: "\f1f6";
}
.fa-bell-slash-o:before {
  content: "\f1f7";
}
.fa-trash:before {
  content: "\f1f8";
}
.fa-copyright:before {
  content: "\f1f9";
}
.fa-at:before {
  content: "\f1fa";
}
.fa-eyedropper:before {
  content: "\f1fb";
}
.fa-paint-brush:before {
  content: "\f1fc";
}
.fa-birthday-cake:before {
  content: "\f1fd";
}
.fa-area-chart:before {
  content: "\f1fe";
}
.fa-pie-chart:before {
  content: "\f200";
}
.fa-line-chart:before {
  content: "\f201";
}
.fa-lastfm:before {
  content: "\f202";
}
.fa-lastfm-square:before {
  content: "\f203";
}
.fa-toggle-off:before {
  content: "\f204";
}
.fa-toggle-on:before {
  content: "\f205";
}
.fa-bicycle:before {
  content: "\f206";
}
.fa-bus:before {
  content: "\f207";
}
.fa-ioxhost:before {
  content: "\f208";
}
.fa-angellist:before {
  content: "\f209";
}
.fa-cc:before {
  content: "\f20a";
}
.fa-shekel:before,
.fa-sheqel:before,
.fa-ils:before {
  content: "\f20b";
}
.fa-meanpath:before {
  content: "\f20c";
}
.fa-buysellads:before {
  content: "\f20d";
}
.fa-connectdevelop:before {
  content: "\f20e";
}
.fa-dashcube:before {
  content: "\f210";
}
.fa-forumbee:before {
  content: "\f211";
}
.fa-leanpub:before {
  content: "\f212";
}
.fa-sellsy:before {
  content: "\f213";
}
.fa-shirtsinbulk:before {
  content: "\f214";
}
.fa-simplybuilt:before {
  content: "\f215";
}
.fa-skyatlas:before {
  content: "\f216";
}
.fa-cart-plus:before {
  content: "\f217";
}
.fa-cart-arrow-down:before {
  content: "\f218";
}
.fa-diamond:before {
  content: "\f219";
}
.fa-ship:before {
  content: "\f21a";
}
.fa-user-secret:before {
  content: "\f21b";
}
.fa-motorcycle:before {
  content: "\f21c";
}
.fa-street-view:before {
  content: "\f21d";
}
.fa-heartbeat:before {
  content: "\f21e";
}
.fa-venus:before {
  content: "\f221";
}
.fa-mars:before {
  content: "\f222";
}
.fa-mercury:before {
  content: "\f223";
}
.fa-intersex:before,
.fa-transgender:before {
  content: "\f224";
}
.fa-transgender-alt:before {
  content: "\f225";
}
.fa-venus-double:before {
  content: "\f226";
}
.fa-mars-double:before {
  content: "\f227";
}
.fa-venus-mars:before {
  content: "\f228";
}
.fa-mars-stroke:before {
  content: "\f229";
}
.fa-mars-stroke-v:before {
  content: "\f22a";
}
.fa-mars-stroke-h:before {
  content: "\f22b";
}
.fa-neuter:before {
  content: "\f22c";
}
.fa-genderless:before {
  content: "\f22d";
}
.fa-facebook-official:before {
  content: "\f230";
}
.fa-pinterest-p:before {
  content: "\f231";
}
.fa-whatsapp:before {
  content: "\f232";
}
.fa-server:before {
  content: "\f233";
}
.fa-user-plus:before {
  content: "\f234";
}
.fa-user-times:before {
  content: "\f235";
}
.fa-hotel:before,
.fa-bed:before {
  content: "\f236";
}
.fa-viacoin:before {
  content: "\f237";
}
.fa-train:before {
  content: "\f238";
}
.fa-subway:before {
  content: "\f239";
}
.fa-medium:before {
  content: "\f23a";
}
.fa-yc:before,
.fa-y-combinator:before {
  content: "\f23b";
}
.fa-optin-monster:before {
  content: "\f23c";
}
.fa-opencart:before {
  content: "\f23d";
}
.fa-expeditedssl:before {
  content: "\f23e";
}
.fa-battery-4:before,
.fa-battery:before,
.fa-battery-full:before {
  content: "\f240";
}
.fa-battery-3:before,
.fa-battery-three-quarters:before {
  content: "\f241";
}
.fa-battery-2:before,
.fa-battery-half:before {
  content: "\f242";
}
.fa-battery-1:before,
.fa-battery-quarter:before {
  content: "\f243";
}
.fa-battery-0:before,
.fa-battery-empty:before {
  content: "\f244";
}
.fa-mouse-pointer:before {
  content: "\f245";
}
.fa-i-cursor:before {
  content: "\f246";
}
.fa-object-group:before {
  content: "\f247";
}
.fa-object-ungroup:before {
  content: "\f248";
}
.fa-sticky-note:before {
  content: "\f249";
}
.fa-sticky-note-o:before {
  content: "\f24a";
}
.fa-cc-jcb:before {
  content: "\f24b";
}
.fa-cc-diners-club:before {
  content: "\f24c";
}
.fa-clone:before {
  content: "\f24d";
}
.fa-balance-scale:before {
  content: "\f24e";
}
.fa-hourglass-o:before {
  content: "\f250";
}
.fa-hourglass-1:before,
.fa-hourglass-start:before {
  content: "\f251";
}
.fa-hourglass-2:before,
.fa-hourglass-half:before {
  content: "\f252";
}
.fa-hourglass-3:before,
.fa-hourglass-end:before {
  content: "\f253";
}
.fa-hourglass:before {
  content: "\f254";
}
.fa-hand-grab-o:before,
.fa-hand-rock-o:before {
  content: "\f255";
}
.fa-hand-stop-o:before,
.fa-hand-paper-o:before {
  content: "\f256";
}
.fa-hand-scissors-o:before {
  content: "\f257";
}
.fa-hand-lizard-o:before {
  content: "\f258";
}
.fa-hand-spock-o:before {
  content: "\f259";
}
.fa-hand-pointer-o:before {
  content: "\f25a";
}
.fa-hand-peace-o:before {
  content: "\f25b";
}
.fa-trademark:before {
  content: "\f25c";
}
.fa-registered:before {
  content: "\f25d";
}
.fa-creative-commons:before {
  content: "\f25e";
}
.fa-gg:before {
  content: "\f260";
}
.fa-gg-circle:before {
  content: "\f261";
}
.fa-tripadvisor:before {
  content: "\f262";
}
.fa-odnoklassniki:before {
  content: "\f263";
}
.fa-odnoklassniki-square:before {
  content: "\f264";
}
.fa-get-pocket:before {
  content: "\f265";
}
.fa-wikipedia-w:before {
  content: "\f266";
}
.fa-safari:before {
  content: "\f267";
}
.fa-chrome:before {
  content: "\f268";
}
.fa-firefox:before {
  content: "\f269";
}
.fa-opera:before {
  content: "\f26a";
}
.fa-internet-explorer:before {
  content: "\f26b";
}
.fa-tv:before,
.fa-television:before {
  content: "\f26c";
}
.fa-contao:before {
  content: "\f26d";
}
.fa-500px:before {
  content: "\f26e";
}
.fa-amazon:before {
  content: "\f270";
}
.fa-calendar-plus-o:before {
  content: "\f271";
}
.fa-calendar-minus-o:before {
  content: "\f272";
}
.fa-calendar-times-o:before {
  content: "\f273";
}
.fa-calendar-check-o:before {
  content: "\f274";
}
.fa-industry:before {
  content: "\f275";
}
.fa-map-pin:before {
  content: "\f276";
}
.fa-map-signs:before {
  content: "\f277";
}
.fa-map-o:before {
  content: "\f278";
}
.fa-map:before {
  content: "\f279";
}
.fa-commenting:before {
  content: "\f27a";
}
.fa-commenting-o:before {
  content: "\f27b";
}
.fa-houzz:before {
  content: "\f27c";
}
.fa-vimeo:before {
  content: "\f27d";
}
.fa-black-tie:before {
  content: "\f27e";
}
.fa-fonticons:before {
  content: "\f280";
}
.fa-reddit-alien:before {
  content: "\f281";
}
.fa-edge:before {
  content: "\f282";
}
.fa-credit-card-alt:before {
  content: "\f283";
}
.fa-codiepie:before {
  content: "\f284";
}
.fa-modx:before {
  content: "\f285";
}
.fa-fort-awesome:before {
  content: "\f286";
}
.fa-usb:before {
  content: "\f287";
}
.fa-product-hunt:before {
  content: "\f288";
}
.fa-mixcloud:before {
  content: "\f289";
}
.fa-scribd:before {
  content: "\f28a";
}
.fa-pause-circle:before {
  content: "\f28b";
}
.fa-pause-circle-o:before {
  content: "\f28c";
}
.fa-stop-circle:before {
  content: "\f28d";
}
.fa-stop-circle-o:before {
  content: "\f28e";
}
.fa-shopping-bag:before {
  content: "\f290";
}
.fa-shopping-basket:before {
  content: "\f291";
}
.fa-hashtag:before {
  content: "\f292";
}
.fa-bluetooth:before {
  content: "\f293";
}
.fa-bluetooth-b:before {
  content: "\f294";
}
.fa-percent:before {
  content: "\f295";
}
.fa-gitlab:before {
  content: "\f296";
}
.fa-wpbeginner:before {
  content: "\f297";
}
.fa-wpforms:before {
  content: "\f298";
}
.fa-envira:before {
  content: "\f299";
}
.fa-universal-access:before {
  content: "\f29a";
}
.fa-wheelchair-alt:before {
  content: "\f29b";
}
.fa-question-circle-o:before {
  content: "\f29c";
}
.fa-blind:before {
  content: "\f29d";
}
.fa-audio-description:before {
  content: "\f29e";
}
.fa-volume-control-phone:before {
  content: "\f2a0";
}
.fa-braille:before {
  content: "\f2a1";
}
.fa-assistive-listening-systems:before {
  content: "\f2a2";
}
.fa-asl-interpreting:before,
.fa-american-sign-language-interpreting:before {
  content: "\f2a3";
}
.fa-deafness:before,
.fa-hard-of-hearing:before,
.fa-deaf:before {
  content: "\f2a4";
}
.fa-glide:before {
  content: "\f2a5";
}
.fa-glide-g:before {
  content: "\f2a6";
}
.fa-signing:before,
.fa-sign-language:before {
  content: "\f2a7";
}
.fa-low-vision:before {
  content: "\f2a8";
}
.fa-viadeo:before {
  content: "\f2a9";
}
.fa-viadeo-square:before {
  content: "\f2aa";
}
.fa-snapchat:before {
  content: "\f2ab";
}
.fa-snapchat-ghost:before {
  content: "\f2ac";
}
.fa-snapchat-square:before {
  content: "\f2ad";
}
.fa-pied-piper:before {
  content: "\f2ae";
}
.fa-first-order:before {
  content: "\f2b0";
}
.fa-yoast:before {
  content: "\f2b1";
}
.fa-themeisle:before {
  content: "\f2b2";
}
.fa-google-plus-circle:before,
.fa-google-plus-official:before {
  content: "\f2b3";
}
.fa-fa:before,
.fa-font-awesome:before {
  content: "\f2b4";
}
.fa-handshake-o:before {
  content: "\f2b5";
}
.fa-envelope-open:before {
  content: "\f2b6";
}
.fa-envelope-open-o:before {
  content: "\f2b7";
}
.fa-linode:before {
  content: "\f2b8";
}
.fa-address-book:before {
  content: "\f2b9";
}
.fa-address-book-o:before {
  content: "\f2ba";
}
.fa-vcard:before,
.fa-address-card:before {
  content: "\f2bb";
}
.fa-vcard-o:before,
.fa-address-card-o:before {
  content: "\f2bc";
}
.fa-user-circle:before {
  content: "\f2bd";
}
.fa-user-circle-o:before {
  content: "\f2be";
}
.fa-user-o:before {
  content: "\f2c0";
}
.fa-id-badge:before {
  content: "\f2c1";
}
.fa-drivers-license:before,
.fa-id-card:before {
  content: "\f2c2";
}
.fa-drivers-license-o:before,
.fa-id-card-o:before {
  content: "\f2c3";
}
.fa-quora:before {
  content: "\f2c4";
}
.fa-free-code-camp:before {
  content: "\f2c5";
}
.fa-telegram:before {
  content: "\f2c6";
}
.fa-thermometer-4:before,
.fa-thermometer:before,
.fa-thermometer-full:before {
  content: "\f2c7";
}
.fa-thermometer-3:before,
.fa-thermometer-three-quarters:before {
  content: "\f2c8";
}
.fa-thermometer-2:before,
.fa-thermometer-half:before {
  content: "\f2c9";
}
.fa-thermometer-1:before,
.fa-thermometer-quarter:before {
  content: "\f2ca";
}
.fa-thermometer-0:before,
.fa-thermometer-empty:before {
  content: "\f2cb";
}
.fa-shower:before {
  content: "\f2cc";
}
.fa-bathtub:before,
.fa-s15:before,
.fa-bath:before {
  content: "\f2cd";
}
.fa-podcast:before {
  content: "\f2ce";
}
.fa-window-maximize:before {
  content: "\f2d0";
}
.fa-window-minimize:before {
  content: "\f2d1";
}
.fa-window-restore:before {
  content: "\f2d2";
}
.fa-times-rectangle:before,
.fa-window-close:before {
  content: "\f2d3";
}
.fa-times-rectangle-o:before,
.fa-window-close-o:before {
  content: "\f2d4";
}
.fa-bandcamp:before {
  content: "\f2d5";
}
.fa-grav:before {
  content: "\f2d6";
}
.fa-etsy:before {
  content: "\f2d7";
}
.fa-imdb:before {
  content: "\f2d8";
}
.fa-ravelry:before {
  content: "\f2d9";
}
.fa-eercast:before {
  content: "\f2da";
}
.fa-microchip:before {
  content: "\f2db";
}
.fa-snowflake-o:before {
  content: "\f2dc";
}
.fa-superpowers:before {
  content: "\f2dd";
}
.fa-wpexplorer:before {
  content: "\f2de";
}
.fa-meetup:before {
  content: "\f2e0";
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
/*!
*
* IPython base
*
*/
.modal.fade .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}
code {
  color: #000;
}
pre {
  font-size: inherit;
  line-height: inherit;
}
label {
  font-weight: normal;
}
/* Make the page background atleast 100% the height of the view port */
/* Make the page itself atleast 70% the height of the view port */
.border-box-sizing {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.corner-all {
  border-radius: 2px;
}
.no-padding {
  padding: 0px;
}
/* Flexible box model classes */
/* Taken from Alex Russell http://infrequently.org/2009/08/css-3-progress/ */
/* This file is a compatability layer.  It allows the usage of flexible box 
model layouts accross multiple browsers, including older browsers.  The newest,
universal implementation of the flexible box model is used when available (see
`Modern browsers` comments below).  Browsers that are known to implement this 
new spec completely include:

    Firefox 28.0+
    Chrome 29.0+
    Internet Explorer 11+ 
    Opera 17.0+

Browsers not listed, including Safari, are supported via the styling under the
`Old browsers` comments below.
*/
.hbox {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.hbox > * {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
}
.vbox {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.vbox > * {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
}
.hbox.reverse,
.vbox.reverse,
.reverse {
  /* Old browsers */
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  box-direction: reverse;
  /* Modern browsers */
  flex-direction: row-reverse;
}
.hbox.box-flex0,
.vbox.box-flex0,
.box-flex0 {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
  width: auto;
}
.hbox.box-flex1,
.vbox.box-flex1,
.box-flex1 {
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
.hbox.box-flex,
.vbox.box-flex,
.box-flex {
  /* Old browsers */
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
.hbox.box-flex2,
.vbox.box-flex2,
.box-flex2 {
  /* Old browsers */
  -webkit-box-flex: 2;
  -moz-box-flex: 2;
  box-flex: 2;
  /* Modern browsers */
  flex: 2;
}
.box-group1 {
  /*  Deprecated */
  -webkit-box-flex-group: 1;
  -moz-box-flex-group: 1;
  box-flex-group: 1;
}
.box-group2 {
  /* Deprecated */
  -webkit-box-flex-group: 2;
  -moz-box-flex-group: 2;
  box-flex-group: 2;
}
.hbox.start,
.vbox.start,
.start {
  /* Old browsers */
  -webkit-box-pack: start;
  -moz-box-pack: start;
  box-pack: start;
  /* Modern browsers */
  justify-content: flex-start;
}
.hbox.end,
.vbox.end,
.end {
  /* Old browsers */
  -webkit-box-pack: end;
  -moz-box-pack: end;
  box-pack: end;
  /* Modern browsers */
  justify-content: flex-end;
}
.hbox.center,
.vbox.center,
.center {
  /* Old browsers */
  -webkit-box-pack: center;
  -moz-box-pack: center;
  box-pack: center;
  /* Modern browsers */
  justify-content: center;
}
.hbox.baseline,
.vbox.baseline,
.baseline {
  /* Old browsers */
  -webkit-box-pack: baseline;
  -moz-box-pack: baseline;
  box-pack: baseline;
  /* Modern browsers */
  justify-content: baseline;
}
.hbox.stretch,
.vbox.stretch,
.stretch {
  /* Old browsers */
  -webkit-box-pack: stretch;
  -moz-box-pack: stretch;
  box-pack: stretch;
  /* Modern browsers */
  justify-content: stretch;
}
.hbox.align-start,
.vbox.align-start,
.align-start {
  /* Old browsers */
  -webkit-box-align: start;
  -moz-box-align: start;
  box-align: start;
  /* Modern browsers */
  align-items: flex-start;
}
.hbox.align-end,
.vbox.align-end,
.align-end {
  /* Old browsers */
  -webkit-box-align: end;
  -moz-box-align: end;
  box-align: end;
  /* Modern browsers */
  align-items: flex-end;
}
.hbox.align-center,
.vbox.align-center,
.align-center {
  /* Old browsers */
  -webkit-box-align: center;
  -moz-box-align: center;
  box-align: center;
  /* Modern browsers */
  align-items: center;
}
.hbox.align-baseline,
.vbox.align-baseline,
.align-baseline {
  /* Old browsers */
  -webkit-box-align: baseline;
  -moz-box-align: baseline;
  box-align: baseline;
  /* Modern browsers */
  align-items: baseline;
}
.hbox.align-stretch,
.vbox.align-stretch,
.align-stretch {
  /* Old browsers */
  -webkit-box-align: stretch;
  -moz-box-align: stretch;
  box-align: stretch;
  /* Modern browsers */
  align-items: stretch;
}
div.error {
  margin: 2em;
  text-align: center;
}
div.error > h1 {
  font-size: 500%;
  line-height: normal;
}
div.error > p {
  font-size: 200%;
  line-height: normal;
}
div.traceback-wrapper {
  text-align: left;
  max-width: 800px;
  margin: auto;
}
div.traceback-wrapper pre.traceback {
  max-height: 600px;
  overflow: auto;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
body {
  background-color: #fff;
  /* This makes sure that the body covers the entire window and needs to
       be in a different element than the display: box in wrapper below */
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  overflow: visible;
}
body > #header {
  /* Initially hidden to prevent FLOUC */
  display: none;
  background-color: #fff;
  /* Display over codemirror */
  position: relative;
  z-index: 100;
}
body > #header #header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
body > #header .header-bar {
  width: 100%;
  height: 1px;
  background: #e7e7e7;
  margin-bottom: -1px;
}
@media print {
  body > #header {
    display: none !important;
  }
}
#header-spacer {
  width: 100%;
  visibility: hidden;
}
@media print {
  #header-spacer {
    display: none;
  }
}
#ipython_notebook {
  padding-left: 0px;
  padding-top: 1px;
  padding-bottom: 1px;
}
[dir="rtl"] #ipython_notebook {
  margin-right: 10px;
  margin-left: 0;
}
[dir="rtl"] #ipython_notebook.pull-left {
  float: right !important;
  float: right;
}
.flex-spacer {
  flex: 1;
}
#noscript {
  width: auto;
  padding-top: 16px;
  padding-bottom: 16px;
  text-align: center;
  font-size: 22px;
  color: red;
  font-weight: bold;
}
#ipython_notebook img {
  height: 28px;
}
#site {
  width: 100%;
  display: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: auto;
}
@media print {
  #site {
    height: auto !important;
  }
}
/* Smaller buttons */
.ui-button .ui-button-text {
  padding: 0.2em 0.8em;
  font-size: 77%;
}
input.ui-button {
  padding: 0.3em 0.9em;
}
span#kernel_logo_widget {
  margin: 0 10px;
}
span#login_widget {
  float: right;
}
[dir="rtl"] span#login_widget {
  float: left;
}
span#login_widget > .button,
#logout {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
span#login_widget > .button:focus,
#logout:focus,
span#login_widget > .button.focus,
#logout.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
span#login_widget > .button:hover,
#logout:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
span#login_widget > .button:active,
#logout:active,
span#login_widget > .button.active,
#logout.active,
.open > .dropdown-togglespan#login_widget > .button,
.open > .dropdown-toggle#logout {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
span#login_widget > .button:active:hover,
#logout:active:hover,
span#login_widget > .button.active:hover,
#logout.active:hover,
.open > .dropdown-togglespan#login_widget > .button:hover,
.open > .dropdown-toggle#logout:hover,
span#login_widget > .button:active:focus,
#logout:active:focus,
span#login_widget > .button.active:focus,
#logout.active:focus,
.open > .dropdown-togglespan#login_widget > .button:focus,
.open > .dropdown-toggle#logout:focus,
span#login_widget > .button:active.focus,
#logout:active.focus,
span#login_widget > .button.active.focus,
#logout.active.focus,
.open > .dropdown-togglespan#login_widget > .button.focus,
.open > .dropdown-toggle#logout.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
span#login_widget > .button:active,
#logout:active,
span#login_widget > .button.active,
#logout.active,
.open > .dropdown-togglespan#login_widget > .button,
.open > .dropdown-toggle#logout {
  background-image: none;
}
span#login_widget > .button.disabled:hover,
#logout.disabled:hover,
span#login_widget > .button[disabled]:hover,
#logout[disabled]:hover,
fieldset[disabled] span#login_widget > .button:hover,
fieldset[disabled] #logout:hover,
span#login_widget > .button.disabled:focus,
#logout.disabled:focus,
span#login_widget > .button[disabled]:focus,
#logout[disabled]:focus,
fieldset[disabled] span#login_widget > .button:focus,
fieldset[disabled] #logout:focus,
span#login_widget > .button.disabled.focus,
#logout.disabled.focus,
span#login_widget > .button[disabled].focus,
#logout[disabled].focus,
fieldset[disabled] span#login_widget > .button.focus,
fieldset[disabled] #logout.focus {
  background-color: #fff;
  border-color: #ccc;
}
span#login_widget > .button .badge,
#logout .badge {
  color: #fff;
  background-color: #333;
}
.nav-header {
  text-transform: none;
}
#header > span {
  margin-top: 10px;
}
.modal_stretch .modal-dialog {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 80vh;
}
.modal_stretch .modal-dialog .modal-body {
  max-height: calc(100vh - 200px);
  overflow: auto;
  flex: 1;
}
.modal-header {
  cursor: move;
}
@media (min-width: 768px) {
  .modal .modal-dialog {
    width: 700px;
  }
}
@media (min-width: 768px) {
  select.form-control {
    margin-left: 12px;
    margin-right: 12px;
  }
}
/*!
*
* IPython auth
*
*/
.center-nav {
  display: inline-block;
  margin-bottom: -4px;
}
[dir="rtl"] .center-nav form.pull-left {
  float: right !important;
  float: right;
}
[dir="rtl"] .center-nav .navbar-text {
  float: right;
}
[dir="rtl"] .navbar-inner {
  text-align: right;
}
[dir="rtl"] div.text-left {
  text-align: right;
}
/*!
*
* IPython tree view
*
*/
/* We need an invisible input field on top of the sentense*/
/* "Drag file onto the list ..." */
.alternate_upload {
  background-color: none;
  display: inline;
}
.alternate_upload.form {
  padding: 0;
  margin: 0;
}
.alternate_upload input.fileinput {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}
.alternate_upload .btn-xs > input.fileinput {
  margin: -1px -5px;
}
.alternate_upload .btn-upload {
  position: relative;
  height: 22px;
}
::-webkit-file-upload-button {
  cursor: pointer;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
ul#tabs {
  margin-bottom: 4px;
}
ul#tabs a {
  padding-top: 6px;
  padding-bottom: 4px;
}
[dir="rtl"] ul#tabs.nav-tabs > li {
  float: right;
}
[dir="rtl"] ul#tabs.nav.nav-tabs {
  padding-right: 0;
}
ul.breadcrumb a:focus,
ul.breadcrumb a:hover {
  text-decoration: none;
}
ul.breadcrumb i.icon-home {
  font-size: 16px;
  margin-right: 4px;
}
ul.breadcrumb span {
  color: #5e5e5e;
}
.list_toolbar {
  padding: 4px 0 4px 0;
  vertical-align: middle;
}
.list_toolbar .tree-buttons {
  padding-top: 1px;
}
[dir="rtl"] .list_toolbar .tree-buttons .pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .list_toolbar .col-sm-4,
[dir="rtl"] .list_toolbar .col-sm-8 {
  float: right;
}
.dynamic-buttons {
  padding-top: 3px;
  display: inline-block;
}
.list_toolbar [class*="span"] {
  min-height: 24px;
}
.list_header {
  font-weight: bold;
  background-color: #EEE;
}
.list_placeholder {
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
}
.list_container {
  margin-top: 4px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
}
.list_container > div {
  border-bottom: 1px solid #ddd;
}
.list_container > div:hover .list-item {
  background-color: red;
}
.list_container > div:last-child {
  border: none;
}
.list_item:hover .list_item {
  background-color: #ddd;
}
.list_item a {
  text-decoration: none;
}
.list_item:hover {
  background-color: #fafafa;
}
.list_header > div,
.list_item > div {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
  line-height: 22px;
}
.list_header > div input,
.list_item > div input {
  margin-right: 7px;
  margin-left: 14px;
  vertical-align: text-bottom;
  line-height: 22px;
  position: relative;
  top: -1px;
}
.list_header > div .item_link,
.list_item > div .item_link {
  margin-left: -1px;
  vertical-align: baseline;
  line-height: 22px;
}
[dir="rtl"] .list_item > div input {
  margin-right: 0;
}
.new-file input[type=checkbox] {
  visibility: hidden;
}
.item_name {
  line-height: 22px;
  height: 24px;
}
.item_icon {
  font-size: 14px;
  color: #5e5e5e;
  margin-right: 7px;
  margin-left: 7px;
  line-height: 22px;
  vertical-align: baseline;
}
.item_modified {
  margin-right: 7px;
  margin-left: 7px;
}
[dir="rtl"] .item_modified.pull-right {
  float: left !important;
  float: left;
}
.item_buttons {
  line-height: 1em;
  margin-left: -5px;
}
.item_buttons .btn,
.item_buttons .btn-group,
.item_buttons .input-group {
  float: left;
}
.item_buttons > .btn,
.item_buttons > .btn-group,
.item_buttons > .input-group {
  margin-left: 5px;
}
.item_buttons .btn {
  min-width: 13ex;
}
.item_buttons .running-indicator {
  padding-top: 4px;
  color: #5cb85c;
}
.item_buttons .kernel-name {
  padding-top: 4px;
  color: #5bc0de;
  margin-right: 7px;
  float: left;
}
[dir="rtl"] .item_buttons.pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .item_buttons .kernel-name {
  margin-left: 7px;
  float: right;
}
.toolbar_info {
  height: 24px;
  line-height: 24px;
}
.list_item input:not([type=checkbox]) {
  padding-top: 3px;
  padding-bottom: 3px;
  height: 22px;
  line-height: 14px;
  margin: 0px;
}
.highlight_text {
  color: blue;
}
#project_name {
  display: inline-block;
  padding-left: 7px;
  margin-left: -2px;
}
#project_name > .breadcrumb {
  padding: 0px;
  margin-bottom: 0px;
  background-color: transparent;
  font-weight: bold;
}
.sort_button {
  display: inline-block;
  padding-left: 7px;
}
[dir="rtl"] .sort_button.pull-right {
  float: left !important;
  float: left;
}
#tree-selector {
  padding-right: 0px;
}
#button-select-all {
  min-width: 50px;
}
[dir="rtl"] #button-select-all.btn {
  float: right ;
}
#select-all {
  margin-left: 7px;
  margin-right: 2px;
  margin-top: 2px;
  height: 16px;
}
[dir="rtl"] #select-all.pull-left {
  float: right !important;
  float: right;
}
.menu_icon {
  margin-right: 2px;
}
.tab-content .row {
  margin-left: 0px;
  margin-right: 0px;
}
.folder_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f114";
}
.folder_icon:before.fa-pull-left {
  margin-right: .3em;
}
.folder_icon:before.fa-pull-right {
  margin-left: .3em;
}
.folder_icon:before.pull-left {
  margin-right: .3em;
}
.folder_icon:before.pull-right {
  margin-left: .3em;
}
.notebook_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f02d";
  position: relative;
  top: -1px;
}
.notebook_icon:before.fa-pull-left {
  margin-right: .3em;
}
.notebook_icon:before.fa-pull-right {
  margin-left: .3em;
}
.notebook_icon:before.pull-left {
  margin-right: .3em;
}
.notebook_icon:before.pull-right {
  margin-left: .3em;
}
.running_notebook_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f02d";
  position: relative;
  top: -1px;
  color: #5cb85c;
}
.running_notebook_icon:before.fa-pull-left {
  margin-right: .3em;
}
.running_notebook_icon:before.fa-pull-right {
  margin-left: .3em;
}
.running_notebook_icon:before.pull-left {
  margin-right: .3em;
}
.running_notebook_icon:before.pull-right {
  margin-left: .3em;
}
.file_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f016";
  position: relative;
  top: -2px;
}
.file_icon:before.fa-pull-left {
  margin-right: .3em;
}
.file_icon:before.fa-pull-right {
  margin-left: .3em;
}
.file_icon:before.pull-left {
  margin-right: .3em;
}
.file_icon:before.pull-right {
  margin-left: .3em;
}
#notebook_toolbar .pull-right {
  padding-top: 0px;
  margin-right: -1px;
}
ul#new-menu {
  left: auto;
  right: 0;
}
#new-menu .dropdown-header {
  font-size: 10px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 3px;
  margin: -3px 20px 0;
}
.kernel-menu-icon {
  padding-right: 12px;
  width: 24px;
  content: "\f096";
}
.kernel-menu-icon:before {
  content: "\f096";
}
.kernel-menu-icon-current:before {
  content: "\f00c";
}
#tab_content {
  padding-top: 20px;
}
#running .panel-group .panel {
  margin-top: 3px;
  margin-bottom: 1em;
}
#running .panel-group .panel .panel-heading {
  background-color: #EEE;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
  line-height: 22px;
}
#running .panel-group .panel .panel-heading a:focus,
#running .panel-group .panel .panel-heading a:hover {
  text-decoration: none;
}
#running .panel-group .panel .panel-body {
  padding: 0px;
}
#running .panel-group .panel .panel-body .list_container {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 0px;
  border-radius: 0px;
}
#running .panel-group .panel .panel-body .list_container .list_item {
  border-bottom: 1px solid #ddd;
}
#running .panel-group .panel .panel-body .list_container .list_item:last-child {
  border-bottom: 0px;
}
.delete-button {
  display: none;
}
.duplicate-button {
  display: none;
}
.rename-button {
  display: none;
}
.move-button {
  display: none;
}
.download-button {
  display: none;
}
.shutdown-button {
  display: none;
}
.dynamic-instructions {
  display: inline-block;
  padding-top: 4px;
}
/*!
*
* IPython text editor webapp
*
*/
.selected-keymap i.fa {
  padding: 0px 5px;
}
.selected-keymap i.fa:before {
  content: "\f00c";
}
#mode-menu {
  overflow: auto;
  max-height: 20em;
}
.edit_app #header {
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
.edit_app #menubar .navbar {
  /* Use a negative 1 bottom margin, so the border overlaps the border of the
    header */
  margin-bottom: -1px;
}
.dirty-indicator {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator.pull-left {
  margin-right: .3em;
}
.dirty-indicator.pull-right {
  margin-left: .3em;
}
.dirty-indicator-dirty {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator-dirty.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator-dirty.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator-dirty.pull-left {
  margin-right: .3em;
}
.dirty-indicator-dirty.pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator-clean.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean.pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean.pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f00c";
}
.dirty-indicator-clean:before.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean:before.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean:before.pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean:before.pull-right {
  margin-left: .3em;
}
#filename {
  font-size: 16pt;
  display: table;
  padding: 0px 5px;
}
#current-mode {
  padding-left: 5px;
  padding-right: 5px;
}
#texteditor-backdrop {
  padding-top: 20px;
  padding-bottom: 20px;
}
@media not print {
  #texteditor-backdrop {
    background-color: #EEE;
  }
}
@media print {
  #texteditor-backdrop #texteditor-container .CodeMirror-gutter,
  #texteditor-backdrop #texteditor-container .CodeMirror-gutters {
    background-color: #fff;
  }
}
@media not print {
  #texteditor-backdrop #texteditor-container .CodeMirror-gutter,
  #texteditor-backdrop #texteditor-container .CodeMirror-gutters {
    background-color: #fff;
  }
}
@media not print {
  #texteditor-backdrop #texteditor-container {
    padding: 0px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
    box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  }
}
.CodeMirror-dialog {
  background-color: #fff;
}
/*!
*
* IPython notebook
*
*/
/* CSS font colors for translated ANSI escape sequences */
/* The color values are a mix of
   http://www.xcolors.net/dl/baskerville-ivorylight and
   http://www.xcolors.net/dl/euphrasia */
.ansi-black-fg {
  color: #3E424D;
}
.ansi-black-bg {
  background-color: #3E424D;
}
.ansi-black-intense-fg {
  color: #282C36;
}
.ansi-black-intense-bg {
  background-color: #282C36;
}
.ansi-red-fg {
  color: #E75C58;
}
.ansi-red-bg {
  background-color: #E75C58;
}
.ansi-red-intense-fg {
  color: #B22B31;
}
.ansi-red-intense-bg {
  background-color: #B22B31;
}
.ansi-green-fg {
  color: #00A250;
}
.ansi-green-bg {
  background-color: #00A250;
}
.ansi-green-intense-fg {
  color: #007427;
}
.ansi-green-intense-bg {
  background-color: #007427;
}
.ansi-yellow-fg {
  color: #DDB62B;
}
.ansi-yellow-bg {
  background-color: #DDB62B;
}
.ansi-yellow-intense-fg {
  color: #B27D12;
}
.ansi-yellow-intense-bg {
  background-color: #B27D12;
}
.ansi-blue-fg {
  color: #208FFB;
}
.ansi-blue-bg {
  background-color: #208FFB;
}
.ansi-blue-intense-fg {
  color: #0065CA;
}
.ansi-blue-intense-bg {
  background-color: #0065CA;
}
.ansi-magenta-fg {
  color: #D160C4;
}
.ansi-magenta-bg {
  background-color: #D160C4;
}
.ansi-magenta-intense-fg {
  color: #A03196;
}
.ansi-magenta-intense-bg {
  background-color: #A03196;
}
.ansi-cyan-fg {
  color: #60C6C8;
}
.ansi-cyan-bg {
  background-color: #60C6C8;
}
.ansi-cyan-intense-fg {
  color: #258F8F;
}
.ansi-cyan-intense-bg {
  background-color: #258F8F;
}
.ansi-white-fg {
  color: #C5C1B4;
}
.ansi-white-bg {
  background-color: #C5C1B4;
}
.ansi-white-intense-fg {
  color: #A1A6B2;
}
.ansi-white-intense-bg {
  background-color: #A1A6B2;
}
.ansi-default-inverse-fg {
  color: #FFFFFF;
}
.ansi-default-inverse-bg {
  background-color: #000000;
}
.ansi-bold {
  font-weight: bold;
}
.ansi-underline {
  text-decoration: underline;
}
/* The following styles are deprecated an will be removed in a future version */
.ansibold {
  font-weight: bold;
}
.ansi-inverse {
  outline: 0.5px dotted;
}
/* use dark versions for foreground, to improve visibility */
.ansiblack {
  color: black;
}
.ansired {
  color: darkred;
}
.ansigreen {
  color: darkgreen;
}
.ansiyellow {
  color: #c4a000;
}
.ansiblue {
  color: darkblue;
}
.ansipurple {
  color: darkviolet;
}
.ansicyan {
  color: steelblue;
}
.ansigray {
  color: gray;
}
/* and light for background, for the same reason */
.ansibgblack {
  background-color: black;
}
.ansibgred {
  background-color: red;
}
.ansibggreen {
  background-color: green;
}
.ansibgyellow {
  background-color: yellow;
}
.ansibgblue {
  background-color: blue;
}
.ansibgpurple {
  background-color: magenta;
}
.ansibgcyan {
  background-color: cyan;
}
.ansibggray {
  background-color: gray;
}
div.cell {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  width: 100%;
  padding: 5px;
  /* This acts as a spacer between cells, that is outside the border */
  margin: 0px;
  outline: none;
  position: relative;
  overflow: visible;
}
div.cell:before {
  position: absolute;
  display: block;
  top: -1px;
  left: -1px;
  width: 5px;
  height: calc(100% +  2px);
  content: '';
  background: transparent;
}
div.cell.jupyter-soft-selected {
  border-left-color: #E3F2FD;
  border-left-width: 1px;
  padding-left: 5px;
  border-right-color: #E3F2FD;
  border-right-width: 1px;
  background: #E3F2FD;
}
@media print {
  div.cell.jupyter-soft-selected {
    border-color: transparent;
  }
}
div.cell.selected,
div.cell.selected.jupyter-soft-selected {
  border-color: #ababab;
}
div.cell.selected:before,
div.cell.selected.jupyter-soft-selected:before {
  position: absolute;
  display: block;
  top: -1px;
  left: -1px;
  width: 5px;
  height: calc(100% +  2px);
  content: '';
  background: #42A5F5;
}
@media print {
  div.cell.selected,
  div.cell.selected.jupyter-soft-selected {
    border-color: transparent;
  }
}
.edit_mode div.cell.selected {
  border-color: #66BB6A;
}
.edit_mode div.cell.selected:before {
  position: absolute;
  display: block;
  top: -1px;
  left: -1px;
  width: 5px;
  height: calc(100% +  2px);
  content: '';
  background: #66BB6A;
}
@media print {
  .edit_mode div.cell.selected {
    border-color: transparent;
  }
}
.prompt {
  /* This needs to be wide enough for 3 digit prompt numbers: In[100]: */
  min-width: 14ex;
  /* This padding is tuned to match the padding on the CodeMirror editor. */
  padding: 0.4em;
  margin: 0px;
  font-family: monospace;
  text-align: right;
  /* This has to match that of the the CodeMirror class line-height below */
  line-height: 1.21429em;
  /* Don't highlight prompt number selection */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* Use default cursor */
  cursor: default;
}
@media (max-width: 540px) {
  .prompt {
    text-align: left;
  }
}
div.inner_cell {
  min-width: 0;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
/* input_area and input_prompt must match in top border and margin for alignment */
div.input_area {
  border: 1px solid #cfcfcf;
  border-radius: 2px;
  background: #f7f7f7;
  line-height: 1.21429em;
}
/* This is needed so that empty prompt areas can collapse to zero height when there
   is no content in the output_subarea and the prompt. The main purpose of this is
   to make sure that empty JavaScript output_subareas have no height. */
div.prompt:empty {
  padding-top: 0;
  padding-bottom: 0;
}
div.unrecognized_cell {
  padding: 5px 5px 5px 0px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
div.unrecognized_cell .inner_cell {
  border-radius: 2px;
  padding: 5px;
  font-weight: bold;
  color: red;
  border: 1px solid #cfcfcf;
  background: #eaeaea;
}
div.unrecognized_cell .inner_cell a {
  color: inherit;
  text-decoration: none;
}
div.unrecognized_cell .inner_cell a:hover {
  color: inherit;
  text-decoration: none;
}
@media (max-width: 540px) {
  div.unrecognized_cell > div.prompt {
    display: none;
  }
}
div.code_cell {
  /* avoid page breaking on code cells when printing */
}
@media print {
  div.code_cell {
    page-break-inside: avoid;
  }
}
/* any special styling for code cells that are currently running goes here */
div.input {
  page-break-inside: avoid;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.input {
    /* Old browsers */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: stretch;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-box-align: stretch;
    display: box;
    box-orient: vertical;
    box-align: stretch;
    /* Modern browsers */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}
/* input_area and input_prompt must match in top border and margin for alignment */
div.input_prompt {
  color: #303F9F;
  border-top: 1px solid transparent;
}
div.input_area > div.highlight {
  margin: 0.4em;
  border: none;
  padding: 0px;
  background-color: transparent;
}
div.input_area > div.highlight > pre {
  margin: 0px;
  border: none;
  padding: 0px;
  background-color: transparent;
}
/* The following gets added to the <head> if it is detected that the user has a
 * monospace font with inconsistent normal/bold/italic height.  See
 * notebookmain.js.  Such fonts will have keywords vertically offset with
 * respect to the rest of the text.  The user should select a better font.
 * See: https://github.com/ipython/ipython/issues/1503
 *
 * .CodeMirror span {
 *      vertical-align: bottom;
 * }
 */
.CodeMirror {
  line-height: 1.21429em;
  /* Changed from 1em to our global default */
  font-size: 14px;
  height: auto;
  /* Changed to auto to autogrow */
  background: none;
  /* Changed from white to allow our bg to show through */
}
.CodeMirror-scroll {
  /*  The CodeMirror docs are a bit fuzzy on if overflow-y should be hidden or visible.*/
  /*  We have found that if it is visible, vertical scrollbars appear with font size changes.*/
  overflow-y: hidden;
  overflow-x: auto;
}
.CodeMirror-lines {
  /* In CM2, this used to be 0.4em, but in CM3 it went to 4px. We need the em value because */
  /* we have set a different line-height and want this to scale with that. */
  /* Note that this should set vertical padding only, since CodeMirror assumes
       that horizontal padding will be set on CodeMirror pre */
  padding: 0.4em 0;
}
.CodeMirror-linenumber {
  padding: 0 8px 0 4px;
}
.CodeMirror-gutters {
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.CodeMirror pre {
  /* In CM3 this went to 4px from 0 in CM2. This sets horizontal padding only,
    use .CodeMirror-lines for vertical */
  padding: 0 0.4em;
  border: 0;
  border-radius: 0;
}
.CodeMirror-cursor {
  border-left: 1.4px solid black;
}
@media screen and (min-width: 2138px) and (max-width: 4319px) {
  .CodeMirror-cursor {
    border-left: 2px solid black;
  }
}
@media screen and (min-width: 4320px) {
  .CodeMirror-cursor {
    border-left: 4px solid black;
  }
}
/*

Original style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>
Adapted from GitHub theme

*/
.highlight-base {
  color: #000;
}
.highlight-variable {
  color: #000;
}
.highlight-variable-2 {
  color: #1a1a1a;
}
.highlight-variable-3 {
  color: #333333;
}
.highlight-string {
  color: #BA2121;
}
.highlight-comment {
  color: #408080;
  font-style: italic;
}
.highlight-number {
  color: #080;
}
.highlight-atom {
  color: #88F;
}
.highlight-keyword {
  color: #008000;
  font-weight: bold;
}
.highlight-builtin {
  color: #008000;
}
.highlight-error {
  color: #f00;
}
.highlight-operator {
  color: #AA22FF;
  font-weight: bold;
}
.highlight-meta {
  color: #AA22FF;
}
/* previously not defined, copying from default codemirror */
.highlight-def {
  color: #00f;
}
.highlight-string-2 {
  color: #f50;
}
.highlight-qualifier {
  color: #555;
}
.highlight-bracket {
  color: #997;
}
.highlight-tag {
  color: #170;
}
.highlight-attribute {
  color: #00c;
}
.highlight-header {
  color: blue;
}
.highlight-quote {
  color: #090;
}
.highlight-link {
  color: #00c;
}
/* apply the same style to codemirror */
.cm-s-ipython span.cm-keyword {
  color: #008000;
  font-weight: bold;
}
.cm-s-ipython span.cm-atom {
  color: #88F;
}
.cm-s-ipython span.cm-number {
  color: #080;
}
.cm-s-ipython span.cm-def {
  color: #00f;
}
.cm-s-ipython span.cm-variable {
  color: #000;
}
.cm-s-ipython span.cm-operator {
  color: #AA22FF;
  font-weight: bold;
}
.cm-s-ipython span.cm-variable-2 {
  color: #1a1a1a;
}
.cm-s-ipython span.cm-variable-3 {
  color: #333333;
}
.cm-s-ipython span.cm-comment {
  color: #408080;
  font-style: italic;
}
.cm-s-ipython span.cm-string {
  color: #BA2121;
}
.cm-s-ipython span.cm-string-2 {
  color: #f50;
}
.cm-s-ipython span.cm-meta {
  color: #AA22FF;
}
.cm-s-ipython span.cm-qualifier {
  color: #555;
}
.cm-s-ipython span.cm-builtin {
  color: #008000;
}
.cm-s-ipython span.cm-bracket {
  color: #997;
}
.cm-s-ipython span.cm-tag {
  color: #170;
}
.cm-s-ipython span.cm-attribute {
  color: #00c;
}
.cm-s-ipython span.cm-header {
  color: blue;
}
.cm-s-ipython span.cm-quote {
  color: #090;
}
.cm-s-ipython span.cm-link {
  color: #00c;
}
.cm-s-ipython span.cm-error {
  color: #f00;
}
.cm-s-ipython span.cm-tab {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAMCAYAAAAkuj5RAAAAAXNSR0IArs4c6QAAAGFJREFUSMft1LsRQFAQheHPowAKoACx3IgEKtaEHujDjORSgWTH/ZOdnZOcM/sgk/kFFWY0qV8foQwS4MKBCS3qR6ixBJvElOobYAtivseIE120FaowJPN75GMu8j/LfMwNjh4HUpwg4LUAAAAASUVORK5CYII=);
  background-position: right;
  background-repeat: no-repeat;
}
div.output_wrapper {
  /* this position must be relative to enable descendents to be absolute within it */
  position: relative;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1;
}
/* class for the output area when it should be height-limited */
div.output_scroll {
  /* ideally, this would be max-height, but FF barfs all over that */
  height: 24em;
  /* FF needs this *and the wrapper* to specify full width, or it will shrinkwrap */
  width: 100%;
  overflow: auto;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8);
  display: block;
}
/* output div while it is collapsed */
div.output_collapsed {
  margin: 0px;
  padding: 0px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
div.out_prompt_overlay {
  height: 100%;
  padding: 0px 0.4em;
  position: absolute;
  border-radius: 2px;
}
div.out_prompt_overlay:hover {
  /* use inner shadow to get border that is computed the same on WebKit/FF */
  -webkit-box-shadow: inset 0 0 1px #000;
  box-shadow: inset 0 0 1px #000;
  background: rgba(240, 240, 240, 0.5);
}
div.output_prompt {
  color: #D84315;
}
/* This class is the outer container of all output sections. */
div.output_area {
  padding: 0px;
  page-break-inside: avoid;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
div.output_area .MathJax_Display {
  text-align: left !important;
}
div.output_area .rendered_html table {
  margin-left: 0;
  margin-right: 0;
}
div.output_area .rendered_html img {
  margin-left: 0;
  margin-right: 0;
}
div.output_area img,
div.output_area svg {
  max-width: 100%;
  height: auto;
}
div.output_area img.unconfined,
div.output_area svg.unconfined {
  max-width: none;
}
div.output_area .mglyph > img {
  max-width: none;
}
/* This is needed to protect the pre formating from global settings such
   as that of bootstrap */
.output {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.output_area {
    /* Old browsers */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: stretch;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-box-align: stretch;
    display: box;
    box-orient: vertical;
    box-align: stretch;
    /* Modern browsers */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}
div.output_area pre {
  margin: 0;
  padding: 1px 0 1px 0;
  border: 0;
  vertical-align: baseline;
  color: black;
  background-color: transparent;
  border-radius: 0;
}
/* This class is for the output subarea inside the output_area and after
   the prompt div. */
div.output_subarea {
  overflow-x: auto;
  padding: 0.4em;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
  max-width: calc(100% - 14ex);
}
div.output_scroll div.output_subarea {
  overflow-x: visible;
}
/* The rest of the output_* classes are for special styling of the different
   output types */
/* all text output has this class: */
div.output_text {
  text-align: left;
  color: #000;
  /* This has to match that of the the CodeMirror class line-height below */
  line-height: 1.21429em;
}
/* stdout/stderr are 'text' as well as 'stream', but execute_result/error are *not* streams */
div.output_stderr {
  background: #fdd;
  /* very light red background for stderr */
}
div.output_latex {
  text-align: left;
}
/* Empty output_javascript divs should have no height */
div.output_javascript:empty {
  padding: 0;
}
.js-error {
  color: darkred;
}
/* raw_input styles */
div.raw_input_container {
  line-height: 1.21429em;
  padding-top: 5px;
}
pre.raw_input_prompt {
  /* nothing needed here. */
}
input.raw_input {
  font-family: monospace;
  font-size: inherit;
  color: inherit;
  width: auto;
  /* make sure input baseline aligns with prompt */
  vertical-align: baseline;
  /* padding + margin = 0.5em between prompt and cursor */
  padding: 0em 0.25em;
  margin: 0em 0.25em;
}
input.raw_input:focus {
  box-shadow: none;
}
p.p-space {
  margin-bottom: 10px;
}
div.output_unrecognized {
  padding: 5px;
  font-weight: bold;
  color: red;
}
div.output_unrecognized a {
  color: inherit;
  text-decoration: none;
}
div.output_unrecognized a:hover {
  color: inherit;
  text-decoration: none;
}
.rendered_html {
  color: #000;
  /* any extras will just be numbers: */
}
.rendered_html em {
  font-style: italic;
}
.rendered_html strong {
  font-weight: bold;
}
.rendered_html u {
  text-decoration: underline;
}
.rendered_html :link {
  text-decoration: underline;
}
.rendered_html :visited {
  text-decoration: underline;
}
.rendered_html h1 {
  font-size: 185.7%;
  margin: 1.08em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h2 {
  font-size: 157.1%;
  margin: 1.27em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h3 {
  font-size: 128.6%;
  margin: 1.55em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h4 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h5 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
  font-style: italic;
}
.rendered_html h6 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
  font-style: italic;
}
.rendered_html h1:first-child {
  margin-top: 0.538em;
}
.rendered_html h2:first-child {
  margin-top: 0.636em;
}
.rendered_html h3:first-child {
  margin-top: 0.777em;
}
.rendered_html h4:first-child {
  margin-top: 1em;
}
.rendered_html h5:first-child {
  margin-top: 1em;
}
.rendered_html h6:first-child {
  margin-top: 1em;
}
.rendered_html ul:not(.list-inline),
.rendered_html ol:not(.list-inline) {
  padding-left: 2em;
}
.rendered_html ul {
  list-style: disc;
}
.rendered_html ul ul {
  list-style: square;
  margin-top: 0;
}
.rendered_html ul ul ul {
  list-style: circle;
}
.rendered_html ol {
  list-style: decimal;
}
.rendered_html ol ol {
  list-style: upper-alpha;
  margin-top: 0;
}
.rendered_html ol ol ol {
  list-style: lower-alpha;
}
.rendered_html ol ol ol ol {
  list-style: lower-roman;
}
.rendered_html ol ol ol ol ol {
  list-style: decimal;
}
.rendered_html * + ul {
  margin-top: 1em;
}
.rendered_html * + ol {
  margin-top: 1em;
}
.rendered_html hr {
  color: black;
  background-color: black;
}
.rendered_html pre {
  margin: 1em 2em;
  padding: 0px;
  background-color: #fff;
}
.rendered_html code {
  background-color: #eff0f1;
}
.rendered_html p code {
  padding: 1px 5px;
}
.rendered_html pre code {
  background-color: #fff;
}
.rendered_html pre,
.rendered_html code {
  border: 0;
  color: #000;
  font-size: 100%;
}
.rendered_html blockquote {
  margin: 1em 2em;
}
.rendered_html table {
  margin-left: auto;
  margin-right: auto;
  border: none;
  border-collapse: collapse;
  border-spacing: 0;
  color: black;
  font-size: 12px;
  table-layout: fixed;
}
.rendered_html thead {
  border-bottom: 1px solid black;
  vertical-align: bottom;
}
.rendered_html tr,
.rendered_html th,
.rendered_html td {
  text-align: right;
  vertical-align: middle;
  padding: 0.5em 0.5em;
  line-height: normal;
  white-space: normal;
  max-width: none;
  border: none;
}
.rendered_html th {
  font-weight: bold;
}
.rendered_html tbody tr:nth-child(odd) {
  background: #f5f5f5;
}
.rendered_html tbody tr:hover {
  background: rgba(66, 165, 245, 0.2);
}
.rendered_html * + table {
  margin-top: 1em;
}
.rendered_html p {
  text-align: left;
}
.rendered_html * + p {
  margin-top: 1em;
}
.rendered_html img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.rendered_html * + img {
  margin-top: 1em;
}
.rendered_html img,
.rendered_html svg {
  max-width: 100%;
  height: auto;
}
.rendered_html img.unconfined,
.rendered_html svg.unconfined {
  max-width: none;
}
.rendered_html .alert {
  margin-bottom: initial;
}
.rendered_html * + .alert {
  margin-top: 1em;
}
[dir="rtl"] .rendered_html p {
  text-align: right;
}
div.text_cell {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.text_cell > div.prompt {
    display: none;
  }
}
div.text_cell_render {
  /*font-family: "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;*/
  outline: none;
  resize: none;
  width: inherit;
  border-style: none;
  padding: 0.5em 0.5em 0.5em 0.4em;
  color: #000;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
a.anchor-link:link {
  text-decoration: none;
  padding: 0px 20px;
  visibility: hidden;
}
h1:hover .anchor-link,
h2:hover .anchor-link,
h3:hover .anchor-link,
h4:hover .anchor-link,
h5:hover .anchor-link,
h6:hover .anchor-link {
  visibility: visible;
}
.text_cell.rendered .input_area {
  display: none;
}
.text_cell.rendered .rendered_html {
  overflow-x: auto;
  overflow-y: hidden;
}
.text_cell.rendered .rendered_html tr,
.text_cell.rendered .rendered_html th,
.text_cell.rendered .rendered_html td {
  max-width: none;
}
.text_cell.unrendered .text_cell_render {
  display: none;
}
.text_cell .dropzone .input_area {
  border: 2px dashed #bababa;
  margin: -1px;
}
.cm-header-1,
.cm-header-2,
.cm-header-3,
.cm-header-4,
.cm-header-5,
.cm-header-6 {
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.cm-header-1 {
  font-size: 185.7%;
}
.cm-header-2 {
  font-size: 157.1%;
}
.cm-header-3 {
  font-size: 128.6%;
}
.cm-header-4 {
  font-size: 110%;
}
.cm-header-5 {
  font-size: 100%;
  font-style: italic;
}
.cm-header-6 {
  font-size: 100%;
  font-style: italic;
}
/*!
*
* IPython notebook webapp
*
*/
@media (max-width: 767px) {
  .notebook_app {
    padding-left: 0px;
    padding-right: 0px;
  }
}
#ipython-main-app {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 100%;
}
div#notebook_panel {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 100%;
}
div#notebook {
  font-size: 14px;
  line-height: 20px;
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
  /* This spaces the page away from the edge of the notebook area */
  padding-top: 20px;
  margin: 0px;
  outline: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  min-height: 100%;
}
@media not print {
  #notebook-container {
    padding: 15px;
    background-color: #fff;
    min-height: 0;
    -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
    box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  }
}
@media print {
  #notebook-container {
    width: 100%;
  }
}
div.ui-widget-content {
  border: 1px solid #ababab;
  outline: none;
}
pre.dialog {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0.4em;
  padding-left: 2em;
}
p.dialog {
  padding: 0.2em;
}
/* Word-wrap output correctly.  This is the CSS3 spelling, though Firefox seems
   to not honor it correctly.  Webkit browsers (Chrome, rekonq, Safari) do.
 */
pre,
code,
kbd,
samp {
  white-space: pre-wrap;
}
#fonttest {
  font-family: monospace;
}
p {
  margin-bottom: 0;
}
.end_space {
  min-height: 100px;
  transition: height .2s ease;
}
.notebook_app > #header {
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
@media not print {
  .notebook_app {
    background-color: #EEE;
  }
}
kbd {
  border-style: solid;
  border-width: 1px;
  box-shadow: none;
  margin: 2px;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
}
.jupyter-keybindings {
  padding: 1px;
  line-height: 24px;
  border-bottom: 1px solid gray;
}
.jupyter-keybindings input {
  margin: 0;
  padding: 0;
  border: none;
}
.jupyter-keybindings i {
  padding: 6px;
}
.well code {
  background-color: #ffffff;
  border-color: #ababab;
  border-width: 1px;
  border-style: solid;
  padding: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
}
/* CSS for the cell toolbar */
.celltoolbar {
  border: thin solid #CFCFCF;
  border-bottom: none;
  background: #EEE;
  border-radius: 2px 2px 0px 0px;
  width: 100%;
  height: 29px;
  padding-right: 4px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  /* Old browsers */
  -webkit-box-pack: end;
  -moz-box-pack: end;
  box-pack: end;
  /* Modern browsers */
  justify-content: flex-end;
  display: -webkit-flex;
}
@media print {
  .celltoolbar {
    display: none;
  }
}
.ctb_hideshow {
  display: none;
  vertical-align: bottom;
}
/* ctb_show is added to the ctb_hideshow div to show the cell toolbar.
   Cell toolbars are only shown when the ctb_global_show class is also set.
*/
.ctb_global_show .ctb_show.ctb_hideshow {
  display: block;
}
.ctb_global_show .ctb_show + .input_area,
.ctb_global_show .ctb_show + div.text_cell_input,
.ctb_global_show .ctb_show ~ div.text_cell_render {
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}
.ctb_global_show .ctb_show ~ div.text_cell_render {
  border: 1px solid #cfcfcf;
}
.celltoolbar {
  font-size: 87%;
  padding-top: 3px;
}
.celltoolbar select {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
  width: inherit;
  font-size: inherit;
  height: 22px;
  padding: 0px;
  display: inline-block;
}
.celltoolbar select:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.celltoolbar select::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.celltoolbar select:-ms-input-placeholder {
  color: #999;
}
.celltoolbar select::-webkit-input-placeholder {
  color: #999;
}
.celltoolbar select::-ms-expand {
  border: 0;
  background-color: transparent;
}
.celltoolbar select[disabled],
.celltoolbar select[readonly],
fieldset[disabled] .celltoolbar select {
  background-color: #eeeeee;
  opacity: 1;
}
.celltoolbar select[disabled],
fieldset[disabled] .celltoolbar select {
  cursor: not-allowed;
}
textarea.celltoolbar select {
  height: auto;
}
select.celltoolbar select {
  height: 30px;
  line-height: 30px;
}
textarea.celltoolbar select,
select[multiple].celltoolbar select {
  height: auto;
}
.celltoolbar label {
  margin-left: 5px;
  margin-right: 5px;
}
.tags_button_container {
  width: 100%;
  display: flex;
}
.tag-container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
}
.tag-container > * {
  margin: 0 4px;
}
.remove-tag-btn {
  margin-left: 4px;
}
.tags-input {
  display: flex;
}
.cell-tag:last-child:after {
  content: "";
  position: absolute;
  right: 0;
  width: 40px;
  height: 100%;
  /* Fade to background color of cell toolbar */
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #EEE);
}
.tags-input > * {
  margin-left: 4px;
}
.cell-tag,
.tags-input input,
.tags-input button {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
  box-shadow: none;
  width: inherit;
  font-size: inherit;
  height: 22px;
  line-height: 22px;
  padding: 0px 4px;
  display: inline-block;
}
.cell-tag:focus,
.tags-input input:focus,
.tags-input button:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.cell-tag::-moz-placeholder,
.tags-input input::-moz-placeholder,
.tags-input button::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.cell-tag:-ms-input-placeholder,
.tags-input input:-ms-input-placeholder,
.tags-input button:-ms-input-placeholder {
  color: #999;
}
.cell-tag::-webkit-input-placeholder,
.tags-input input::-webkit-input-placeholder,
.tags-input button::-webkit-input-placeholder {
  color: #999;
}
.cell-tag::-ms-expand,
.tags-input input::-ms-expand,
.tags-input button::-ms-expand {
  border: 0;
  background-color: transparent;
}
.cell-tag[disabled],
.tags-input input[disabled],
.tags-input button[disabled],
.cell-tag[readonly],
.tags-input input[readonly],
.tags-input button[readonly],
fieldset[disabled] .cell-tag,
fieldset[disabled] .tags-input input,
fieldset[disabled] .tags-input button {
  background-color: #eeeeee;
  opacity: 1;
}
.cell-tag[disabled],
.tags-input input[disabled],
.tags-input button[disabled],
fieldset[disabled] .cell-tag,
fieldset[disabled] .tags-input input,
fieldset[disabled] .tags-input button {
  cursor: not-allowed;
}
textarea.cell-tag,
textarea.tags-input input,
textarea.tags-input button {
  height: auto;
}
select.cell-tag,
select.tags-input input,
select.tags-input button {
  height: 30px;
  line-height: 30px;
}
textarea.cell-tag,
textarea.tags-input input,
textarea.tags-input button,
select[multiple].cell-tag,
select[multiple].tags-input input,
select[multiple].tags-input button {
  height: auto;
}
.cell-tag,
.tags-input button {
  padding: 0px 4px;
}
.cell-tag {
  background-color: #fff;
  white-space: nowrap;
}
.tags-input input[type=text]:focus {
  outline: none;
  box-shadow: none;
  border-color: #ccc;
}
.completions {
  position: absolute;
  z-index: 110;
  overflow: hidden;
  border: 1px solid #ababab;
  border-radius: 2px;
  -webkit-box-shadow: 0px 6px 10px -1px #adadad;
  box-shadow: 0px 6px 10px -1px #adadad;
  line-height: 1;
}
.completions select {
  background: white;
  outline: none;
  border: none;
  padding: 0px;
  margin: 0px;
  overflow: auto;
  font-family: monospace;
  font-size: 110%;
  color: #000;
  width: auto;
}
.completions select option.context {
  color: #286090;
}
#kernel_logo_widget .current_kernel_logo {
  display: none;
  margin-top: -1px;
  margin-bottom: -1px;
  width: 32px;
  height: 32px;
}
[dir="rtl"] #kernel_logo_widget {
  float: left !important;
  float: left;
}
.modal .modal-body .move-path {
  display: flex;
  flex-direction: row;
  justify-content: space;
  align-items: center;
}
.modal .modal-body .move-path .server-root {
  padding-right: 20px;
}
.modal .modal-body .move-path .path-input {
  flex: 1;
}
#menubar {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin-top: 1px;
}
#menubar .navbar {
  border-top: 1px;
  border-radius: 0px 0px 2px 2px;
  margin-bottom: 0px;
}
#menubar .navbar-toggle {
  float: left;
  padding-top: 7px;
  padding-bottom: 7px;
  border: none;
}
#menubar .navbar-collapse {
  clear: left;
}
[dir="rtl"] #menubar .navbar-toggle {
  float: right;
}
[dir="rtl"] #menubar .navbar-collapse {
  clear: right;
}
[dir="rtl"] #menubar .navbar-nav {
  float: right;
}
[dir="rtl"] #menubar .nav {
  padding-right: 0px;
}
[dir="rtl"] #menubar .navbar-nav > li {
  float: right;
}
[dir="rtl"] #menubar .navbar-right {
  float: left !important;
}
[dir="rtl"] ul.dropdown-menu {
  text-align: right;
  left: auto;
}
[dir="rtl"] ul#new-menu.dropdown-menu {
  right: auto;
  left: 0;
}
.nav-wrapper {
  border-bottom: 1px solid #e7e7e7;
}
i.menu-icon {
  padding-top: 4px;
}
[dir="rtl"] i.menu-icon.pull-right {
  float: left !important;
  float: left;
}
ul#help_menu li a {
  overflow: hidden;
  padding-right: 2.2em;
}
ul#help_menu li a i {
  margin-right: -1.2em;
}
[dir="rtl"] ul#help_menu li a {
  padding-left: 2.2em;
}
[dir="rtl"] ul#help_menu li a i {
  margin-right: 0;
  margin-left: -1.2em;
}
[dir="rtl"] ul#help_menu li a i.pull-right {
  float: left !important;
  float: left;
}
.dropdown-submenu {
  position: relative;
}
.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
}
[dir="rtl"] .dropdown-submenu > .dropdown-menu {
  right: 100%;
  margin-right: -1px;
}
.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}
.dropdown-submenu > a:after {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  content: "\f0da";
  float: right;
  color: #333333;
  margin-top: 2px;
  margin-right: -10px;
}
.dropdown-submenu > a:after.fa-pull-left {
  margin-right: .3em;
}
.dropdown-submenu > a:after.fa-pull-right {
  margin-left: .3em;
}
.dropdown-submenu > a:after.pull-left {
  margin-right: .3em;
}
.dropdown-submenu > a:after.pull-right {
  margin-left: .3em;
}
[dir="rtl"] .dropdown-submenu > a:after {
  float: left;
  content: "\f0d9";
  margin-right: 0;
  margin-left: -10px;
}
.dropdown-submenu:hover > a:after {
  color: #262626;
}
.dropdown-submenu.pull-left {
  float: none;
}
.dropdown-submenu.pull-left > .dropdown-menu {
  left: -100%;
  margin-left: 10px;
}
#notification_area {
  float: right !important;
  float: right;
  z-index: 10;
}
[dir="rtl"] #notification_area {
  float: left !important;
  float: left;
}
.indicator_area {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
}
[dir="rtl"] .indicator_area {
  float: left !important;
  float: left;
}
#kernel_indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
  border-left: 1px solid;
}
#kernel_indicator .kernel_indicator_name {
  padding-left: 5px;
  padding-right: 5px;
}
[dir="rtl"] #kernel_indicator {
  float: left !important;
  float: left;
  border-left: 0;
  border-right: 1px solid;
}
#modal_indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
}
[dir="rtl"] #modal_indicator {
  float: left !important;
  float: left;
}
#readonly-indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
  margin-top: 2px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  display: none;
}
.modal_indicator:before {
  width: 1.28571429em;
  text-align: center;
}
.edit_mode .modal_indicator:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f040";
}
.edit_mode .modal_indicator:before.fa-pull-left {
  margin-right: .3em;
}
.edit_mode .modal_indicator:before.fa-pull-right {
  margin-left: .3em;
}
.edit_mode .modal_indicator:before.pull-left {
  margin-right: .3em;
}
.edit_mode .modal_indicator:before.pull-right {
  margin-left: .3em;
}
.command_mode .modal_indicator:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: ' ';
}
.command_mode .modal_indicator:before.fa-pull-left {
  margin-right: .3em;
}
.command_mode .modal_indicator:before.fa-pull-right {
  margin-left: .3em;
}
.command_mode .modal_indicator:before.pull-left {
  margin-right: .3em;
}
.command_mode .modal_indicator:before.pull-right {
  margin-left: .3em;
}
.kernel_idle_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f10c";
}
.kernel_idle_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_idle_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_idle_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_idle_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_busy_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f111";
}
.kernel_busy_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_busy_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_busy_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_busy_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_dead_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f1e2";
}
.kernel_dead_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_dead_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_dead_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_dead_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_disconnected_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f127";
}
.kernel_disconnected_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_disconnected_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_disconnected_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_disconnected_icon:before.pull-right {
  margin-left: .3em;
}
.notification_widget {
  color: #777;
  z-index: 10;
  background: rgba(240, 240, 240, 0.5);
  margin-right: 4px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.notification_widget:focus,
.notification_widget.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
.notification_widget:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.notification_widget:active,
.notification_widget.active,
.open > .dropdown-toggle.notification_widget {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.notification_widget:active:hover,
.notification_widget.active:hover,
.open > .dropdown-toggle.notification_widget:hover,
.notification_widget:active:focus,
.notification_widget.active:focus,
.open > .dropdown-toggle.notification_widget:focus,
.notification_widget:active.focus,
.notification_widget.active.focus,
.open > .dropdown-toggle.notification_widget.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.notification_widget:active,
.notification_widget.active,
.open > .dropdown-toggle.notification_widget {
  background-image: none;
}
.notification_widget.disabled:hover,
.notification_widget[disabled]:hover,
fieldset[disabled] .notification_widget:hover,
.notification_widget.disabled:focus,
.notification_widget[disabled]:focus,
fieldset[disabled] .notification_widget:focus,
.notification_widget.disabled.focus,
.notification_widget[disabled].focus,
fieldset[disabled] .notification_widget.focus {
  background-color: #fff;
  border-color: #ccc;
}
.notification_widget .badge {
  color: #fff;
  background-color: #333;
}
.notification_widget.warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.notification_widget.warning:focus,
.notification_widget.warning.focus {
  color: #fff;
  background-color: #ec971f;
  border-color: #985f0d;
}
.notification_widget.warning:hover {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.notification_widget.warning:active,
.notification_widget.warning.active,
.open > .dropdown-toggle.notification_widget.warning {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.notification_widget.warning:active:hover,
.notification_widget.warning.active:hover,
.open > .dropdown-toggle.notification_widget.warning:hover,
.notification_widget.warning:active:focus,
.notification_widget.warning.active:focus,
.open > .dropdown-toggle.notification_widget.warning:focus,
.notification_widget.warning:active.focus,
.notification_widget.warning.active.focus,
.open > .dropdown-toggle.notification_widget.warning.focus {
  color: #fff;
  background-color: #d58512;
  border-color: #985f0d;
}
.notification_widget.warning:active,
.notification_widget.warning.active,
.open > .dropdown-toggle.notification_widget.warning {
  background-image: none;
}
.notification_widget.warning.disabled:hover,
.notification_widget.warning[disabled]:hover,
fieldset[disabled] .notification_widget.warning:hover,
.notification_widget.warning.disabled:focus,
.notification_widget.warning[disabled]:focus,
fieldset[disabled] .notification_widget.warning:focus,
.notification_widget.warning.disabled.focus,
.notification_widget.warning[disabled].focus,
fieldset[disabled] .notification_widget.warning.focus {
  background-color: #f0ad4e;
  border-color: #eea236;
}
.notification_widget.warning .badge {
  color: #f0ad4e;
  background-color: #fff;
}
.notification_widget.success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.notification_widget.success:focus,
.notification_widget.success.focus {
  color: #fff;
  background-color: #449d44;
  border-color: #255625;
}
.notification_widget.success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.notification_widget.success:active,
.notification_widget.success.active,
.open > .dropdown-toggle.notification_widget.success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.notification_widget.success:active:hover,
.notification_widget.success.active:hover,
.open > .dropdown-toggle.notification_widget.success:hover,
.notification_widget.success:active:focus,
.notification_widget.success.active:focus,
.open > .dropdown-toggle.notification_widget.success:focus,
.notification_widget.success:active.focus,
.notification_widget.success.active.focus,
.open > .dropdown-toggle.notification_widget.success.focus {
  color: #fff;
  background-color: #398439;
  border-color: #255625;
}
.notification_widget.success:active,
.notification_widget.success.active,
.open > .dropdown-toggle.notification_widget.success {
  background-image: none;
}
.notification_widget.success.disabled:hover,
.notification_widget.success[disabled]:hover,
fieldset[disabled] .notification_widget.success:hover,
.notification_widget.success.disabled:focus,
.notification_widget.success[disabled]:focus,
fieldset[disabled] .notification_widget.success:focus,
.notification_widget.success.disabled.focus,
.notification_widget.success[disabled].focus,
fieldset[disabled] .notification_widget.success.focus {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.notification_widget.success .badge {
  color: #5cb85c;
  background-color: #fff;
}
.notification_widget.info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.notification_widget.info:focus,
.notification_widget.info.focus {
  color: #fff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
.notification_widget.info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.notification_widget.info:active,
.notification_widget.info.active,
.open > .dropdown-toggle.notification_widget.info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.notification_widget.info:active:hover,
.notification_widget.info.active:hover,
.open > .dropdown-toggle.notification_widget.info:hover,
.notification_widget.info:active:focus,
.notification_widget.info.active:focus,
.open > .dropdown-toggle.notification_widget.info:focus,
.notification_widget.info:active.focus,
.notification_widget.info.active.focus,
.open > .dropdown-toggle.notification_widget.info.focus {
  color: #fff;
  background-color: #269abc;
  border-color: #1b6d85;
}
.notification_widget.info:active,
.notification_widget.info.active,
.open > .dropdown-toggle.notification_widget.info {
  background-image: none;
}
.notification_widget.info.disabled:hover,
.notification_widget.info[disabled]:hover,
fieldset[disabled] .notification_widget.info:hover,
.notification_widget.info.disabled:focus,
.notification_widget.info[disabled]:focus,
fieldset[disabled] .notification_widget.info:focus,
.notification_widget.info.disabled.focus,
.notification_widget.info[disabled].focus,
fieldset[disabled] .notification_widget.info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.notification_widget.info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.notification_widget.danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.notification_widget.danger:focus,
.notification_widget.danger.focus {
  color: #fff;
  background-color: #c9302c;
  border-color: #761c19;
}
.notification_widget.danger:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.notification_widget.danger:active,
.notification_widget.danger.active,
.open > .dropdown-toggle.notification_widget.danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.notification_widget.danger:active:hover,
.notification_widget.danger.active:hover,
.open > .dropdown-toggle.notification_widget.danger:hover,
.notification_widget.danger:active:focus,
.notification_widget.danger.active:focus,
.open > .dropdown-toggle.notification_widget.danger:focus,
.notification_widget.danger:active.focus,
.notification_widget.danger.active.focus,
.open > .dropdown-toggle.notification_widget.danger.focus {
  color: #fff;
  background-color: #ac2925;
  border-color: #761c19;
}
.notification_widget.danger:active,
.notification_widget.danger.active,
.open > .dropdown-toggle.notification_widget.danger {
  background-image: none;
}
.notification_widget.danger.disabled:hover,
.notification_widget.danger[disabled]:hover,
fieldset[disabled] .notification_widget.danger:hover,
.notification_widget.danger.disabled:focus,
.notification_widget.danger[disabled]:focus,
fieldset[disabled] .notification_widget.danger:focus,
.notification_widget.danger.disabled.focus,
.notification_widget.danger[disabled].focus,
fieldset[disabled] .notification_widget.danger.focus {
  background-color: #d9534f;
  border-color: #d43f3a;
}
.notification_widget.danger .badge {
  color: #d9534f;
  background-color: #fff;
}
div#pager {
  background-color: #fff;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  display: none;
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-height: 50%;
  padding-top: 8px;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  /* Display over codemirror */
  z-index: 100;
  /* Hack which prevents jquery ui resizable from changing top. */
  top: auto !important;
}
div#pager pre {
  line-height: 1.21429em;
  color: #000;
  background-color: #f7f7f7;
  padding: 0.4em;
}
div#pager #pager-button-area {
  position: absolute;
  top: 8px;
  right: 20px;
}
div#pager #pager-contents {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}
div#pager #pager-contents #pager-container {
  position: relative;
  padding: 15px 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
div#pager .ui-resizable-handle {
  top: 0px;
  height: 8px;
  background: #f7f7f7;
  border-top: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  /* This injects handle bars (a short, wide = symbol) for 
        the resize handle. */
}
div#pager .ui-resizable-handle::after {
  content: '';
  top: 2px;
  left: 50%;
  height: 3px;
  width: 30px;
  margin-left: -15px;
  position: absolute;
  border-top: 1px solid #cfcfcf;
}
.quickhelp {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  line-height: 1.8em;
}
.shortcut_key {
  display: inline-block;
  width: 21ex;
  text-align: right;
  font-family: monospace;
}
.shortcut_descr {
  display: inline-block;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
span.save_widget {
  height: 30px;
  margin-top: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  width: 50%;
  flex: 1;
}
span.save_widget span.filename {
  height: 100%;
  line-height: 1em;
  margin-left: 16px;
  border: none;
  font-size: 146.5%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 2px;
}
span.save_widget span.filename:hover {
  background-color: #e6e6e6;
}
[dir="rtl"] span.save_widget.pull-left {
  float: right !important;
  float: right;
}
[dir="rtl"] span.save_widget span.filename {
  margin-left: 0;
  margin-right: 16px;
}
span.checkpoint_status,
span.autosave_status {
  font-size: small;
  white-space: nowrap;
  padding: 0 5px;
}
@media (max-width: 767px) {
  span.save_widget {
    font-size: small;
    padding: 0 0 0 5px;
  }
  span.checkpoint_status,
  span.autosave_status {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  span.checkpoint_status {
    display: none;
  }
  span.autosave_status {
    font-size: x-small;
  }
}
.toolbar {
  padding: 0px;
  margin-left: -5px;
  margin-top: 2px;
  margin-bottom: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.toolbar select,
.toolbar label {
  width: auto;
  vertical-align: middle;
  margin-right: 2px;
  margin-bottom: 0px;
  display: inline;
  font-size: 92%;
  margin-left: 0.3em;
  margin-right: 0.3em;
  padding: 0px;
  padding-top: 3px;
}
.toolbar .btn {
  padding: 2px 8px;
}
.toolbar .btn-group {
  margin-top: 0px;
  margin-left: 5px;
}
.toolbar-btn-label {
  margin-left: 6px;
}
#maintoolbar {
  margin-bottom: -3px;
  margin-top: -8px;
  border: 0px;
  min-height: 27px;
  margin-left: 0px;
  padding-top: 11px;
  padding-bottom: 3px;
}
#maintoolbar .navbar-text {
  float: none;
  vertical-align: middle;
  text-align: right;
  margin-left: 5px;
  margin-right: 0px;
  margin-top: 0px;
}
.select-xs {
  height: 24px;
}
[dir="rtl"] .btn-group > .btn,
.btn-group-vertical > .btn {
  float: right;
}
.pulse,
.dropdown-menu > li > a.pulse,
li.pulse > a.dropdown-toggle,
li.pulse.open > a.dropdown-toggle {
  background-color: #F37626;
  color: white;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
/** WARNING IF YOU ARE EDITTING THIS FILE, if this is a .css file, It has a lot
 * of chance of beeing generated from the ../less/[samename].less file, you can
 * try to get back the less file by reverting somme commit in history
 **/
/*
 * We'll try to get something pretty, so we
 * have some strange css to have the scroll bar on
 * the left with fix button on the top right of the tooltip
 */
@-moz-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*properties of tooltip after "expand"*/
.bigtooltip {
  overflow: auto;
  height: 200px;
  -webkit-transition-property: height;
  -webkit-transition-duration: 500ms;
  -moz-transition-property: height;
  -moz-transition-duration: 500ms;
  transition-property: height;
  transition-duration: 500ms;
}
/*properties of tooltip before "expand"*/
.smalltooltip {
  -webkit-transition-property: height;
  -webkit-transition-duration: 500ms;
  -moz-transition-property: height;
  -moz-transition-duration: 500ms;
  transition-property: height;
  transition-duration: 500ms;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 80px;
}
.tooltipbuttons {
  position: absolute;
  padding-right: 15px;
  top: 0px;
  right: 0px;
}
.tooltiptext {
  /*avoid the button to overlap on some docstring*/
  padding-right: 30px;
}
.ipython_tooltip {
  max-width: 700px;
  /*fade-in animation when inserted*/
  -webkit-animation: fadeOut 400ms;
  -moz-animation: fadeOut 400ms;
  animation: fadeOut 400ms;
  -webkit-animation: fadeIn 400ms;
  -moz-animation: fadeIn 400ms;
  animation: fadeIn 400ms;
  vertical-align: middle;
  background-color: #f7f7f7;
  overflow: visible;
  border: #ababab 1px solid;
  outline: none;
  padding: 3px;
  margin: 0px;
  padding-left: 7px;
  font-family: monospace;
  min-height: 50px;
  -moz-box-shadow: 0px 6px 10px -1px #adadad;
  -webkit-box-shadow: 0px 6px 10px -1px #adadad;
  box-shadow: 0px 6px 10px -1px #adadad;
  border-radius: 2px;
  position: absolute;
  z-index: 1000;
}
.ipython_tooltip a {
  float: right;
}
.ipython_tooltip .tooltiptext pre {
  border: 0;
  border-radius: 0;
  font-size: 100%;
  background-color: #f7f7f7;
}
.pretooltiparrow {
  left: 0px;
  margin: 0px;
  top: -16px;
  width: 40px;
  height: 16px;
  overflow: hidden;
  position: absolute;
}
.pretooltiparrow:before {
  background-color: #f7f7f7;
  border: 1px #ababab solid;
  z-index: 11;
  content: "";
  position: absolute;
  left: 15px;
  top: 10px;
  width: 25px;
  height: 25px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}
ul.typeahead-list i {
  margin-left: -10px;
  width: 18px;
}
[dir="rtl"] ul.typeahead-list i {
  margin-left: 0;
  margin-right: -10px;
}
ul.typeahead-list {
  max-height: 80vh;
  overflow: auto;
}
ul.typeahead-list > li > a {
  /** Firefox bug **/
  /* see https://github.com/jupyter/notebook/issues/559 */
  white-space: normal;
}
ul.typeahead-list  > li > a.pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .typeahead-list {
  text-align: right;
}
.cmd-palette .modal-body {
  padding: 7px;
}
.cmd-palette form {
  background: white;
}
.cmd-palette input {
  outline: none;
}
.no-shortcut {
  min-width: 20px;
  color: transparent;
}
[dir="rtl"] .no-shortcut.pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .command-shortcut.pull-right {
  float: left !important;
  float: left;
}
.command-shortcut:before {
  content: "(command mode)";
  padding-right: 3px;
  color: #777777;
}
.edit-shortcut:before {
  content: "(edit)";
  padding-right: 3px;
  color: #777777;
}
[dir="rtl"] .edit-shortcut.pull-right {
  float: left !important;
  float: left;
}
#find-and-replace #replace-preview .match,
#find-and-replace #replace-preview .insert {
  background-color: #BBDEFB;
  border-color: #90CAF9;
  border-style: solid;
  border-width: 1px;
  border-radius: 0px;
}
[dir="ltr"] #find-and-replace .input-group-btn + .form-control {
  border-left: none;
}
[dir="rtl"] #find-and-replace .input-group-btn + .form-control {
  border-right: none;
}
#find-and-replace #replace-preview .replace .match {
  background-color: #FFCDD2;
  border-color: #EF9A9A;
  border-radius: 0px;
}
#find-and-replace #replace-preview .replace .insert {
  background-color: #C8E6C9;
  border-color: #A5D6A7;
  border-radius: 0px;
}
#find-and-replace #replace-preview {
  max-height: 60vh;
  overflow: auto;
}
#find-and-replace #replace-preview pre {
  padding: 5px 10px;
}
.terminal-app {
  background: #EEE;
}
.terminal-app #header {
  background: #fff;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
.terminal-app .terminal {
  width: 100%;
  float: left;
  font-family: monospace;
  color: white;
  background: black;
  padding: 0.4em;
  border-radius: 2px;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.4);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.4);
}
.terminal-app .terminal,
.terminal-app .terminal dummy-screen {
  line-height: 1em;
  font-size: 14px;
}
.terminal-app .terminal .xterm-rows {
  padding: 10px;
}
.terminal-app .terminal-cursor {
  color: black;
  background: white;
}
.terminal-app #terminado-container {
  margin-top: 20px;
}
/*# sourceMappingURL=style.min.css.map */
    </style>
<style type="text/css">
    .highlight .hll { background-color: #ffffcc }
.highlight  { background: #f8f8f8; }
.highlight .c { color: #408080; font-style: italic } /* Comment */
.highlight .err { border: 1px solid #FF0000 } /* Error */
.highlight .k { color: #008000; font-weight: bold } /* Keyword */
.highlight .o { color: #666666 } /* Operator */
.highlight .ch { color: #408080; font-style: italic } /* Comment.Hashbang */
.highlight .cm { color: #408080; font-style: italic } /* Comment.Multiline */
.highlight .cp { color: #BC7A00 } /* Comment.Preproc */
.highlight .cpf { color: #408080; font-style: italic } /* Comment.PreprocFile */
.highlight .c1 { color: #408080; font-style: italic } /* Comment.Single */
.highlight .cs { color: #408080; font-style: italic } /* Comment.Special */
.highlight .gd { color: #A00000 } /* Generic.Deleted */
.highlight .ge { font-style: italic } /* Generic.Emph */
.highlight .gr { color: #FF0000 } /* Generic.Error */
.highlight .gh { color: #000080; font-weight: bold } /* Generic.Heading */
.highlight .gi { color: #00A000 } /* Generic.Inserted */
.highlight .go { color: #888888 } /* Generic.Output */
.highlight .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
.highlight .gs { font-weight: bold } /* Generic.Strong */
.highlight .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
.highlight .gt { color: #0044DD } /* Generic.Traceback */
.highlight .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
.highlight .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
.highlight .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
.highlight .kp { color: #008000 } /* Keyword.Pseudo */
.highlight .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
.highlight .kt { color: #B00040 } /* Keyword.Type */
.highlight .m { color: #666666 } /* Literal.Number */
.highlight .s { color: #BA2121 } /* Literal.String */
.highlight .na { color: #7D9029 } /* Name.Attribute */
.highlight .nb { color: #008000 } /* Name.Builtin */
.highlight .nc { color: #0000FF; font-weight: bold } /* Name.Class */
.highlight .no { color: #880000 } /* Name.Constant */
.highlight .nd { color: #AA22FF } /* Name.Decorator */
.highlight .ni { color: #999999; font-weight: bold } /* Name.Entity */
.highlight .ne { color: #D2413A; font-weight: bold } /* Name.Exception */
.highlight .nf { color: #0000FF } /* Name.Function */
.highlight .nl { color: #A0A000 } /* Name.Label */
.highlight .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
.highlight .nt { color: #008000; font-weight: bold } /* Name.Tag */
.highlight .nv { color: #19177C } /* Name.Variable */
.highlight .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
.highlight .w { color: #bbbbbb } /* Text.Whitespace */
.highlight .mb { color: #666666 } /* Literal.Number.Bin */
.highlight .mf { color: #666666 } /* Literal.Number.Float */
.highlight .mh { color: #666666 } /* Literal.Number.Hex */
.highlight .mi { color: #666666 } /* Literal.Number.Integer */
.highlight .mo { color: #666666 } /* Literal.Number.Oct */
.highlight .sa { color: #BA2121 } /* Literal.String.Affix */
.highlight .sb { color: #BA2121 } /* Literal.String.Backtick */
.highlight .sc { color: #BA2121 } /* Literal.String.Char */
.highlight .dl { color: #BA2121 } /* Literal.String.Delimiter */
.highlight .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
.highlight .s2 { color: #BA2121 } /* Literal.String.Double */
.highlight .se { color: #BB6622; font-weight: bold } /* Literal.String.Escape */
.highlight .sh { color: #BA2121 } /* Literal.String.Heredoc */
.highlight .si { color: #BB6688; font-weight: bold } /* Literal.String.Interpol */
.highlight .sx { color: #008000 } /* Literal.String.Other */
.highlight .sr { color: #BB6688 } /* Literal.String.Regex */
.highlight .s1 { color: #BA2121 } /* Literal.String.Single */
.highlight .ss { color: #19177C } /* Literal.String.Symbol */
.highlight .bp { color: #008000 } /* Name.Builtin.Pseudo */
.highlight .fm { color: #0000FF } /* Name.Function.Magic */
.highlight .vc { color: #19177C } /* Name.Variable.Class */
.highlight .vg { color: #19177C } /* Name.Variable.Global */
.highlight .vi { color: #19177C } /* Name.Variable.Instance */
.highlight .vm { color: #19177C } /* Name.Variable.Magic */
.highlight .il { color: #666666 } /* Literal.Number.Integer.Long */
    </style>


<style type="text/css">
/* Overrides of notebook CSS for static HTML export */
body {
  overflow: visible;
  padding: 8px;
}

div#notebook {
  overflow: visible;
  border-top: none;
}@media print {
  div.cell {
    display: block;
    page-break-inside: avoid;
  } 
  div.output_wrapper { 
    display: block;
    page-break-inside: avoid; 
  }
  div.output { 
    display: block;
    page-break-inside: avoid; 
  }
}
</style>

<!-- Custom stylesheet, it must be in the same directory as the html file -->
<link rel="stylesheet" href="custom.css">

<!-- Loading mathjax macro -->
<!-- Load mathjax -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-AMS_HTML"></script>
    <!-- MathJax configuration -->
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"] ],
            displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
            processEscapes: true,
            processEnvironments: true
        },
        // Center justify equations in code and markdown cells. Elsewhere
        // we use CSS to left justify single line equations in code cells.
        displayAlign: 'center',
        "HTML-CSS": {
            styles: {'.MathJax_Display': {"margin": 0}},
            linebreaks: { automatic: true }
        }
    });
    </script>
    <!-- End of mathjax configuration --></head>
<body>
  <div tabindex="-1" id="notebook" class="border-box-sizing">
    <div class="container" id="notebook-container">

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[1]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
<span class="kn">import</span> <span class="nn">seaborn</span> <span class="k">as</span> <span class="nn">sns</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h1 id="Markov-Chain-Monte-Carlo">Markov Chain Monte Carlo<a class="anchor-link" href="#Markov-Chain-Monte-Carlo">&#182;</a></h1>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>You wake up on a cold, damp, hard floor. Everything is covered in darkness, such that you can't even see your hand an inch from your face. You begin to slowly crawl forward, feeling the ground as you go. You notice the floor is strangely uneven, but you continue crawling randomly until you eventually collide with a wall. You turn and continue crawling for what seems like hours until you have a near perfect image of the floor in your mind. You know where the center of the room is, where the floor is steep and where the floor is level. You know it so well, that the darkness has become irrelevant to your mental topographic map of the room. In essence, you have just performed MCMC on the terrain of your mysterious enclosure.</p>
<p>The spirit of MCMC is accepting the intractability of directly obtaining the posterior, and instead  randomly walking across the posterior. Along the way, you record your random steps, and before you know it, you have a solid approximation of the posterior.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="What-is-Monte-Carlo?">What is Monte Carlo?<a class="anchor-link" href="#What-is-Monte-Carlo?">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>The Monte Carlo method is a quick and dirty method for approximating a numerical problem with random simulation.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Example: Computing an integral. Suppose you with to compute the following integral:</p>
$$\int_0^1 x^3dx$$<p>but you have forgotten your antiderivative rules. Instead, you have the ingenious idea to randomly sample points on $[0, 1]$, cube them, and take the average.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">samples</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">uniform</span><span class="p">(</span><span class="n">size</span> <span class="o">=</span> <span class="mi">10000</span><span class="p">)</span>
<span class="n">determinstic_function</span> <span class="o">=</span> <span class="n">samples</span> <span class="o">**</span> <span class="mi">3</span>
<span class="n">approximation</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">determinstic_function</span><span class="p">)</span>
<span class="n">approximation</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[2]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>0.2533813855166624</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>The general recipe for solving a problem with Monte Carlo methods is the following:</p>
<ol>
<li>Randomly sample inputs over the domain</li>
<li>Perform the desired computation</li>
<li>Aggregate the results</li>
</ol>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>For a given random variable $X$ from density $p(x)$,</p>
$$\frac{1}{n}\sum_{i=0}^n \frac{f(x_i)}{p(x_i)} \approx \int f(x) p(x) dx$$
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Given $X_1, ..., X_n$ where $X\sim\text{Uniform}(a, b)$ The basic Monte Carlo estimator is</p>
$$F=\int_b^a f(x) dx \approx (b-a) \frac{1}{n}\sum_{i=0}^n f(x_i)$$
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Another example:</p>
$$F = 2\int_{-1}^{1} \sqrt{1 - x^2}dx $$
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[8]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sims</span> <span class="o">=</span> <span class="mi">100</span>
<span class="n">estimates</span> <span class="o">=</span> <span class="p">[]</span>
<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">sims</span><span class="p">):</span>
    
    <span class="n">x</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">uniform</span><span class="p">(</span><span class="n">low</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="n">high</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span> <span class="n">size</span> <span class="o">=</span> <span class="mi">10000</span><span class="p">)</span>
    
    <span class="n">deterministic_computation</span> <span class="o">=</span> <span class="mi">4</span> <span class="o">*</span> <span class="p">(</span><span class="mi">1</span> <span class="o">-</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">2</span><span class="p">)</span> <span class="o">**</span> <span class="mf">0.5</span>
    
    <span class="n">estimate</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">deterministic_computation</span><span class="p">)</span>
    <span class="n">estimates</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">estimate</span><span class="p">)</span>
    
<span class="n">sns</span><span class="o">.</span><span class="n">kdeplot</span><span class="p">(</span><span class="n">estimates</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">vlines</span><span class="p">(</span><span class="mf">3.14</span><span class="p">,</span> <span class="n">ymin</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="n">ymax</span> <span class="o">=</span> <span class="mi">50</span><span class="p">,</span> <span class="n">color</span> <span class="o">=</span> <span class="s1">&#39;darkorange&#39;</span><span class="p">,</span> <span class="n">linewidth</span> <span class="o">=</span> <span class="mi">3</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[7]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">estimates</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[7]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>3.141219101387876</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="What-is-a-Markov-Chain?">What is a Markov Chain?<a class="anchor-link" href="#What-is-a-Markov-Chain?">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>A Markov Chain is a memoryless, stochastic process. In other words, to know where you're going, it doesn't matter where you've been, only where you are now.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><strong>Example</strong>: Suppose you're considering investing in GME (GameStop). You want to model the price movements with a markov chain with the following transition matrix:</p>
$$
\begin{bmatrix}
P(S_{t+1} = +1 |S_t = +1) &amp; P(S_{t+1} = -1 |S_t = +1) \\
P(S_{t+1} = +1 |S_t = -1) &amp;P(S_{t+1} = -1 |S_t = -1)
\end{bmatrix}
=
\begin{bmatrix}
0.25 &amp; 0.75 \\
0.75 &amp; 0.25 
\end{bmatrix}
$$
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><img src="assets/markovchain.png" alt=""></p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>If today is Monday and the stock went up a dollar today, what is the probability that the stock goes up a dollar on Wednesday at close?</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[10]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">up_to_down</span> <span class="o">=</span> <span class="mf">0.75</span>
<span class="n">up_to_up</span> <span class="o">=</span> <span class="mf">0.25</span>

<span class="n">down_to_up</span> <span class="o">=</span> <span class="mf">0.75</span>
<span class="n">down_to_down</span> <span class="o">=</span> <span class="mf">0.25</span>

<span class="n">up_to_down</span> <span class="o">*</span> <span class="n">down_to_up</span> <span class="o">+</span> <span class="n">up_to_up</span> <span class="o">*</span> <span class="n">up_to_up</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[10]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>0.625</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>If today is Monday and the stock went up a dollar today, what is the probability that the stock goes up a on this day a year from today?</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>An interesting, and desirable question: In the long-run, on any given day, what is the probability that the stock will go up a dollar?</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><strong>Stationary Distribution:</strong> $\pi = \pi T$</p>
<p>Here, our stationary distribution is $\pi = [0.5, 0.5]$</p>
$$
[0.5, 0.5]
\begin{bmatrix}
0.25 &amp; 0.75 \\
0.75 &amp; 0.25 
\end{bmatrix}
=
[0.5, 0.5]
$$
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[3]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">from</span> <span class="nn">functools</span> <span class="kn">import</span> <span class="n">reduce</span>
<span class="n">mmult</span> <span class="o">=</span> <span class="k">lambda</span> <span class="n">a</span><span class="p">,</span> <span class="n">b</span><span class="p">:</span> <span class="n">np</span><span class="o">.</span><span class="n">dot</span><span class="p">(</span><span class="n">a</span><span class="p">,</span> <span class="n">b</span><span class="p">)</span>

<span class="n">T</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mf">0.25</span><span class="p">,</span> <span class="mf">0.75</span><span class="p">],</span>
              <span class="p">[</span><span class="mf">0.75</span><span class="p">,</span> <span class="mf">0.25</span><span class="p">]])</span>

<span class="n">days</span> <span class="o">=</span> <span class="mi">365</span>
<span class="n">Ts</span> <span class="o">=</span> <span class="p">[</span><span class="n">T</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">days</span><span class="p">)]</span>
<span class="n">reduce</span><span class="p">(</span><span class="n">mmult</span><span class="p">,</span> <span class="n">Ts</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[3]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>array([[0.5, 0.5],
       [0.5, 0.5]])</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[18]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">states</span> <span class="o">=</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">]</span>
<span class="n">iters</span> <span class="o">=</span> <span class="mi">100</span>
<span class="n">days</span> <span class="o">=</span> <span class="mi">100</span>

<span class="n">movements</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">((</span><span class="n">iters</span><span class="p">,</span> <span class="n">days</span><span class="p">))</span>
<span class="n">cur_state</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">T</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mf">0.25</span><span class="p">,</span> <span class="mf">0.75</span><span class="p">],</span>
              <span class="p">[</span><span class="mf">0.75</span><span class="p">,</span> <span class="mf">0.25</span><span class="p">]])</span>

<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">iters</span><span class="p">):</span>
    <span class="k">for</span> <span class="n">d</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">days</span><span class="p">):</span>
        
        <span class="n">transition_probs</span> <span class="o">=</span> <span class="n">T</span><span class="p">[</span><span class="n">cur_state</span><span class="p">,</span> <span class="p">]</span>
        
        <span class="n">next_state</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">([</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">],</span> <span class="n">p</span> <span class="o">=</span> <span class="n">transition_probs</span><span class="p">)</span>
        
        <span class="n">movements</span><span class="p">[</span><span class="n">d</span><span class="p">,</span> <span class="n">i</span><span class="p">]</span> <span class="o">=</span> <span class="n">states</span><span class="p">[</span><span class="n">next_state</span><span class="p">]</span>
        
        <span class="n">cur_state</span> <span class="o">=</span> <span class="n">next_state</span>


<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">cumsum</span><span class="p">(</span><span class="n">movements</span><span class="p">,</span> <span class="n">axis</span> <span class="o">=</span> <span class="mi">0</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">average</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">cumsum</span><span class="p">(</span><span class="n">movements</span><span class="p">,</span> <span class="n">axis</span> <span class="o">=</span> <span class="mi">0</span><span class="p">),</span> <span class="n">axis</span> <span class="o">=</span> <span class="mi">1</span><span class="p">),</span> <span class="n">linewidth</span> <span class="o">=</span> <span class="mi">3</span><span class="p">,</span> <span class="n">color</span> <span class="o">=</span> <span class="s2">&quot;black&quot;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s2">&quot;day&quot;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s2">&quot;price movements&quot;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="So-what-do-Markov-Chains-and-Monte-Carlo-methods-have-to-do-with-Bayesian-Inference?">So what do Markov Chains and Monte Carlo methods have to do with Bayesian Inference?<a class="anchor-link" href="#So-what-do-Markov-Chains-and-Monte-Carlo-methods-have-to-do-with-Bayesian-Inference?">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="The-Markov-Chain-component">The Markov Chain component<a class="anchor-link" href="#The-Markov-Chain-component">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>How does randomly walking around the posterior actually guarantee that we will recover the true posterior? The key is that we construct a Markov chain with a stationary distribution equal to our posterior. Hence, if we walk around long enough, (hopefully) our Markov chain will converge to its unique stationary distribution and thus the posterior.</p>
<p>Unfortunately, we can't just alchemize any Markov chain to converge to our posterior, but it turns out that it's not all that difficult to conjure up the right Markov chain. Obviously, we need a stationary distribution to exist. Specifically, we need <em>unique</em> stationary distribution. (What good is an infinite number of stationary distributions?)</p>
<p>To achieve a unique stationary distribution we will ensure our Markov chain is <strong>ergodic and reversible</strong>.</p>
<h3 id="Ergodicity"><em>Ergodicity</em><a class="anchor-link" href="#Ergodicity">&#182;</a></h3><p><strong>Irreducible:</strong> In an irreducible Markov chain, each state is reachable from any other state, in a finite number of steps.</p>
<p>Recall our stock example:</p>
<ul>
<li>The stock can go up after going down and vice versa in a finite number of days. </li>
</ul>
<p><strong>Aperiodic:</strong> The number of steps to return to state $i$ is uncertain.</p>
<p>Recall our stock example:</p>
<ul>
<li>The stock could go up for 3 days before it goes down. Or it could go up for 4 days before it goes down, etc. There is no strict path that the stock follows with certainty.</li>
</ul>
<h3 id="Reversibility"><em>Reversibility</em><a class="anchor-link" href="#Reversibility">&#182;</a></h3><p><strong>This is where the magic happens.</strong> A sufficient (but not neccessary) condition for the existence of a stationary distribution is reversibility (detailed balance). In other words, the probability of being in state $x$ and transitioning to state $y$ is the same as the probability of being in state $y$ and transitioning to state $x$.</p>
$$\pi(x)T_{y, x} = \pi(y)T_{x, y}$$<p>Recall our stock example:</p>
<p>Take $x = +1, y = -1$</p>
$$\pi(+1)T_{-1, +1} = \pi(-1)T_{+1, -1}$$$$0.5*0.75 = 0.5 * 0.75$$<p>While the discrete case is useful for pedagogical reasons, from here I will transition (no pun intended) to the continuous case, which looks virutally the same:</p>
$$\pi(x)T(y|x) = \pi(y)T(x|y)$$<p>but now $\pi$ and $T$ are <strong><em>densities</em></strong> instead of matrices.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Checkpoint:">Checkpoint:<a class="anchor-link" href="#Checkpoint:">&#182;</a></h3><p><strong>Big picture</strong>:</p>
<ul>
<li><p>We want to sample from our posterior $\pi^{*}$, but we can't ascertain $\pi^{*}$ analytically.</p>
</li>
<li><p>Instead, intelligently construct a Markov chain and settle to sample from its stationary distribution $\pi = \pi^{*}$ as a substitute for our posterior.</p>
</li>
<li><p>$\pi$ is the stationary distribution of some transition density $T$.</p>
</li>
<li><p>We want to choose $T$ such that it converges to $\pi$.</p>
</li>
<li><p>Reversibility will give us such $T$</p>
</li>
</ul>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="DIY-Markov-Chain-(with-a-unique-stationary-distribution)">DIY Markov Chain (with a unique stationary distribution)<a class="anchor-link" href="#DIY-Markov-Chain-(with-a-unique-stationary-distribution)">&#182;</a></h2><ol>
<li><p>Let your target density (your posterior) equal to the stationary distribution.
$$\pi^{*} = \pi$$</p>
</li>
<li><p>Ensure reversibility</p>
</li>
</ol>
$$\pi(x)T(y|x) = \pi(y)T(x|y)$$<p>The above equation is unlikely to hold. In other words, it could be the case that in reality,</p>
$$\pi(x)T(y|x) \geq \pi(y)T(x|y)$$<p>Thus, we want to <strong>impose a constraint such that the reversibility constraint is met</strong>.</p>
<ol>
<li>Decompose $T(y|x) = g(y|x)A(y, x)$</li>
</ol>
<p>where $g(y|x)$ is the conditional probability of proposing $y$ given we're in state $x$. $A(y, x)$ is the probability of accepting such a proposal.</p>
<p>How does this help? Well suppose that we move from $x$ to $y$ more frequently than $y$ to $x$ (not reversible). How can we limit the moves from $x$?</p>
<p>We can introduce a <strong>probability</strong> that a move is made. $A(y, x) &lt; 1$. If the proposal of moving to $y$ from $x$ is rejected, then we stay at $x$.</p>
<ol>
<li>Plug in the decomposition</li>
</ol>
$$\pi(x)g(y|x)A(y, x) = \pi(y)g(x|y)A(x, y)$$<p>This equation ensures balance!</p>
<ol>
<li>Rearrange</li>
</ol>
$$\frac{A(y, x)}{A(x, y)} = \frac{\pi(y)g(x|y)}{\pi(x)g(y|x)}$$<ol>
<li>Choose an acceptance ratio $\frac{A(y, x)}{A(x, y)}$</li>
</ol>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Enter-Metropolis-Hastings">Enter Metropolis-Hastings<a class="anchor-link" href="#Enter-Metropolis-Hastings">&#182;</a></h3><p>We set $A(x, y) = 1$ since we want to increase those number of moves.</p>
$$A(y, x) = \min \bigg\{1, \frac{\pi(y)g(x|y)}{\pi(x)g(y|x)} \bigg\}$$
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Furthermore, if we choose $g$, such that it is symmetric, we have the Metropolis Algorithm:</p>
$$A(y, x) = \min \bigg\{1, \frac{\pi(y)}{\pi(x)} \bigg\}$$
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>All of that for one silly equation, huh</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="From-the-top">From the top<a class="anchor-link" href="#From-the-top">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Let's revisit the twitter bot example. Your friend observed one bot account and one authentic account, which yields the posterior:</p>
$$\pi(p|X=1) \propto p(1-p)$$
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Now, obviously we know what the full posterior is, but let's pretend we don't and instead randomly walk around it.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Let's choose a symmetric proposal distribution on the same domain as $p$</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[19]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">p_curr</span> <span class="o">=</span> <span class="mf">0.5</span>

<span class="n">prop_posterior</span> <span class="o">=</span> <span class="k">lambda</span> <span class="n">p</span><span class="p">:</span> <span class="n">p</span> <span class="o">*</span> <span class="p">(</span><span class="mi">1</span> <span class="o">-</span> <span class="n">p</span><span class="p">)</span>

<span class="n">samples</span> <span class="o">=</span> <span class="p">[]</span>
<span class="n">samples</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">p_curr</span><span class="p">)</span>

<span class="n">steps</span> <span class="o">=</span> <span class="mi">10000</span>

<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">steps</span><span class="p">):</span>
    <span class="n">p_prop</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">uniform</span><span class="p">()</span>
    
    <span class="n">acceptance_ratio</span> <span class="o">=</span> <span class="n">prop_posterior</span><span class="p">(</span><span class="n">p_prop</span><span class="p">)</span> <span class="o">/</span> <span class="n">prop_posterior</span><span class="p">(</span><span class="n">p_curr</span><span class="p">)</span>
    
    <span class="k">if</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">uniform</span><span class="p">()</span> <span class="o">&lt;</span> <span class="n">acceptance_ratio</span><span class="p">:</span>
        
        <span class="n">p_curr</span> <span class="o">=</span> <span class="n">p_prop</span>
        
    <span class="n">samples</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">p_curr</span><span class="p">)</span>
    
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[21]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">xx</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">100</span><span class="p">)</span>
<span class="n">sns</span><span class="o">.</span><span class="n">kdeplot</span><span class="p">(</span><span class="n">samples</span><span class="p">,</span> <span class="n">label</span> <span class="o">=</span> <span class="s1">&#39;Metropolis&#39;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xx</span><span class="p">,</span> <span class="mi">6</span> <span class="o">*</span> <span class="n">prop_posterior</span><span class="p">(</span><span class="n">xx</span><span class="p">),</span> <span class="n">label</span> <span class="o">=</span> <span class="s1">&#39;True&#39;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[24]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">samples</span><span class="p">[:</span><span class="mi">200</span><span class="p">])</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[24]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>[&lt;matplotlib.lines.Line2D at 0x7f426a425b38&gt;]</pre>
</div>

</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span> 
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span> 
</pre></div>

    </div>
</div>
</div>

</div>
    </div>
  </div>
</body>

 


</html>
