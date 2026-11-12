param([string]$Page,[string]$ExpressionFile,[string]$OutputFile='',[string]$Capture='')
$ErrorActionPreference='Stop'
$port=19526
$version=curl.exe --noproxy '*' --max-time 2 --silent "http://127.0.0.1:$port/json/version"
if(-not $version) {
 $profile=Join-Path $env:TEMP 'chime-audio-review-cdp'
 Start-Process -FilePath 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -ArgumentList @('--headless','--disable-gpu','--no-first-run',"--remote-debugging-port=$port","--user-data-dir=$profile",'about:blank') -WindowStyle Hidden
 for($i=0;$i -lt 30;$i++){$version=curl.exe --noproxy '*' --max-time 1 --silent "http://127.0.0.1:$port/json/version";if($version){break};Start-Sleep -Milliseconds 100}
}
$target=(curl.exe --noproxy '*' --max-time 4 --silent -X PUT "http://127.0.0.1:$port/json/new?$([Uri]::EscapeDataString($Page))") | ConvertFrom-Json
Write-Host 'Target ready'
Add-Type -TypeDefinition @"
using System;using System.Net.WebSockets;using System.Text;using System.IO;using System.Threading;using System.Threading.Tasks;
public static class ChimeBrowserSocket {
 public static async Task<string> Run(string uri,string request) {
  using(var ws=new ClientWebSocket())using(var cancel=new CancellationTokenSource(25000)) {
   ws.Options.Proxy=null;
   await ws.ConnectAsync(new Uri(uri),cancel.Token).ConfigureAwait(false);
   byte[] data=Encoding.UTF8.GetBytes(request);
   await ws.SendAsync(new ArraySegment<byte>(data),WebSocketMessageType.Text,true,cancel.Token).ConfigureAwait(false);
   while(true)using(var stream=new MemoryStream()){
    WebSocketReceiveResult result;byte[] buffer=new byte[65536];
    do{result=await ws.ReceiveAsync(new ArraySegment<byte>(buffer),cancel.Token).ConfigureAwait(false);stream.Write(buffer,0,result.Count);}while(!result.EndOfMessage);
    string response=Encoding.UTF8.GetString(stream.ToArray());
    if(response.Contains("\"id\":1"))return response;
   }
  }
 }
}
"@
Write-Host 'Class ready'
if($Capture){$null=[ChimeBrowserSocket]::Run($target.webSocketDebuggerUrl,'{"id":1,"method":"Emulation.setDeviceMetricsOverride","params":{"width":1200,"height":1400,"deviceScaleFactor":1,"mobile":false}}').GetAwaiter().GetResult()}
Start-Sleep -Milliseconds 1000
$Expression=Get-Content -LiteralPath $ExpressionFile -Raw -Encoding UTF8
$expressionBase64=[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($Expression))
$request='{"id":1,"method":"Runtime.evaluate","params":{"expression":"eval(atob(''BASE64''))","awaitPromise":true,"returnByValue":true,"userGesture":true}}'.Replace('BASE64',$expressionBase64)
Write-Host 'Evaluating'
$response=[ChimeBrowserSocket]::Run($target.webSocketDebuggerUrl,$request).GetAwaiter().GetResult() | ConvertFrom-Json
if($response.result.exceptionDetails){throw ($response.result.exceptionDetails | ConvertTo-Json -Depth 8)}
if($Capture){$shot=[ChimeBrowserSocket]::Run($target.webSocketDebuggerUrl,'{"id":1,"method":"Page.captureScreenshot","params":{"format":"png","captureBeyondViewport":true}}').GetAwaiter().GetResult() | ConvertFrom-Json;[IO.File]::WriteAllBytes((Join-Path $pwd $Capture),[Convert]::FromBase64String($shot.result.data))}
$value=$response.result.result.value
if($OutputFile){[IO.File]::WriteAllText((Join-Path $pwd $OutputFile),[string]$value)}else{$value}

$null=curl.exe --noproxy '*' --max-time 2 --silent "http://127.0.0.1:$port/json/close/$($target.id)"
