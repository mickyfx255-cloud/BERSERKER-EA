/**
 * Utility to wrap raw MQL5 source code with the automated CheckLicense WebRequest verification function
 */

export function injectMQL5LicenseWrapper(rawCode: string, licenseKey: string, serverOrigin: string): string {
  const cleanKey = licenseKey.trim();
  const verifyEndpoint = `${serverOrigin}/api/public/license/verify`;

  const licenseHeader = `//+------------------------------------------------------------------+
//| BERSERKER EA / SMART SCALPER EA - LICENSED DISTRIBUTION          |
//| Copyright 2026, EA ALGO COMMUNITY                                |
//| Support WhatsApp: +255 610 366 248                               |
//| Compile in MetaEditor (F7) for MT5 (.ex5 output)                 |
//+------------------------------------------------------------------+
#property copyright "EA ALGO COMMUNITY"
#property link      "https://wa.me/255610366248"
#property version   "2.41"
#property strict

//--- Injected Licensing Security Layer
string G_SERVER_VERIFY_URL = "${verifyEndpoint}";
string G_EMBEDDED_LICENSE_KEY = "${cleanKey}";

//+------------------------------------------------------------------+
//| Remote License Verification via MT5 WebRequest                   |
//| Add URL to MT5 -> Tools -> Options -> Expert Advisors:           |
//| ${serverOrigin}                                                 |
//+------------------------------------------------------------------+
bool CheckLicense(string key, long accountNumber)
{
   if(StringLen(key) == 0) key = G_EMBEDDED_LICENSE_KEY;
   
   string headers = "Content-Type: application/json\\r\\nUser-Agent: MT5-BerserkerClient\\r\\n";
   string postData = StringFormat("{\\"license_key\\":\\"%s\\",\\"account_number\\":\\"%I64d\\"}", key, accountNumber);
   char post[], result[];
   string result_headers;
   
   StringToCharArray(postData, post, 0, WHOLE_ARRAY, CP_UTF8);
   ArrayResize(post, ArraySize(post)-1); // Strip null terminator
   
   ResetLastError();
   int httpStatus = WebRequest("POST", G_SERVER_VERIFY_URL, headers, 4000, post, result, result_headers);
   
   if(httpStatus == -1)
   {
      int err = GetLastError();
      PrintFormat("[LICENSE ERROR] WebRequest failed (Code: %d). Ensure '%s' is whitelisted in MT5 WebRequest options!", err, G_SERVER_VERIFY_URL);
      return false;
   }
   
   if(httpStatus != 200)
   {
      string errBody = CharArrayToString(result, 0, WHOLE_ARRAY, CP_UTF8);
      PrintFormat("[LICENSE REJECTED] HTTP %d: %s", httpStatus, errBody);
      return false;
   }
   
   string response = CharArrayToString(result, 0, WHOLE_ARRAY, CP_UTF8);
   if(StringFind(response, "\\"valid\\":true") >= 0)
   {
      Print("[LICENSE GRANTED] Smart Scalper EA active for MT5 Account #", accountNumber);
      return true;
   }
   
   Print("[LICENSE DENIED] Invalid or expired credentials: ", response);
   return false;
}

`;

  // If the raw code already has CheckLicense, we avoid duplicate definitions
  let modifiedCode = rawCode;
  if (!rawCode.includes('bool CheckLicense(')) {
    modifiedCode = licenseHeader + '\n' + rawCode;
  }

  // Ensure default license key variable is updated if it exists
  if (modifiedCode.includes('InpLicenseKey')) {
    modifiedCode = modifiedCode.replace(
      /input string\s+InpLicenseKey\s*=\s*"[^"]*";/,
      `input string   InpLicenseKey    = "${cleanKey}"; // Official EA ALGO COMMUNITY License`
    );
  }

  return modifiedCode;
}

export function downloadMQL5File(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.mq5') ? filename : `${filename}.mq5`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
