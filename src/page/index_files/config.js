var DK = DK || {};
DK.JSOMProvisioning = DK.JSOMProvisioning || {};
DK.Render = DK.Render || {};
DK.Pages = DK.Pages || {};
var templatePath = "/wp-content/themes/inc/";
var lineArr = [];
var vk1Arr = [], vk2Arr = [];
var blineArr = [];
var line = 0;
var bline = 0;
var icount = [];
var vk1count = [];
var vk2count = [];
var bcount = [];
var itemsPerLine = 5;
var lineNumber = 0;
var correction = 0;
var $smalldt = false;
var $mobile = false;
var renderType = "desktop";
var rtime;
var timeout = false;
var delta = 200;
var prevItemDate;
var typesObj = {
  "type1":1,
  "type2":1,
  "type3":1,
  "type4":2,
  "type5":3,
  "type6":itemsPerLine
}
